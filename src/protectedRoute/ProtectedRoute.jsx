
// import { Navigate, useLocation } from "react-router-dom";
// import { useGetAdminQuery } from "../redux/Api/AdminApi";
// import { Skeleton } from "antd";

// const ProtectedRoute = ({children}) => {
//   const location = useLocation();
//   const accessToken = localStorage.getItem("accessToken"); // Check accessToken from storage

//   if (!accessToken) {
//     return <Navigate to={"/login"} state={{ from: location }} />;
//   }
//   const { data: getUserInfo, isLoading: adminLoading } = useGetAdminQuery();

//   if (isLoading || isFetching) {
//     return (
//       <div className="flex items-center justify-center">
//         <Skeleton active />
//       </div>
//     );
//   }

//   if (isError || !getUserInfo?.data?.length) {
//     return <Navigate to={"/login"} state={{ from: location }} />;
//   }

//   const admin = getUserInfo.data.find((users) => users.user.role === "superAdmin");

//     return <Navigate to={"/login"} state={{ from: location }} />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetAdminQuery } from "../redux/Api/AdminApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  const { data: getUserInfo, isError, isLoading, isFetching } = useGetAdminQuery();
  console.log(getUserInfo)

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton active />
      </div>
    );
  }

  if (isError || !getUserInfo?.data) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  const admin = getUserInfo?.data;

  if (!admin || admin.user.role !== "superAdmin") {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

