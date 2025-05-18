import React, { useMemo, useRef, useEffect, useCallback } from 'react';
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


    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const formData = new FormData();
                    formData.append('image', file);

                    const res = await fetch('http://localhost:3000/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await res.json();

                    if (data.url) {
                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection(true);

                        if (range) {
                            quill.insertEmbed(range.index, 'image', data.url);
                            quill.setSelection(range.index + 1);
                        } else {
                            const length = quill.getLength();
                            quill.insertEmbed(length - 1, 'image', data.url);
                            quill.setSelection(length);
                        }
                    } else {
                        console.error('Upload falhou:', data);
                    }
                } catch (error) {
                    console.error('Erro ao fazer upload da imagem:', error);
                }
            }
        };
    }, []);


    // Configura módulos do Quill

    const modules = useMemo(() => ({
        toolbar: {
            container: '#toolbar',
            handlers: { image: imageHandler },
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
    }), [imageHandler]);


    const formats = [
        'header', // <- ADICIONE ESTE
        'customVideo',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image',
        'align', 'size', 'width', 'height',
    ];
    // Função para escutar clique do botão e inserir vídeo
    useEffect(() => {
        const button = document.getElementById('insert-custom-video');
        if (button && quillRef.current) {
            const editor = quillRef.current.getEditor();

            const handler = () => {
                let url = prompt('Cole a URL do vídeo (YouTube, etc)');

                if (url) {
                    // Se for um link do YouTube normal, transforma em embed
                    const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
                    if (youtubeMatch) {
                        const videoId = youtubeMatch[1];
                        url = `https://www.youtube.com/embed/${videoId}`;
                    }

                    const range = editor.getSelection(true);
                    editor.insertEmbed(range.index, 'customVideo', {
                        url,
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
                <select className="ql-header" defaultValue="">
                    <option value="1">Título 1</option>
                    <option value="2">Título 2</option>
                    <option value="">Normal</option>
                </select>

                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />

                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />

                <button className="ql-link" />
                <button className="ql-image" />

                <button id="insert-custom-video" className="ql-video" type="button" />

                <select className="ql-align" defaultValue="">
                    <option value="" />
                    <option value="center" />
                    <option value="right" />
                    <option value="justify" />
                </select>

                <button className="ql-clean" />
            </div>


            {/* Editor Quill */}
            <ReactQuill
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
