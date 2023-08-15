import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex items-center justify-center flex-col text-center">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
        <p className="text-center desc">
          Promptia is and open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>
      </h1>
      {/* // Feed */}
      <Feed />
    </section>
  );
};

export default Home;
