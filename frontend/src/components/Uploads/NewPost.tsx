import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

const NewPost = () => {
    const history = useHistory();
    const { slug } = useParams() as any;
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");
    const [post, setPost] = useState({
        image: "",
        title: "",
        description: "",
        markdown: "",
    });

    useEffect(() => {
        if (slug) {
            getArticleBySlug(slug);
            setEditing(true);
        }
    }, [slug]);

    const getArticleBySlug = async (slug: any) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/post/${slug}`);
            setPost(res.data);
            setId(res.data._id);
        } catch (err) {
            console.log({ error: err });
        }
    };

    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            if (editing) {
                try {
                    await axios.put(`http://localhost:8000/api/update/${id}`, post);
                    history.push(`/post/${slug}`);
                } catch (err) {
                    console.log({ error: err });
                }
            } else {
                try {
                    await axios.post("http://localhost:8000/api/new/post", post);
                    history.push("/");
                } catch (err) {
                    console.log({ error: err });
                }
            }
        }
    };


    return (
        <div>


            {document.cookie.replace('token=', '') !== '' || null || undefined ? <form onSubmit={onSubmit}>
                <input
                    type="text"
                    required={editing ? false : true}
                    placeholder="Url image"
                    name="image"
                    value={post.image}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    required={editing ? false : true}
                    placeholder="Title"
                    name="title"
                    value={post.title}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    required={editing ? false : true}
                    placeholder="Description"
                    name="description"
                    value={post.description}
                    onChange={changeHandler}
                />
                <textarea
                    required={editing ? false : true}
                    placeholder="Markdown here"
                    name="markdown"
                    value={post.markdown}
                    onChange={changeHandler}
                />
                <div>
                    <button onClick={() => history.goBack()}>Back</button>
                    <button type="submit">{editing ? "Edit" : "Create"}</button>
                </div>
            </form> : <Link to="/auth">Login or Register</Link>}
        </div>
    )
}

export default NewPost
