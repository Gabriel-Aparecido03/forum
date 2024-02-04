
import { FetchNotificationUseCase } from "@/domain/notification/application/use-cases/fetch-notifcation";
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";
import { Module } from "@nestjs/common";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateUserController } from "@/infra/http/controllers/session/authenticate-user.controller";
import { DatabaseModule } from "../database/database.module";
import { FetchNotificationController } from "./controllers/notification/fetch-notification.controller";
import { ReadNotificationController } from "./controllers/notification/read-notification.controller";
import { AuthenticateUserUseCase } from "@/domain/forum/application/use-cases/authenticate-user";
import { RegisterUserUseCase } from "@/domain/forum/application/use-cases/register-user";
import { CreateTopicUseCase } from "@/domain/forum/application/use-cases/create-topic";
import { RegisterUserController } from "./controllers/session/register-user.controller";
import { CreateTopicController } from "./controllers/topic/create-topic.controller";
import { DeleteTopicUseCase } from "@/domain/forum/application/use-cases/delete-topic";
import { DeleteTopicController } from "./controllers/topic/delete-topic.controller";
import { EditTopicUseCase } from "@/domain/forum/application/use-cases/edit-topic";
import { EditTopicController } from "./controllers/topic/edit-topic.controller";
import { FetchTopicsController } from "./controllers/topic/fetch-topics.controller";
import { FetchTopicsUseCase } from "@/domain/forum/application/use-cases/fetch-topics";
import { MeUserController } from "./controllers/session/me-user";
import { MeUserUseCase } from "@/domain/forum/application/use-cases/me-user";
import { GetTopicBySlugController } from "./controllers/topic/get-topic-by-slug.controller";
import { GetTopicBySlugUseCase } from "@/domain/forum/application/use-cases/get-topic-by-slug";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";
import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/delete-answer";
import { FetchAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-answer";
import { CreateAnswerController } from "./controllers/answer/create-answer.controller";
import { EditAnswerController } from "./controllers/answer/edit-answer.controller";
import { DeleteAnswerController } from "./controllers/answer/delete-answer.controller";
import { FetchAnswerController } from "./controllers/answer/fetch-answers.controller";
import { CreateAnswerReplyUseCase } from "@/domain/forum/application/use-cases/create-answer-reply";
import { EditAnswerReplyUseCase } from "@/domain/forum/application/use-cases/edit-answer-reply";
import { DeleteAnswerReplyUseCase } from "@/domain/forum/application/use-cases/delete-answer-reply";
import { FetchAnswerReplysUseCase } from "@/domain/forum/application/use-cases/fetch-answer-reply";
import { CreateAnswerReplyController } from "./controllers/answer-replys/create-answer-reply.controller";
import { EditAnswerReplyController } from "./controllers/answer-replys/edit-answer-reply.controller";
import { DeleteAnswerReplyController } from "./controllers/answer-replys/delete-answer-reply.controller";
import { FetchAnswerReplyController } from "./controllers/answer-replys/fetch-answers-reply.controller";
import { CreateAnswerUseCase } from "@/domain/forum/application/use-cases/create-answer";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateUserController,
    RegisterUserController,
    MeUserController,
    CreateTopicController,
    DeleteTopicController,
    EditTopicController,
    FetchTopicsController,
    GetTopicBySlugController,
    CreateAnswerController,
    EditAnswerController,
    DeleteAnswerController,
    FetchAnswerController,
    CreateAnswerReplyController,
    EditAnswerReplyController,
    DeleteAnswerReplyController,
    FetchAnswerReplyController,
    FetchNotificationController,
    ReadNotificationController
  ],
  providers: [
    AuthenticateUserUseCase,
    RegisterUserUseCase,
    MeUserUseCase,
    CreateTopicUseCase,
    DeleteTopicUseCase,
    EditTopicUseCase,
    FetchTopicsUseCase,
    GetTopicBySlugUseCase,
    CreateAnswerUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchAnswersUseCase,
    CreateAnswerReplyUseCase,
    EditAnswerReplyUseCase,
    DeleteAnswerReplyUseCase,
    FetchAnswerReplysUseCase,
    FetchNotificationUseCase,
    ReadNotificationUseCase
  ],
})
export class HttpModule{}
