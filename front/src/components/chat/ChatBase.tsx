"use client"
import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo, useState } from 'react'
import { v4 as uuidV4 } from "uuid"
import { Button } from '../ui/button'
import ChatSidebar from './ChatSideBar'
import ChatNav from './ChatNav'
import ChatUserDialog from './ChatUserDialog'
import Chats from './Chats'

export default function ChatBase({
    group,
    users,
    oldMessages
}: {
    group: ChatGroupType,
    users: Array<GroupChatUserType> | [],
    oldMessages: Array<MessageType> | []
}) {

    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>()

    useEffect(() => {
        const data = localStorage.getItem(group.id)

        if (data) {
            const parsedData = JSON.parse(data)
            setChatUser(parsedData)
        }
    }, [group.id])

    return (
        <div className='flex'>
            <ChatSidebar users={users} />
            <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
                {open ? (
                    <ChatUserDialog open={open} setOpen={setOpen} group={group} />
                ) : (
                    <ChatNav chatGroup={group} users={users} />
                )}

                <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
            </div>
        </div>
    )
}
