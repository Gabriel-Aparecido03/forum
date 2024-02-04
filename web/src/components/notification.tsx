import { api } from "../lib/axios";
import { dayjs } from "../lib/dayjs";

interface NotificationPropsType {
  onRead: () => Promise<void>
  readAt: Date | null
  sendAt: Date
  title: string
  content: string
  id: string
}

export function Notification({ content, onRead, readAt, sendAt, title, id }: NotificationPropsType) {

  async function handleRead() {
    try {
      await api.patch(`/notifications/${id}`)
      await onRead()
    } catch (error) { }
  }

  return (
    <div
      onMouseEnter={() => {
        if (readAt) return
        handleRead()
      }}
      className=" flex items-center p-4 gap-4"
    >
      { !readAt && <span className="h-2 w-2 bg-orange-500 rounded-full" />}
      <div className="flex flex-col justify-between gap-2">
        <p className="text-sm font-bold text-zinc-700">{title}</p>
        <span className="text-xs font-light text-zinc-300">{content} </span>
        <span className="text-xs font-light text-zinc-700"> {dayjs(sendAt).fromNow()}</span>
      </div>
    </div>
  )
}