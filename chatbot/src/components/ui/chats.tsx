import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Paperclip, Send, Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  sender: "bot" | "user";
  content: string;
  timestamp: string;
  attachment?: string;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "dark";
  size?: "md" | "icon";
  type?: "button" | "submit";
}) => {
  const baseClasses = "rounded-md";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "text-gray-600 hover:bg-gray-100",
    dark: "bg-black text-black-foreground shadow-sm hover:bg-black/80 text-white",
  };
  const sizeClasses = {
    md: "px-4 py-2",
    icon: "p-2",
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      content: "Hello, John here!",
      timestamp: "12m ago",
    },
    {
      id: 2,
      sender: "bot",
      content: "What can I help you with?",
      timestamp: "12m ago",
    },
    {
      id: 3,
      sender: "user",
      content:
        "I need to make enquiries about your services, and your availability.",
      timestamp: "Just now",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: inputMessage,
        timestamp: "Just now",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInputMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMessage: Message = {
            id: messages.length + 1,
            sender: "user",
            content: file.type.startsWith("image/")
              ? "Sent an image"
              : "Sent a PDF",
            timestamp: "Just now",
            attachment: e.target?.result as string,
          };
          setMessages([...messages, newMessage]);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image or PDF file.");
      }
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="w-full rounded-lg h-full flex flex-col">
      <div className="p-4 flex-grow">
        {/* Scrollable message display area */}
        <div
          className="min-h-[50vh] mb-4 pr-4 overflow-y-auto flex-grow"
          ref={scrollAreaRef}
        >
          <div className="text-center text-sm text-gray-500 py-1 mb-2 border-b">
            Mon 30 Sept
          </div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              } mb-4`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  message.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{message.content}</p>
                {message.attachment &&
                  (message.content.includes("image") ? (
                    <img
                      src={message.attachment}
                      alt="Attached"
                      className="mt-2 max-w-full h-auto"
                    />
                  ) : (
                    <a
                      href={message.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                  ))}
              </div>
              <div className="flex items-center mt-1">
                {message.sender === "bot" && (
                  <Smile className="h-4 w-4 text-xs text-gray-500" />
                )}
                <div className="ml-2 text-xs text-gray-500">
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input section */}
        <div className="sticky bottom-0 left-0 w-full bg-white p-2 border-t ">
          <textarea
            placeholder="Write a reply"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(
                e.target.scrollHeight,
                150
              )}px`;
            }}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSendMessage())
            }
            className="w-full p-2 border border-gray-300 rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAttachment}
                accept="image/*,.pdf"
                className="hidden"
              />
            </div>
            <Button onClick={handleSendMessage} size="icon" variant="dark">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2" ref={emojiPickerRef}>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
