import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";


const App = () => {
  let history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await axios.get("http://localhost:8000/api/post");
      setPosts(resp.data.reverse());
    } catch (err) {
      console.log({ error: err });
    }
  };

  const renderPost = () => {
    if (posts.length === 0) {
      return <i className="gg-spinner-two"></i>
    } else {
      return posts.map((post: any) => (
        <button
          key={post._id}
          onClick={() => history.push(`/article/${post.slug}`)}
        >

          {/* image={post.image}
            title={post.title}
            description={post.description}
            createdAt={post.createdAt} */}

          <h1>
            {post.title}
          </h1>
          {/* <img src={post.image} alt="ALT" /> */}
          <h2>{post.description}</h2>
        </button>
      ));
    }
  };

  return (
    <div className="app">
      {renderPost()}
    </div>
  )
};

export default App;