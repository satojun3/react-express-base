export interface Message {
    role: string;
    content: string;
}

export interface Choice {
    message: Message;
    finish_reason: string;
    index: number;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

// ChatGPTモデルからのレスポンス
export interface ResponseData {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: Usage;
    choices: Choice[];
}

export interface ValidationBody {
  location: "body";
  msg: string;
  path: string;
  type: "field";
  value: string;
};

export type ErrorResponse = {
  status: number;
  message: string;
  errors: { field: string; message: string }[] | undefined;
};