'use client';

import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  onProgress?: (percentage: number) => void;
  onComplete?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, onProgress, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        onProgress?.(percentage);
      }
    };

    const handleEnded = () => {
      onComplete?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
      <video
        ref={videoRef}
        src={url}
        controls
        className="w-full h-full"
      >
        Seu navegador não suporta vídeos.
      </video>
    </div>
  );
};
