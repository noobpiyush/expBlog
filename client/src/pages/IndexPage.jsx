import { useEffect, useState } from "react";
import Posts from "../Posts";


export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(function () {
        fetch("http://13.126.252.210:4000/post").then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => ( <Posts {...post} ></Posts>))}
        </>
    )
}