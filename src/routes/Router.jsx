import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";




import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";


import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";

import Login from "../Auth/Login";
import CategoryManagements from "../page/CreatorManagement/CategoryManagements.jsx";
import Videos from "../page/Subscription/Videos.jsx";
import Articles from "../page/Articles/Articles.jsx";
import VideDetailsPage from "../page/Subscription/VideDetailsPage.jsx";
import ArticleDetailsPage from "../page/Articles/ArticleDetailsPage.jsx";
import ContusctUs from "../page/Settings/ContusctUs.jsx";
import FeedBack from "../page/Settings/FeedBack.jsx";
import PartnerLaw from "../page/Settings/PartnerLaw/PartnerLaw.jsx";
import AboutUs from "../page/Settings/AboutUs.jsx";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/CategoryManagements",
        element: <CategoryManagements></CategoryManagements>
      },
     
      {
        path: "/dashboard/articles",
        element: <Articles></Articles>
      },
      {
        path: "/dashboard/articles/articlesDetails/:id",
        element: <ArticleDetailsPage></ArticleDetailsPage>
      },
     
      {
        path: "/dashboard/videos",
        element: <Videos></Videos>
      },
      {
        path: "/dashboard/videos/videodetails/:id",
        element: <VideDetailsPage></VideDetailsPage>
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/contact",
        element:<ContusctUs></ContusctUs>
      },
      {
        path: "/dashboard/Settings/feedback",
        element: <FeedBack></FeedBack>
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/dashboard/Settings/partnerLawFirms",
        element: <PartnerLaw></PartnerLaw>
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
