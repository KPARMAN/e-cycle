import Sidebar from "@/components/Sidebar.jsx";
import DashboardHeader from "@/components/DashboardHeader.jsx";
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");

  const chats = [
    {
      id: 1,
      name: "Chioma Okafor",
      avatar:
        "https://images.pexels.com/photos/32401765/pexels-photo-32401765.jpeg",
      lastMessage: "That sounds great! When can we meet?",
      lastTime: "5 mins ago",
      unread: 2,
      status: "online",
    },
    {
      id: 2,
      name: "Chinedu Nwosu",
      avatar:
        "https://images.pexels.com/photos/7191260/pexels-photo-7191260.jpeg",
      lastMessage: "I'm interested in your laptop listing",
      lastTime: "2 hours ago",
      unread: 0,
      status: "offline",
    },
    {
      id: 3,
      name: "Aisha Bello",
      avatar:
        "https://images.pexels.com/photos/33672079/pexels-photo-33672079.jpeg",
      lastMessage: "Can you provide more details?",
      lastTime: "1 day ago",
      unread: 0,
      status: "online",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Chioma",
      text: "Hi! I'm interested in your computer parts listing",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Great! I have 5 items available. What are you looking for?",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Chioma",
      text: "I need RAM and storage drives. Are they in working condition?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Yes, all items are tested and working perfectly. I can show you pictures",
      time: "10:37 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Chioma",
      text: "That sounds great! When can we meet?",
      time: "10:40 AM",
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Message sent:", messageText);
      setMessageText("");
    }
  };

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Chats Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            {/* Chats Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-4 mb-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-green-600">
                  Chats
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Groups
                </button>
              </div>
              <input
                type="text"
                placeholder="search"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? "bg-green-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          chat.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {chat.name}
                        </h3>
                        {chat.unread > 0 && (
                          <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      <p className="text-xs text-gray-500">{chat.lastTime}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {currentChat && (
              <>
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-green-50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={currentChat.avatar}
                        alt={currentChat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          currentChat.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {currentChat.name}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {currentChat.status}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? "bg-green-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn ? "text-green-100" : "text-gray-600"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {!currentChat && (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
