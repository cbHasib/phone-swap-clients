import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  const {
    author,
    thumbnail,
    postBody,
    postCategory,
    publishDate,
    slug,
    title,
  } = blog;

  const textBody = postBody.replace(/(<([^>]+)>)/gi, "").substring(0, 70);

  const navigate = useNavigate();

  const handleBlog = (slug) => {
    navigate(`/blog/post/${slug}`);
  };

  return (
    <div className="rounded-lg w-full h-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden border dark:border-gray-700 border-gray-200 blogCard cursor-pointer">
      <div onClick={() => handleBlog(slug)} className="relative ">
        <figure className="relative thumb-blogCard overflow-hidden">
          <img
            className="lg:h-[240px] w-full object-cover"
            src={thumbnail}
            alt={title}
          />
        </figure>
        <div className="bg-blue-700 rounded-full absolute top-4 left-4 bg-opacity-90 px-2 py-1 text-white/90 text-sm">
          {postCategory}
        </div>

        <div className="p-4 text-sm flex  flex-col gap-2 dark:text-white/75">
          <div>
            <h2 className="font-semibold text-lg leading-6 mb-1 flex items-center gap-2 text-center justify-center dark:text-white/80">
              {title}
            </h2>
            <p className="text-center ">{textBody + "..."}</p>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 mt-auto" />
          <div className="flex justify-between items-center">
            <span className="m-0 p-0 text-base">{author}</span>
            <span className="m-0 p-0 text-base">{publishDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
