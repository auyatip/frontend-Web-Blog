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
    <div className="flex justify-between p-4 border">
      <div>
        <h3>Blog APP</h3>
      </div>

      {isLogin ? (
        <div
          className="flex justify-between gap-4"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          <Link to="/blogs">Blogs </Link>
          <Link to="/my-blogs">My Blogs </Link>
          <Link to="/create-blog">CreatYourBlog </Link>
        </div>
      ) : (
        ""
      )}

      <div className="">
        {!isLogin ? (
          <>
            <Link to="/login" className="cursor-pointer m-1">
              Login
            </Link>
            <Link to="/register" className="cursor-pointer">
              Register
            </Link>
          </>
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
