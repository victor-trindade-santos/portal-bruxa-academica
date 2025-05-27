import React, { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import '../utils/quillSetup'; // Importa o setup logo no topo
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

// Registrar módulo de redimensionamento de imagem
Quill.register('modules/imageResize', ImageResize);

// --- Definindo o blot customizado para vídeo com tamanho customizado ---
const BlockEmbed = Quill.import('blots/block/embed');

class CustomVideo extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('src', value.url || value);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        node.setAttribute('width', value.width || '640');
        node.setAttribute('height', value.height || '360');
        node.setAttribute('style', 'display: block; margin: 0 auto;'); // centraliza vídeo por padrão
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

Quill.register(CustomVideo);

const QuillEditor = ({ value, onChange, placeholder = "Digite algo...", readOnly = false }) => {
    const quillRef = useRef(null);


    // Configura módulos do Quill

    const modules = useMemo(() => ({
        toolbar: {
            container: '#toolbar',
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
    }), []);


    const formats = [
        'header',            // títulos H1, H2, etc.
        'bold', 'italic', 'underline', 'strike',
        'blockquote',
        'list', 'bullet',
        'link', 'image', 'customVideo', // precisa incluir 'video' se está usando botão de vídeo
        'align',                  // ESSENCIAL para <select className="ql-align">
        'clean'                   // botão ql-clean (remover estilos)
    ];

    // Função para escutar clique do botão e inserir vídeo
    useEffect(() => {
        const button = document.getElementById('insert-custom-video');
        if (button && quillRef.current) {
            const editor = quillRef.current.getEditor();

            const handler = () => {
                let url = prompt('Cole a URL do vídeo (YouTube, etc)');

                if (url) {
                    // Função para extrair o link embed do YouTube
                    function getYoutubeEmbedUrl(url) {
                        let videoId = null;

                        // youtube.com/watch?v=VIDEO_ID
                        let match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
                        if (match && match[1]) videoId = match[1];

                        // youtu.be/VIDEO_ID
                        if (!videoId) {
                            match = url.match(/(?:https?:\/\/)?youtu\.be\/([\w-]+)/);
                            if (match && match[1]) videoId = match[1];
                        }

                        // m.youtube.com/watch?v=VIDEO_ID (mobile)
                        if (!videoId) {
                            match = url.match(/(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([\w-]+)/);
                            if (match && match[1]) videoId = match[1];
                        }

                        if (videoId) {
                            return `https://www.youtube.com/embed/${videoId}`;
                        }

                        // Se não for um YouTube válido, retorna a URL original (pode ser outra fonte de vídeo)
                        return url;
                    }

                    // **Chamada correta: transforma URL original em embed**
                    const embedUrl = getYoutubeEmbedUrl(url);

                    const range = editor.getSelection(true);
                    editor.insertEmbed(range.index, 'customVideo', {
                        url: embedUrl,   // <== usa o embedUrl aqui, não a url original
                        width: '640',
                        height: '360',
                    });
                    editor.setSelection(range.index + 1);
                }
            };


            button.addEventListener('click', handler);

            // cleanup listener no unmount
            return () => button.removeEventListener('click', handler);
        }
    }, []);

    return (
        <>
            {/* Toolbar personalizada */}
            <div id="toolbar">
                <select className="ql-align" defaultValue="">
                    <option value=""></option>
                    <option value="center"></option>
                    <option value="right"></option>
                    <option value="justify"></option>
                </select>

                <select className="ql-header" defaultValue="">
                    <option value="2">Subtítulo</option>
                    <option value="3">Subseção</option>
                    <option value="">Parágrafo</option>
                </select>

                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />

                <button className="ql-blockquote" /> 

                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-link" />
                <button className="ql-image" />
                <button id="insert-custom-video" className="ql-video" type="button" />
                <button className="ql-clean" />
            </div>


            {/* Editor Quill */}
            <ReactQuill
                className="react-quill"
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        </>
    );
};

export default QuillEditor;
