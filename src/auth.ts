import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

config(); // 環境変数を読み込む

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID as string,
    apiKey: process.env.OPENAI_API_KEY as string,
});

const openai = new OpenAIApi(configuration);

async function getModelList(): Promise<any> {
    try {
        // GPTモデル一覧を取得する
        const response = await openai.listModels();
        console.log({
            status: response.status,
            list: response.data
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`エラーが発生しました：${error.message}`);
        } else {
            console.error("予期しないエラーが発生しました。");
        }
    }
}

(async () => {
    const modelList = await getModelList();
    console.log('end', modelList);
})();
