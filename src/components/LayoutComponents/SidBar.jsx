import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import login from "../../assets/auth/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa"; 
import { IoIosLogIn } from "react-icons/io";

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

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    const parentItem = items.find(
      (item) =>
        item.link === currentPath ||
        (item.children &&
          item.children.some((child) => child.link === currentPath))
    );

    if (parentItem) {
      setSelectedKey(
        parentItem.children
          ? parentItem.children.find((child) => child.link === currentPath)
              ?.key || parentItem.key
          : parentItem.key
      );

      if (parentItem.children && !expandedKeys.includes(parentItem.key)) {
        setExpandedKeys([...expandedKeys, parentItem.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  // Logout Function
  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
   
    localStorage.removeItem('email')
        navigate("/login");
  }
  return (
    <div className=" custom-sidebar fixed h-full w-80 bg-[#2F799E] ">
      <div className="">
      {/* Logo */}
      <div className="custom-sidebar-logo flex justify-center py-3">
        <img src={login} alt="Logo" className="w-[90px]" />
      </div>

      {/* Sidebar Menu */}
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.key}>
            
            <Link
              to={item.link}
              className={`menu-item my-4 mx-5 py-[9px] px-3 flex items-center cursor-pointer ${
                selectedKey === item.key
                  ? "bg-[#6EC5E9] text-white rounded border-l-4 border-black "
                  : "bg-white rounded hover:bg-gray-200"
              }`}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault(); 
                  onParentClick(item.key); 
                } else {
                  setSelectedKey(item.key);
                }
              }}
            >
              <div></div>
              <img src={item.icon} alt={item.label} className="w-5 h-5 mr-3" />
              <span className="block w-full ">{item.label}</span>

           
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
                    ? `${contentRef.current[item.key]?.scrollHeight}px`
                    : "0",
                }}
                ref={(el) => (contentRef.current[item.key] = el)}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.key}
                    to={child.link}
                    className={`menu-item p-3 flex items-center cursor-pointer ${
                      selectedKey === child.key
                        ? "bg-[#6EC5E9] text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedKey(child.key); 
                      setExpandedKeys([]); 
                    }}
                  >
                    <span className="block w-full ">{child.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>


      <div className="custom-sidebar-footer absolute  w-full p-4">
        <button
           onClick={handleLogOut}
          className="w-full flex bg-white text-start rounded text-black p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default SidBar;
