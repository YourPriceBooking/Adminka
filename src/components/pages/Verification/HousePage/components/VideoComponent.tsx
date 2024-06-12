import React from 'react';

const size = { width: '462px', height: '256px' };

const zeroStyle = {
  width: 462,
  height: 256,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  fontWeight: 600,
  color: 'lightgray',
  borderRadius: 5,
};

type VideoComponentProps = {
  videoId: string;
};

export const VideoComponent: React.FC<VideoComponentProps> = ({ videoId }) => {
  const srcVideo = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div style={{ position: 'relative', marginLeft: '59%', top: '-130px' }}>
      {videoId ? (
        <iframe
          {...size}
          src={srcVideo}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div style={zeroStyle}>{`Object's video may be here!`}</div>
      )}
    </div>
  );
};
