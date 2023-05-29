import * as fs from "fs";
import * as path from "path";

class Logger {
    private logDir = "log";

    constructor() {
        this.ensureLogDirExists();
    }

    /**
     * logファイルに用いる日付文字列を取得する
     * @returns {string} YYYY-MM-DD形式の日付文字列
     */
    private getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    /**
     * ログディレクトリが存在しない場合は作成する
     */
    private ensureLogDirExists(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }

    /**
     * ISO 8601形式の日時文字列を取得する
     * @returns {string} ISO 8601形式の日時文字列
     */
    private getCurrentTimestamp(): string {
        const now = new Date();
        return now.toISOString();
    }

    /**
     * ログ書き込み
     * @param {string} content ログに書き込む内容
     */
    public writeLog(content: string): void {
        const timestamp = this.getCurrentTimestamp();
        const logFile = path.join(this.logDir, `chatlog_${this.getCurrentDate()}.txt`);
        fs.appendFileSync(logFile, `${timestamp}: ${content}\n`);
    }
}

export { Logger };
