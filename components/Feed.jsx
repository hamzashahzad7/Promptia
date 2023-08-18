"use client";

import React, { useEffect, useState, useRef } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState({
    searchText: "",
    searchedItems: [],
  });

  const [posts, setPosts] = useState([]);
  let timeout;

  const searchInputRef = useRef(null); // Reference to the search input element

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText((prevSearchText) => ({
      ...prevSearchText,
      searchText: query,
    }));

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const filteredItems = posts.filter(
        (item) =>
          item.prompt.toLowerCase().includes(query.toLowerCase().trim()) ||
          item.tag.toLowerCase().includes(query.toLowerCase().trim())
      );
      setSearchText((prevSearchText) => ({
        ...prevSearchText,
        searchedItems: filteredItems,
      }));
    }, 300);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
  };

  const handleClickOutside = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setSearchText((prevSearchText) => ({
        ...prevSearchText,
        searchedItems: [], // Clear search results when clicking outside
      }));
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();

    document.addEventListener("click", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("click", handleClickOutside); // Remove event listener on unmount
    };
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center flex-col"
        onSubmit={handleFormSubmit}
      >
        <input
          type="search"
          value={searchText.searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          required
          className="search_input peer outline-none border-none"
          ref={searchInputRef} // Assign the ref to the input element
        />

        {searchText.searchedItems.length > 0 && (
          <div className="w-full h-auto bg-[#3335] search-container space-y-5 px-4 py-2 shadow-xl text-black absolute top-16 z-[100] prompt_card">
            <h4>Related Posts</h4>
            {searchText.searchedItems.map((item) => (
              <div key={item._id}>
                <div className="font-bold">{item.tag}</div>
                <div>{item.prompt}</div>
              </div>
            ))}
          </div>
        )}
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
