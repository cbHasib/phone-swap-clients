import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const SingleBlog = () => {
  const { cat_slug, slug } = useParams();

  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);
  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/single-blog/${cat_slug}/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlog(data.data);
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
  }, [slug, cat_slug]);

  const {
    author,
    thumbnail,
    postBody,
    publishDate,
    readingMinute,
    title,
    viewCount,
  } = blog;

  useScrollToTop();
  useTitle(title || error || "Blog");

  if (load) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="p-3 lg:p-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-[95%] lg:w-[70%] mx-auto rounded-2xl overflow-hidden pb-20 shadow-md bg-white dark:bg-gray-800">
        <img
          className="shadow w-full h-full lg:h-80 object-cover rounded-t-2xl"
          src={thumbnail}
          alt={title}
        />
        <div className="px-10 lg:px-20">
          <h1 className="text-2xl lg:text-4xl font-semibold mt-10 text-center md:text-left dark:text-white/90">
            {title}
          </h1>
          <div className="pb-10 pt-4 flex flex-col md:flex-row items-center gap-5 justify-between dark:text-white/60">
            <div>
              <div>
                Posted by
                <Link to="/about" className="text-blue-700 hover:text-blue-800">
                  {" "}
                  {author}
                </Link>
              </div>
              <div className="flex gap-2 text-sm">
                <span>{publishDate}</span> •{" "}
                <span>{readingMinute} min read</span>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end">
              <div
                className="h-full flex mr-3 gap-2 items-center justify-center"
                title="Total Views"
              >
                <svg
                  fill="currentColor"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.8717 11.745C22.9896 9.46324 21.4582 7.48996 19.4668 6.06906C17.4754 4.64817 15.1113 3.84193 12.6667 3.75C10.2221 3.84193 7.85798 4.64817 5.86659 6.06906C3.8752 7.48996 2.34381 9.46324 1.46169 11.745C1.40211 11.9098 1.40211 12.0902 1.46169 12.255C2.34381 14.5368 3.8752 16.51 5.86659 17.9309C7.85798 19.3518 10.2221 20.1581 12.6667 20.25C15.1113 20.1581 17.4754 19.3518 19.4668 17.9309C21.4582 16.51 22.9896 14.5368 23.8717 12.255C23.9313 12.0902 23.9313 11.9098 23.8717 11.745ZM12.6667 18.75C8.69169 18.75 4.49169 15.8025 2.96919 12C4.49169 8.1975 8.69169 5.25 12.6667 5.25C16.6417 5.25 20.8417 8.1975 22.3642 12C20.8417 15.8025 16.6417 18.75 12.6667 18.75Z" />
                  <path d="M12.6667 7.5C11.7767 7.5 10.9066 7.76392 10.1666 8.25839C9.4266 8.75285 8.84982 9.45566 8.50923 10.2779C8.16864 11.1002 8.07952 12.005 8.25315 12.8779C8.42679 13.7508 8.85537 14.5526 9.48471 15.182C10.114 15.8113 10.9159 16.2399 11.7888 16.4135C12.6617 16.5872 13.5665 16.4981 14.3888 16.1575C15.211 15.8169 15.9138 15.2401 16.4083 14.5001C16.9028 13.76 17.1667 12.89 17.1667 12C17.1667 10.8065 16.6926 9.66193 15.8487 8.81802C15.0048 7.97411 13.8602 7.5 12.6667 7.5ZM12.6667 15C12.0733 15 11.4933 14.8241 11 14.4944C10.5066 14.1648 10.1221 13.6962 9.89505 13.148C9.66799 12.5999 9.60858 11.9967 9.72433 11.4147C9.84009 10.8328 10.1258 10.2982 10.5454 9.87868C10.9649 9.45912 11.4995 9.1734 12.0814 9.05764C12.6634 8.94189 13.2666 9.0013 13.8147 9.22836C14.3629 9.45542 14.8315 9.83994 15.1611 10.3333C15.4907 10.8266 15.6667 11.4067 15.6667 12C15.6667 12.7956 15.3506 13.5587 14.788 14.1213C14.2254 14.6839 13.4623 15 12.6667 15Z" />
                </svg>
                <div>{viewCount}</div>
              </div>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 hover:text-blue-600 hover:cursor-pointer"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=$'{title}'&summary=&source=`}
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[22px] h-[22px] hover:text-blue-600 hover:cursor-pointer"
                >
                  <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path>
                </svg>
              </a>
              <div
                onClick={() => {
                  // Copy the text inside the text field
                  navigator.clipboard.writeText(window.location.href);

                  // Toast
                  toast.success("Successfully copied the link!");
                }}
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="1.5"
                  className="w-[22px] h-[22px] hover:text-blue-600 hover:cursor-pointer"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M200.66 352H144a96 96 0 010-192h55.41m113.18 0H368a96 96 0 010 192h-56.66m-142.27-96h175.86"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: postBody }}
            className="dark:text-white/80"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
