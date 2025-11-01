
import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const WandIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278V6.25278C10.8213 6.25278 9.87376 7.20033 9.87376 8.37905V15.6209C9.87376 16.7997 10.8213 17.7472 12 17.7472V17.7472C13.1787 17.7472 14.1262 16.7997 14.1262 15.6209V8.37905C14.1262 7.20033 13.1787 6.25278 12 6.25278Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.7472 12C17.7472 13.1787 16.7997 14.1262 15.6209 14.1262H8.37905C7.20033 14.1262 6.25278 13.1787 6.25278 12C6.25278 10.8213 7.20033 9.87376 8.37905 9.87376H15.6209C16.7997 9.87376 17.7472 10.8213 17.7472 12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.99994 4.04169L4.04163 6.00001" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.9583 18L17.9999 20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.04169 18L5.99998 20" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 4.04169L20 5.99998" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);
