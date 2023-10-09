import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogsCard = ({
  id,
  isUser,
  title,
  description,
  image,
  username,
  time,
}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async () => {
    try {
      const isDelete = confirm("Want to Delete");
      if (isDelete) {
        const data = await axios.delete(
          `https://backend-web-blog.onrender.com/api/v1/blog/delete-blog/${id}`
        );
        console.log(data);
        alert("Blog Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(isUser);

  return (
    <div className="flex flex-col items-center">
      {isUser && (
        <div className="flex gap-4 mt-4">
          <button onClick={handleEdit} className="bg-yellow-500 w-3/8">
            EDIT
          </button>
          <button onClick={handleDelete} className="bg-red-500 w-3/8">
            DELETE
          </button>
        </div>
      )}
      <div className="max-w-sm w-full lg:max-w-full lg:flex lg:justify-center">
        <div className="h-48 lg:h-auto bg-gray-200 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <img src={image} alt={image} />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              {username}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={image}
              alt={image}
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{username}</p>
              <p className="text-gray-600">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
