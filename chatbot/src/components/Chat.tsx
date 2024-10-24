import { Maximize2, MessageCircle, Minimize2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatComponent from "./ui/chats";

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      setIsExpanded(true);
    }
  }, [isMobile, isOpen]);

  const handleToggle = () => {
    if (isExpanded && !isMobile) {
      setIsExpanded(false);
    } else {
      setIsOpen(!isOpen);
      if (isMobile) {
        setIsExpanded(true);
      }
    }
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <>
      {!isExpanded && (
        <button
          className={`fixed w-16 h-16 flex items-center justify-center rounded-full border border-gray-300 bg-white text-black ${
            isExpanded ? "top-6 left-8 z-50" : "bottom-6 left-8"
          }`}
          onClick={handleToggle}
        >
          {isOpen ? (
            <X className="h-10 w-10" />
          ) : (
            <MessageCircle className="h-10 w-10 fill-current" />
          )}
        </button>
      )}

      {isOpen && (
        <div
          className={`
          fixed ${
            isExpanded || isMobile
              ? "inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-xs"
              : "bottom-24 left-8"
          }
          ${isExpanded || isMobile ? "z-50" : "z-40"}
        `}
        >
          <div
            className={`
            bg-[#e9efe7] border border-gray-300 rounded-lg shadow-lg overflow-hidden
            ${isExpanded || isMobile ? "w-full md:max-w-2xl" : "w-80"}
          `}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 flex justify-between items-center">
                <h4 className="font-medium text-lg">Chat with Sugarpool</h4>
                <div className="flex items-center space-x-2">
                  {!isMobile && (
                    <button className="p-1" onClick={handleExpand}>
                      {isExpanded ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {(isExpanded || isMobile) && (
                    <button className="p-1" onClick={handleClose}>
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Message Display Area */}
              <div className="flex-grow flex flex-col space-y-4 bg-white rounded-t-3xl overflow-auto custom-scrollbar max-h-[80vh]">
                <ChatComponent />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
