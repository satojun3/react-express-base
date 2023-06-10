import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import { body, validationResult } from "express-validator";
import BadRequestError from "./Error/BadRequestError";
import { ErrorResponse, ValidationBody } from './interfaces'
import cors from "cors";
import ChatController from "./Controller/ChatContorller";

const app = express();
app.use(cors());
app.use(express.json());

// Custom middleware to handle validation errors
function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new BadRequestError('Validation failed', errors.array());
    next(error);
  }
  return next();
}

app.post(
  "/api/ask",
  [body("messages.*.content").not().isEmpty()],
  handleValidationErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatContorller = new ChatController();
      const answer = await chatContorller.ask(req, res);
      res.json(answer);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * バリデーションエラー時の処理
 */
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.name, err);  // Log the full error

  let status = 500;  // Default status code is 500
  let errors: { field: string; message: string }[] | undefined;

  // バリデーションエラーが発生
  if (err instanceof BadRequestError) {
    status = 400;
    // バリデーションエラー
    errors = err.validation.map((v: ValidationBody) => {
      return {
        field: v.path,
        message: v.msg
      }
    });
  }

  const errorResponse: ErrorResponse = {
    status: status,
    message: err.message || "Unknown error",
    errors: errors,
  };

  res.status(status).json(errorResponse);
};
app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
