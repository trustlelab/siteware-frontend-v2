import React from 'react';

// ChatBubbleIcon Component
interface IconProps {
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
  }
  
// DeleteIcon Component
export const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} > <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>
);


export const ChatBubbleIcon: React.FC<IconProps> = ({ width = 18, height = 18, fill = "none", stroke = "#7F56D9" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill={fill}> <path d="M5.25 7.75H5.25833M9 7.75H9.00833M12.75 7.75H12.7583M4.83333 14V15.9463C4.83333 16.3903 4.83333 16.6123 4.92436 16.7263C5.00352 16.8255 5.12356 16.8832 5.25045 16.8831C5.39636 16.8829 5.56973 16.7442 5.91646 16.4668L7.90434 14.8765C8.31043 14.5517 8.51347 14.3892 8.73957 14.2737C8.94017 14.1712 9.15369 14.0963 9.37435 14.051C9.62306 14 9.88308 14 10.4031 14H12.5C13.9001 14 14.6002 14 15.135 13.7275C15.6054 13.4878 15.9878 13.1054 16.2275 12.635C16.5 12.1002 16.5 11.4001 16.5 10V5.5C16.5 4.09987 16.5 3.3998 16.2275 2.86502C15.9878 2.39462 15.6054 2.01217 15.135 1.77248C14.6002 1.5 13.9001 1.5 12.5 1.5H5.5C4.09987 1.5 3.3998 1.5 2.86502 1.77248C2.39462 2.01217 2.01217 2.39462 1.77248 2.86502C1.5 3.3998 1.5 4.09987 1.5 5.5V10.6667C1.5 11.4416 1.5 11.8291 1.58519 12.147C1.81635 13.0098 2.49022 13.6836 3.35295 13.9148C3.67087 14 4.05836 14 4.83333 14ZM5.66667 7.75C5.66667 7.98012 5.48012 8.16667 5.25 8.16667C5.01988 8.16667 4.83333 7.98012 4.83333 7.75C4.83333 7.51988 5.01988 7.33333 5.25 7.33333C5.48012 7.33333 5.66667 7.51988 5.66667 7.75ZM9.41667 7.75C9.41667 7.98012 9.23012 8.16667 9 8.16667C8.76988 8.16667 8.58333 7.98012 8.58333 7.75C8.58333 7.51988 8.76988 7.33333 9 7.33333C9.23012 7.33333 9.41667 7.51988 9.41667 7.75ZM13.1667 7.75C13.1667 7.98012 12.9801 8.16667 12.75 8.16667C12.5199 8.16667 12.3333 7.98012 12.3333 7.75C12.3333 7.51988 12.5199 7.33333 12.75 7.33333C12.9801 7.33333 13.1667 7.51988 13.1667 7.75Z" stroke={stroke} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" /> </svg>
);

// TickIcon Component
export const TickIcon: React.FC<IconProps> = ({ width = 20, height = 20, fill = "#7F56D9", stroke = "white" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill={fill} /> <path d="M13.6667 8L9.08333 12.5833L7 10.5" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" /> </svg>
);

// VoiceAgentIcon Component
export const VoiceAgentIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <g clipPath="url(#clip0_1_13243)"> <path d="M4.99984 9.1665V10.8332M8.33317 7.49984V12.4998M11.6665 5.83317V14.1665M14.9998 9.1665V10.8332M18.3332 9.99984C18.3332 14.6022 14.6022 18.3332 9.99984 18.3332C5.39746 18.3332 1.6665 14.6022 1.6665 9.99984C1.6665 5.39746 5.39746 1.6665 9.99984 1.6665C14.6022 1.6665 18.3332 5.39746 18.3332 9.99984Z" stroke="#7F56D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g> <defs> <clipPath id="clip0_1_13243"> <rect width="20" height="20" fill="white" /> </clipPath> </defs> </svg>
);

// VoiceIcon Component
export const VoiceIcon: React.FC<IconProps> = ({ width = 18, height = 18, fill = "none", stroke = "#7F56D9" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill={fill}> <g clipPath="url(#clip0_1_14090)"> <path d="M4.5 8.25V9.75M7.5 6.75V11.25M10.5 5.25V12.75M13.5 8.25V9.75M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke={stroke} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" /> </g> <defs> <clipPath id="clip0_1_14090"> <rect width="18" height="18" fill="white" /> </clipPath> </defs> </svg>
);
