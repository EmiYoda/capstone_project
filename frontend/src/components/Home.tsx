import React from "react";

const Home = (props: { name: string }) => {
  return (
    <div className="Home">
      <h1>{props.name ? "hi " + props.name : "You are not logged in"}</h1>
    </div>
  );
};

export default Home;
