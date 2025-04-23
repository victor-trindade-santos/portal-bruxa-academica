  import React from 'react';

  const VideoNumerologia = () => {
    return (
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/fb8M1kflxCs"  // Modifiquei para embed, pois o YouTube não permite exibir vídeos diretamente via iframe sem 'embed'
        title="Interpretando os Numeros"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  export default VideoNumerologia;