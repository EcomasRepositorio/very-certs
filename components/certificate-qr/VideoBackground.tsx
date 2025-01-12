// app/certs/[uuid]/VideoBackground.tsx
"use client";

import React, { useRef, useEffect } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      src="/image/fond2.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default VideoBackground;
