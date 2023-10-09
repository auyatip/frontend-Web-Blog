import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  //getBlog
  const getBlogDetail = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/v1/blog/get-blog/${id}`
      );
      if (data) {
        // console.log(data.data.blog.title);
        setBlog(data.data.blog);
        setInputs({
          title: data.data.blog.title,
          description: data.data.blog.description,
          image: data.data.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //เรียักใช้ Function
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // EDIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogs = await axios.put(
        `https://backend-web-blog.onrender.com/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (blogs) {
        alert("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} action="" className="w-1/2">
        {/* ////////////////////// */}
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="title"
        >
          title
        </label>
        <input
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="title"
        />
        {/* ////////////////////// */}
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="title"
        >
          description
        </label>
        <textarea
          value={inputs.description}
          onChange={(e) =>
            setInputs({ ...inputs, description: e.target.value })
          }
          className="resize-none w-full h-[150px] text-black rounded-md"
          id="description"
          required
        ></textarea>
        {/* ////////////////////// */}
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Image
        </label>
        <input
          value={inputs.image}
          onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="text"
          placeholder="image"
        />
        <button type="submit" className="m-4 bg-cyan-300 text-yellow-600">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default BlogDetail;
