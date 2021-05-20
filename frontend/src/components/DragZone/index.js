import React from 'react';
import {useDropzone} from 'react-dropzone';

import { Container } from './style'

const StyledDropzone = (props) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        acceptedFiles,
        isDragReject
    } = useDropzone({
        accept: 'image/*', 
        maxFiles:1,
        onDrop: files => {
            props.handleChange(files);
          }
        });
  
    const files = acceptedFiles.map(file => (
        <span key={file.path}>
          : {file.path} - {file.size} bytes
        </span>
      ));


    return (
        <div className="container">
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
            <input {...getInputProps()} />
            <p> Você pode arrastar e soltar arquivos aqui para adicioná-los.</p>
            <aside>
                <span><b>Files</b></span><>{files}</>
            </aside>
        </Container>
        </div>
    );
}

export default StyledDropzone;