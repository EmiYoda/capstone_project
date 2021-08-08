import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import jwt_decode from 'jwt-decode';

const NewPost = () => {
    const history = useHistory();
    const { slug } = useParams() as any;
    const [author, setAuthor] = useState("");
    const [secretAuthor, setSecretAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");
    const [token, setToken] = useState("");
    const [post, setPost] = useState({
        image: "",
        title: "",
        description: "",
        markdown: "",
        author: "",
        secretAuthor: "",
    });

    useEffect(() => {
        if (slug) {
            getArticleBySlug(slug);
            setEditing(true);
        }

        // if (token !== "" || null || undefined) {}

        if (author !== "" || null || undefined) {
            setLoading(false)
        }

        const decodeUser = async () => {
            setToken(document.cookie.replace('token=', ''));
            if (token !== '' || null || undefined) {
                const decodedToken = await jwt_decode<any>(token);

                setAuthor(decodedToken.name)
                setSecretAuthor(decodedToken.email)
                post.author = author
                post.secretAuthor = secretAuthor
                console.log(author)
                console.log(secretAuthor)
            }
        }

        decodeUser()

        console.log("Hello")
    }, [slug, token, author, secretAuthor]);


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

        console.log(post.author)
        console.log(author)
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
                <ScaleLoader loading={loading} color={"#0A748B"} />
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
