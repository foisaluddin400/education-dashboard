import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useRef, useState } from "react";
import { Drawer, Radio, Space } from "antd";

import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";

import { FaChevronRight } from "react-icons/fa";

import { IoIosLogIn } from "react-icons/io";
import { useGetAdminQuery } from "../../redux/Api/AdminApi";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: user,
    link: "/dashboard/UserManagement",
  },
  {
    key: "CategoryManagements",
    label: "Category Management",
    icon: create,
    link: "/dashboard/CategoryManagements",
  },

  {
    key: "videos",
    label: "videos",
    icon: subscription,
    link: "/dashboard/videos",
  },
  {
    key: "articles",
    label: "Articles",
    icon: subscription,
    link: "/dashboard/articles",
  },
  {
    key: "profile",
    label: "Settings",
    icon: settings,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "about",
        label: "About Us",
        link: "/dashboard/Settings/aboutUs",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
      
      {
        key: "feedback",
        label: "Feedback",
        link: "/dashboard/Settings/feedback",
      },
      {
        key: "Partner",
        label: "Partner Law Firms",
        link: "/dashboard/Settings/partnerLawFirms",
      },
    ],
  },
];

const Header = () => {
  const { data: adminData, isLoading: adminLoading } = useGetAdminQuery();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();

  const contentRef = useRef({});



  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const onClick = (key) => {
    setSelectedKey(key);
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const admin = adminData?.data;
  return (
    <div className="bg-[#2F799E] text-white pt-5">
      <div className="flex justify-between">
        <div className="lg:hidden ">
          <div className="py-3 pl-4">
            <div onClick={showDrawer} className="text-3xl ">
              <FaBars />
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-8 p-1 px-6">
          <div className="relative">
            <Link to={"/dashboard/Settings/notification"}>
              <div className="w-[45px] h-[45px] flex items-center justify-center text-xl rounded-full bg-white text-black ">
                <span>
                  <LuBell />
                </span>
              </div>
            </Link>

            <Space>
              <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            </Space>
            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
            >
              <div className="bg-black h-screen -m-6">
                <div className="custom-sidebar-logo flex justify-center ">
                  <img src={logo} alt="Logo" className="w-[160px]" />
                </div>

                <div className="menu-items">
                  {items.map((item) => (
                    <div key={item.key}>
                      <Link
                        to={item.link}
                        className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                          selectedKey === item.key
                            ? "bg-[#6EC5E9] text-white rounded border-l-4 border-black "
                            : "bg-white rounded hover:bg-gray-200"
                        }`}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault(); // Prevent navigation if it has children
                            onParentClick(item.key); // Toggle expanded state
                          } else {
                            setSelectedKey(item.key);
                            onClose();  
                          }
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5 mr-3"
                        />
                        <span className="block w-full text-black">
                          {item.label}
                        </span>

                        {item.children && (
                          <FaChevronRight
                            className={`ml-auto transform transition-all duration-300 ${
                              expandedKeys.includes(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {item.children && (
                        <div
                          className={`overflow-hidden bg-white -my-2 mx-5 mb-4  transition-all duration-300 ${
                            expandedKeys.includes(item.key) ? "expanded" : ""
                          }`}
                          style={{
                            maxHeight: expandedKeys.includes(item.key)
                              ? `${
                                  contentRef.current[item.key]?.scrollHeight
                                }px`
                              : "0",
                          }}
                          ref={(el) => (contentRef.current[item.key] = el)}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              to={child.link}
                              className={`menu-item p-4 flex items-center cursor-pointer ${
                                selectedKey === child.key
                                  ? "bg-[#6EC5E9] text-white"
                                  : "hover:bg-gray-200"
                              }`}
                              onClick={() => {
                                onClick(child.key)
                                setExpandedKeys([]);
                                onClose(); 
                              
                              }}
                            >
                              <span className="block w-full ">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer (Log Out) */}
                <div className="custom-sidebar-footer absolute bottom-0 w-full p-4 ">
                  <button
                    onClick={handleLogout}
                    className="w-full flex bg-white text-start rounded text-black p-3"
                  >
                    <span className="text-2xl">
                      <IoIosLogIn />
                    </span>
                    <span className="ml-3">Log Out</span>
                  </button>
                </div>
              </div>
            </Drawer>

            <span className="absolute top-0 right-0 -mr-2  w-5 h-5 bg-white text-black text-xs flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <Link to={"/dashboard/Settings/profile"}>
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[45px] h-[45px]"
                  src={profilee}
                  alt="profile"
                />
              </div>
              <div className="text-end">
                <h3><p className="text-[#ffffff] text-[20px] leading-[32px] font-semibold">
              {admin?.name || "A"}
            </p></h3>
                <h4 className="text-sm">Admin</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
