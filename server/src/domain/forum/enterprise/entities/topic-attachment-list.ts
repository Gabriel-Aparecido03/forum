import { WatchedList } from "../../../core/watched-list";
import { TopicAttachment } from "./topic-attachment";

export class TopicAttachmentList extends WatchedList<TopicAttachment> {
  compareItems(a: TopicAttachment, b: TopicAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}