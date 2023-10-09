import axios from "axios";
import { useEffect, useState } from "react";
import BlogsCard from "../components/BlogsCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const res = await axios.get(
        "https://backend-web-blog.onrender.com/api/v1/blog/all-blog"
      );
      if (res) {
        setBlogs(res.data.blogs); //.blogs สามารถไปดูได้ใน Crontroller
        console.log(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // console.log(blogs);
  // console.log(localStorage.getItem("userId"));
  return (
    <div className="flex flex-col gap-2 m-4">
      {blogs &&
        blogs.map((blog, index) => (
          <BlogsCard
            key={index} // ต้องใส่ key เพื่อระบุความแตกต่างของแต่ละบล็อก (จะต้องใช้ key เมื่อแมปใน React)
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
      {/* <BlogsCard /> */}
    </div>
  );
};

export default Blogs;
