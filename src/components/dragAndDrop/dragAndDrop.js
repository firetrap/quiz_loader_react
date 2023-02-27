import React from 'react';
import {useDropzone} from 'react-dropzone';
import "./dragAndDrop.css"

export default function DragAndDrop(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/json': []
        }, onDrop: acceptedFiles => props.onDrop(acceptedFiles)
    });

    const files = acceptedFiles.map(file => (<li key={file.path}>
        {file.path} - {file.size} bytes
    </li>));

    return (<section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop json files here, or click to select</p>
        </div>
        <aside>
            <ul>{files}</ul>
        </aside>
    </section>);
}