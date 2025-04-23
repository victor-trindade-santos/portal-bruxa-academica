  import React from 'react';

  const VideoTarot = () => {
    return (
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/9sOm-oZNFNc"  // Modifiquei para embed, pois o YouTube não permite exibir vídeos diretamente via iframe sem 'embed'
        title="Interpretando as Cartas"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  export default VideoTarot;
