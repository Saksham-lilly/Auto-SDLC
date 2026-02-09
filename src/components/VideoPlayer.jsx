import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRewind = () => {
        videoRef.current.currentTime = Math.max(0, currentTime - 10);
    };

    const handleFastForward = () => {
        videoRef.current.currentTime = Math.min(videoRef.current.duration, currentTime + 10);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    useEffect(() => {
        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} src={videoSrc} width="600" />
            <div>
                <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={handleRewind}>Rewind 10s</button>
                <button onClick={handleFastForward}>Fast Forward 10s</button>
            </div>
        </div>
    );
};

export default VideoPlayer;
