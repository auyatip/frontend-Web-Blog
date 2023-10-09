import axios from "axios";
import { useEffect, useState } from "react";
import BlogsCard from "../components/BlogsCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //GET USER BLOGS
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      //   console.log(id);
      const res = await axios.get(
        `https://backend-web-blog.onrender.com/api/v1/blog/user-blog/${id}`
      );
      console.log(res.data.userBlog.blogs);
      setBlogs(res.data.userBlog.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      <h1>USERBLOG</h1>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <BlogsCard
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            time={blog.createdAt}
            editTime={blog.updatedAt}
          />
        ))
      ) : (
        <h1>You do not have any Blog</h1>
      )}
    </div>
  );
};

export default UserBlog;
