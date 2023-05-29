import fetch from "node-fetch";
import { config } from "dotenv";
import * as readline from "readline";
import { Logger } from "./common/Logger.js"; // Loggerモジュールをインポート

config(); // 環境変数を読み込む
const openaiApiKey = process.env.OPENAI_API_KEY as string;

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

interface MessageHistory extends Array<Message> {}

let messageHistory: MessageHistory = [];

// Logger インスタンスを作成
const logger = new Logger();

// コンソール入力を受け付けるためのインターフェース
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = async () => {
    rl.question("質問を入力してください（終了するには 'exit' と入力）: ", async (question) => {
        if (question === "exit") {
            rl.close();
            return;
        }

        // メッセージ履歴に追加（質問）
        messageHistory.push({ role: "user", content: question });
        // ログに書き込む
        logger.writeLog(`User: ${question}`);

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openaiApiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: messageHistory,
                    temperature: 0.7, // 0.0〜1.0の範囲で指定 0.0: 確実に最も確率の高いもの 1.0: ランダム
                }),
            });

            const responseData = (await response.json()) as ResponseData;

            // 最新のメッセージ
            const answer = responseData.choices[0].message.content;
            console.log(answer);

            // メッセージ履歴に追加（回答）
            messageHistory.push({ role: "assistant", content: answer });
            // ログに書き込む
            logger.writeLog(`Assistant: ${answer}`);

            // 新しい質問を続ける
            askQuestion();

        } catch (error) {
            console.error("エラーが発生しました：", error);
            rl.close();
        }
    });
};

askQuestion();
