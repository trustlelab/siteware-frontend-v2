import React, { useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import { FiSend } from "react-icons/fi";
import { IoMdHappy } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; type: string }[]>([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const currentAgentName = useSelector((state: RootState) => state.agent.agentData?.name);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: "sent" }]);
      setInput("");
      setTimeout(() => {
        const replies = [
          "Hello! How can I assist you?",
          "Thank you for your message!",
          "I'm here to help!",
          "Can you please elaborate more?",
          "Got it, let me check.",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages((prevMessages) => [...prevMessages, { text: randomReply, type: "received" }]);
      }, 1000);
    }
  };

  const addEmoji = (emoji: any) => {
    setInput(input + emoji.native);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 ">
      <h1>Chat with {currentAgentName}</h1>
      <div className="flex-1 overflow-auto mb-4 px-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md mb-2 max-w-xs ${
              message.type === "sent" ? "ml-auto bg-green-300 dark:bg-green-600" : "mr-auto bg-gray-200 dark:bg-gray-900"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="relative flex items-center border-t border-gray-300  dark:border-gray-950 pt-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-2xl p-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdHappy />
        </button>
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-12">
            <Picker onEmojiSelect={addEmoji} theme="light" />
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message here..."
          className="flex-1 border-none outline-none bg-transparent px-2"
        />
        <button
          onClick={handleSend}
          className="text-2xl p-2 text-green-500 hover:text-green-700"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
