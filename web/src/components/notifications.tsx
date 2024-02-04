import { useQuery } from "@tanstack/react-query";
import { Bell } from "phosphor-react";
import { useState } from "react";
import { api } from "../lib/axios";
import { FetchNotification } from "../types/fetch-notifications";
import { Notification } from "./notification";

export function Notifications() {

  const [openNotification, setOpenNotification] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: [`notifications`],
    queryFn: async () =>
      await api.get(`/notifications/`)
  })


  const notifications = data?.data as FetchNotification[]

  return (
    <div className="bg-white p-1 relative">
      <Bell className="text-zinc-700 cursor-pointer" onClick={() => { setOpenNotification(!openNotification) }} />
      {openNotification && <div className="flex flex-col absolute border-solid border-zinc-200 border w-96 h-72 left-[-18rem] top-12 rounded-lg overflow-y-auto">
        {!notifications || notifications?.length === 0 && <span>You dont have any notification .</span>}
        {notifications?.length > 0 && notifications.map(i =>
          <Notification
            content={i.content}
            id={i.id}
            onRead={async () => { await refetch() }}
            readAt={i.readAt}
            sendAt={i.sendAt}
            title={i.title}
            key={i.id}
          />
        )}
      </div>}
    </div>
  )
}