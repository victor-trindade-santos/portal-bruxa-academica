import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

// Protege contra múltiplos registros com flag global
if (!window.__quillSetupDone) {
  // --- Registrar módulo de redimensionamento de imagem ---
  Quill.register('modules/imageResize', ImageResize);

  // --- Registrar blot customizado para vídeo ---
  const BlockEmbed = Quill.import('blots/block/embed');

  class CustomVideo extends BlockEmbed {
    static create(value) {
      const node = super.create();
      node.setAttribute('src', value.url || value);
      node.setAttribute('frameborder', '0');
      node.setAttribute('allowfullscreen', true);
      node.setAttribute('width', value.width || '640');
      node.setAttribute('height', value.height || '360');
      node.setAttribute('style', 'display: block; margin: 0 auto;');
      return node;
    }

    static value(node) {
      return {
        url: node.getAttribute('src'),
        width: node.getAttribute('width'),
        height: node.getAttribute('height'),
      };
    }
  }

  CustomVideo.blotName = 'customVideo';
  CustomVideo.className = 'ql-custom-video';
  CustomVideo.tagName = 'iframe';

  Quill.register('formats/customVideo', CustomVideo);

  // Marca como registrado
  window.__quillSetupDone = true;
}
