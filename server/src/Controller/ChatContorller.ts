import { config } from "dotenv";
import { Request, Response } from 'express';

interface Message {
    role: string;
    content: string;
}

interface Choice {
    message: Message;
    finish_reason: string;
    index: number;
}

interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

interface ResponseData {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices: Choice[];
}

export default class ChatContorller
{
    private openaiApiKey: string|undefined;
    private messageHistory: Message[] = [];

    constructor()
    {
        config(); // 環境変数を読み込む
        this.openaiApiKey = process.env.OPENAI_API_KEY;
    }

    public async ask(req: Request, res: Response): Promise<{message: string}>
    {
        // ユーザー入力値
        const messages = req.body.messages;
        const answer = await this.requestChat(messages);
        return {message: answer};
    }

    private async requestChat(messages: Message[]) {
        this.messageHistory = messages;
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.openaiApiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: this.messageHistory,
                temperature: 0.7, // 0.0〜1.0の範囲で指定 0.0: 確実に最も確率の高いもの 1.0: ランダム
            }),
        });
        const responseData = (await response.json()) as ResponseData;
        // 最新のメッセージ
        const answer = responseData.choices[0].message.content;
        return answer;
    }
}
