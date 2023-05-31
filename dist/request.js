var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
import { config } from "dotenv";
import * as readline from "readline";
import { Logger } from "./common/Logger.js"; // Loggerモジュールをインポート
config(); // 環境変数を読み込む
const openaiApiKey = process.env.OPENAI_API_KEY;
let messageHistory = [];
// Logger インスタンスを作成
const logger = new Logger();
// コンソール入力を受け付けるためのインターフェース
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const askQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    rl.question("質問を入力してください（終了するには 'exit' と入力）: ", (question) => __awaiter(void 0, void 0, void 0, function* () {
        if (question === "exit") {
            rl.close();
            return;
        }
        // メッセージ履歴に追加（質問）
        messageHistory.push({ role: "user", content: question });
        // ログに書き込む
        logger.writeLog(`User: ${question}`);
        try {
            const response = yield fetch("https://api.openai.com/v1/chat/completions", {
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
            const responseData = (yield response.json());
            // 最新のメッセージ
            const answer = responseData.choices[0].message.content;
            console.log(answer);
            // メッセージ履歴に追加（回答）
            messageHistory.push({ role: "assistant", content: answer });
            // ログに書き込む
            logger.writeLog(`Assistant: ${answer}`);
            // 新しい質問を続ける
            askQuestion();
        }
        catch (error) {
            console.error("エラーが発生しました：", error);
            rl.close();
        }
    }));
});
askQuestion();
