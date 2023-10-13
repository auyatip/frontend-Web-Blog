import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";
import { useState } from "react";

const Nav = () => {
  //Global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isLogin);

  //State
  const [value, setValue] = useState();
  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully..");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between p-4 px-6  rounded-full bg-gray-800">
      <div>
        <h3>Blog APP</h3>
      </div>
      <div className="bg-yellow-800 px-4 flex justify-center items-center rounded-xl py-1 hover:bg-yellow-900 duration-200">
        <Link to="/blogs">ALL Blogs</Link>
      </div>
      {isLogin ? (
        <div
          className="flex justify-between gap-4"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          <div className="bg-blue-800 flex justify-center items-center px-4 rounded-xl py-1 hover:bg-blue-900 duration-200">
            <Link to="/my-blogs">My Blogs</Link>
          </div>
          <div className="bg-green-800 flex justify-center items-center px-4 rounded-xl py-1 hover:bg-green-900 duration-200">
            <Link to="/create-blog">Creat New Blog </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="">
        {!isLogin ? (
          <div className="flex gap-2">
            <div className="bg-blue-800 px-4 rounded-xl py-1 hover:bg-blue-900 duration-200">
              <Link to="/login" className="cursor-pointer m-1">
                Login
              </Link>
            </div>
            <div className="bg-yellow-800 px-4 rounded-xl py-1 hover:bg-yellow-900 duration-200">
              <Link to="/register" className="cursor-pointer">
                Register
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
        {isLogin && (
          <button onClick={handleLogout} className="cursor-pointer m-1">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
