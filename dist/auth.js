var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config(); // 環境変数を読み込む
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
function getModelList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // GPTモデル一覧を取得する
            const response = yield openai.listModels();
            console.log({
                status: response.status,
                list: response.data
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`エラーが発生しました：${error.message}`);
            }
            else {
                console.error("予期しないエラーが発生しました。");
            }
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const modelList = yield getModelList();
    console.log('end', modelList);
}))();
