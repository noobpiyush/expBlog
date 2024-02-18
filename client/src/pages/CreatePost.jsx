import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const[files,setFiles] = useState("");
    const[redirect,setRedirect] = useState(false);
   async function createNewPost(ev){
        const data = new FormData();
        data.set("title",title);
        data.set("summary",summary);
        data.set("content",content);
        data.set("file",files[0]);
        ev.preventDefault();
        
      const response =  await fetch("http://13.126.252.210:4000/post",{
            method:"POST",
            body: data,
            credentials:"include",
        });

        // console.log(await response.json());
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to ={"/"} ></Navigate>
    }

    return (

        <form onSubmit={createNewPost} >
            <input type="text"
             placeholder={"Title"} 
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
            <input type="text"
             placeholder={"Summary"}
             value={summary}
             onChange={ev => setSummary(ev.target.value)}
            />
            <input type="file"
             onChange={ev => setFiles(ev.target.files)}
            />
            <Editor value={content} onChange={setContent} ></Editor>
            <button style={{ marginTop: "5px", cursor: "pointer" }} >Create Post</button>
        </form>
    )
}