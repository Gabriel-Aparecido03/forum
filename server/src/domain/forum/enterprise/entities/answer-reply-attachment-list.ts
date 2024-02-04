import { WatchedList } from "../../../core/watched-list";
import { AnswerReplyAttachment } from "./answer-reply-attachment";

export class AnswerReplyAttachmentList extends WatchedList<AnswerReplyAttachment> {
  compareItems(a: AnswerReplyAttachment, b: AnswerReplyAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}