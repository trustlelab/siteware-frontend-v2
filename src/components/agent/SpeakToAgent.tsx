import React, { useState, useEffect } from 'react';
import { FaComments, FaPhoneSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface SpeakToAgentButtonProps {
  onClick?: () => void;
}

let mediaRecorder: MediaRecorder;
let socket: WebSocket;

const SpeakToAgent: React.FC<SpeakToAgentButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isSpeaking) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSpeaking]);

  const initializeWebSocket = () => {
    setIsConnecting(true);
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("WebSocket connection established with backend server");
      setIsConnecting(false);
      setIsSpeaking(true); // Start call duration timer
      startRecording(); // Start recording and sending data
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.transcript) {
       
        console.log(data.transcript)
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnecting(false);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsSpeaking(false);
      setIsConnecting(false);
    };
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 8000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true
      }
    })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 64000
      });

      mediaRecorder.start(50);

      mediaRecorder.ondataavailable = event => {
        const audioChunk = event.data;
        const reader = new FileReader();
        reader.onloadend = () => {
          // const base64String = reader.result.split(',')[1];

          const base64String = reader.result
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ audio: base64String }));
          }
        };
        reader.readAsDataURL(audioChunk);
      };
    })
    .catch(error => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
    if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  };

  const handleToggleCall = () => {
    if (!isSpeaking) {
      initializeWebSocket(); // Start WebSocket and recording
    } else {
      setIsSpeaking(false);
      stopRecording(); // Stop recording and close WebSocket
    }
    if (onClick) onClick();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex space-x-2">
      {!isSpeaking ? (
        <button
          onClick={handleToggleCall}
          className={`flex items-center justify-center ${isConnecting ? 'bg-gray-500' : 'bg-primary-light'} hover:bg-purple-800 shadow-md px-4 py-2 rounded-lg h-10 text-white transition duration-200 text-sm md:text-base`}
          disabled={isConnecting}
        >
          <span className="hidden sm:inline">
            {isConnecting ? t('connecting') : t('speak_to_agent')}
          </span>
          <span className="sm:hidden">
            <FaComments />
          </span>
        </button>
      ) : (
        <>
          <button
            className="flex items-center justify-center w-[120px] px-4 py-2 rounded-lg h-10 dark:text-white transition duration-200 text-sm md:text-base"
          >
            <span className="text-xl">{formatDuration()}</span>
          </button>
          
          <button
            onClick={handleToggleCall}
            className="flex items-center justify-center bg-red-600 hover:bg-red-800 shadow-md px-4 py-2 rounded-lg h-10 text-white transition duration-200 text-sm md:text-base"
          >
            <FaPhoneSlash className="mr-2" />
            <span>{t('end_call')}</span>
          </button>
        
          <button
            onClick={handleToggleMute}
            className={`flex items-center justify-center ${isMuted ? 'bg-gray-600' : 'bg-primary-light'} hover:bg-gray-800 shadow-md px-4 py-2 rounded-lg h-10 text-white transition duration-200 text-sm md:text-base`}
          >
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            <span className="ml-2 hidden sm:inline">{isMuted ? t('unmute') : t('mute')}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default SpeakToAgent;
