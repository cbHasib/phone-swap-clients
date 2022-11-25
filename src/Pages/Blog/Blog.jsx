import React, { useEffect, useState } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";
import BlogCard from "./BlogCard";

const Blog = () => {
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data.reverse());
          setError(null);
        } else {
          setError(data.error);
        }
        setLoad(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(false);
      });
  }, []);

  useScrollToTop();
  useTitle("Blog");

  if (load) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="p-[5%] py-10 text-center dark:bg-gray-900">
      <h2 className="font-bold text-4xl my-10 text-black/90 dark:text-white/90">
        Recent <span className="text-blue-700 dark:text-blue-600">Blog</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-8 xl:w-[90%] mx-auto">
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
