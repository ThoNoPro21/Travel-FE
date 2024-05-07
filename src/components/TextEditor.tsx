// components/custom-editor.js
'use client'
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAppDispatch } from '../store/hooks';
// import { setContent } from '../store/slices/article.slice';


type Props = {
    initialData: string;
    setContent:(value:string)=>void;
};

const editorConfiguration = {
    ckfinder: {
        uploadUrl: 'http://127.0.0.1:8000/api/v1/upload',
        options: {
            resourceType: 'Images',
            // headers: {
            //     Accept: 'application/json',
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`,
            // },
        },
    },
        heading: {
            options: [
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        }
};

function CustomEditor(props: Props) {
    // const disPatch = useAppDispatch();
    return (
        <CKEditor
            editor={ClassicEditor}
            data={props.initialData}
            config={editorConfiguration as any}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.setContent(data);
            }}
        />
    );
}

export default CustomEditor;
