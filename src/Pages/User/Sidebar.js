import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import profile from "../../Assets/Images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faLongArrowAltRight,
  faListAlt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getLoggedoutUser } from "../../Redux/slices/user";
import Swal from "sweetalert2";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  // i want to get path name
  const location = useLocation();
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profile);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    dispatch(getLoggedoutUser());
    Swal.fire({
      position: "bottom-end",
      title: "Logged Out Successfully",
      timer: 1000,
      showConfirmButton: false,
      customClass: {
        title: "custom-swal-title",
      },
      width: "270px",
      height: "5px",
    });
  };
  // for profile photo
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setProfilePhoto(e.target.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profilePhoto", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile photo uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading profile photo:", error);
      });
  };

  const handlLogout = () => {
    dispatch(getLoggedoutUser());
    Swal.fire({
      icon: "success",
      title: "Logged Out Successfully",
    });
    navigate("/");
  };

  return (
    <>
      <div className="user-sidebar">
        <div className="userImg">
          <label htmlFor="imgLabel" className="inputLabel">
            <img className="inputLabel" src={profilePhoto} alt="labelImg" />
          </label>
          <input
            id="imgLabel"
            className="inputImg"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <ul>
          <Link to="/user" style={{ color: "white" }}>
            <li
              className={`option ${
                location.pathname === "/user" ? "active" : ""
              }`}
            >
              <span>
                {" "}
                <FontAwesomeIcon icon={faUser} />{" "}
              </span>
              Profile
            </li>
          </Link>

          <Link to="/user/password" style={{ color: "white" }}>
            <li
              className={`option ${
                location.pathname === "/user/password" ? "active" : ""
              }`}
            >
              <span>
                <FontAwesomeIcon icon={faListAlt} />
              </span>
              Passwords
            </li>
          </Link>

          <Link to="/user/address" style={{ color: "white" }}>
            <li
              className={`option ${
                location.pathname === "/user/address" ? "active" : ""
              }`}
            >
              <span>
                <FontAwesomeIcon icon={faAddressBook} />
              </span>
              Address Book
            </li>
          </Link>

          <Link to="/user/orders" style={{ color: "white" }}>
            <li
              className={`option ${
                location.pathname === "/user/orders" ? "active" : ""
              }`}
            >
              <span>
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              My Orders
            </li>
          </Link>

          <div onClick={handlLogout} style={{ color: "white" }}>
            <li className="option">
              <span>
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </span>
              Logout
            </li>
          </div>
        </ul>
      </div>

      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="userImg">
              <label htmlFor="imgLabel" className="inputLabel">
                <img className="inputLabel" src={profilePhoto} alt="labelImg" />
              </label>
              <input
                id="imgLabel"
                className="inputImg"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <FontAwesomeIcon icon={faLongArrowAltRight} />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
