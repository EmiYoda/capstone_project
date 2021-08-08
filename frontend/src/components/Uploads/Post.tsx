import React, { useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
    const history = useHistory();
    const [post, setPost] = useState({}) as any;
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const { slug } = useParams() as any;

    useEffect(() => {
        getDataBySlug(slug);
        const verifyUser = async () => {
            setToken(document.cookie.replace('token=', ''))
            if (token !== '' || null || undefined) {
                const decode = await jwt_decode<any>(token)

                setUser(decode.email)
                console.log(post.secretAuthor)
            }
        }

        verifyUser()
    }, [slug, token, user, post.sercretAuthor]);


    const getDataBySlug = async (slug: any) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/post/${slug}`);
            setPost(res.data);
        } catch (err) {
            console.log({ error: err });
        }
    };

    const deletePost = async (id: any) => {
        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            if (window.confirm("Do you wanna delete this post?")) {
                try {

                    await axios.delete(`http://localhost:8000/api/delete/${id}`);
                    history.push("/");
                } catch (err) {
                    console.log({ error: err });
                }
            }
        }
    };


    const adminPost = (id: any) => {
        if (document.cookie.replace('token=', '') !== '' || null || undefined) {
            return (
                <div>
                    <button
                        onClick={() => deletePost(id)}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => history.push(`/edit/${slug}`)}
                    >
                        Edit
                    </button>
                </div>
            );
        }


    };

    const renderMarkdown = () => {
        if (post.markdown === undefined) {
            return (
                <div>
                    <h1>Null</h1>
                </div>
            );
        } else {
            return (
                <ReactMarkdown>{post.markdown}</ReactMarkdown>
            );
        }
    };


    return (
        <div>
            <div>
                {/* <img src={post.image} alt="ALT" /> */}
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>
                <h4>{post.createdAt}</h4>
                <h5>{post.author}</h5>
                {post.secretAuthor === user ? adminPost(post._id) : null}
            </div>
            <hr />
            {renderMarkdown()}
        </div>
    )
}

export default Post
