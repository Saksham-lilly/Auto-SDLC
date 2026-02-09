import React from 'react';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    const videoSrc = 'path/to/video.mp4'; // Replace with your video source

    return (
        <div>
            <h1>Video Player</h1>
            <VideoPlayer videoSrc={videoSrc} />
        </div>
    );
};

export default App;
