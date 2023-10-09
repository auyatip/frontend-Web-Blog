import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  //FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogs = await axios.post(
        "https://backend-web-blog.onrender.com/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (blogs) {
        alert("Create Blog Successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="title"
          required
        />
        {/* ////////////////////// */}
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="title"
        >
          description
        </label>
        <textarea
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
          onChange={(e) => setInputs({ ...inputs, image: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="text"
          placeholder="image"
        />
        <button type="submit" className="m-4 bg-cyan-300 text-green-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
