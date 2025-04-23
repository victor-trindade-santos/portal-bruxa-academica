  import React from 'react';

  const VideoAstrologia = () => {
    return (
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/SMureUD4h_c"  // Modifiquei para embed, pois o YouTube não permite exibir vídeos diretamente via iframe sem 'embed'
        title="Interpretando o Mapa Astral"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  export default VideoAstrologia;
