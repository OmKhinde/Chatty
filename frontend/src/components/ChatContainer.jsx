import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from  "./ChatHeader.jsx"
import MessageInputs from "./MessageInputs.jsx"
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import formatMessageTime from "../lib/utils.js"
import { useAuthStore } from '../store/useAuthStore.js';


function ChatContainer() {

  const {selectedUser,messages,getMessages,isMessagesLoading } = useChatStore();
  const {authUser}  = useAuthStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
  },[getMessages,selectedUser._id]);

  if(isMessagesLoading){
      return (
          <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInputs/>
          </div>
      )
  }

  return (
     <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-start" : "chat-end"}`}
            // ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)};
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-50 rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInputs />
    </div>

  )
}

export default ChatContainer