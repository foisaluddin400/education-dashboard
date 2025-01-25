import article from "../../assets/userdashboard/totalArticles.png";
import totalUser from "../../assets/userdashboard/totalUser.png";
import totalVideo from "../../assets/userdashboard/totalVideo.png";
import dash from "../../assets/routerImg/dash.png";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetTotalArticleQuery } from "../../redux/Api/articleApi";
import { useGetChartQuery } from "../../redux/Api/dashboardApi";
import { useState } from "react";
import { useGetUserManageQuery } from "../../redux/Api/UserManagementApi";
import { Space, Table } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetshortVideosQuery } from "../../redux/Api/videoApi";
import { imageUrl } from "../../redux/Api/baseApi";
const Dashboard = () => {
  const { data: totalArticle } = useGetTotalArticleQuery();
  const [selectedYear, setSelectedYear] = useState("2024");
const {data: chartData} = useGetChartQuery(selectedYear);
console.log(chartData)

const [sort, setSort] = useState("-totalView");
const { data: videoData } = useGetshortVideosQuery({sort});
  const videos = videoData?.data?.result || [];
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const topPodcasts = [
    { id: 1, eventName: "Classics Music", total: 84, image: dash },
    { id: 2, eventName: "Modern Beats", total: 67, image: dash },
    { id: 3, eventName: "Jazz Vibes", total: 52, image: dash },
    { id: 4, eventName: "Pop Hits", total: 45, image: dash },
    { id: 5, eventName: "Rock Anthems", total: 40, image: dash },
    { id: 6, eventName: "Chill Lo-Fi", total: 37, image: dash },
    { id: 7, eventName: "Classical Melodies", total: 35, image: dash },
    { id: 8, eventName: "Hip-Hop Essentials", total: 30, image: dash },
  ];

    // Transform data for Rechart
    const transformedData =
    chartData?.data?.map((item) => ({
      month: item.month,
      value: item.totalUser,
    })) || [];

  const totalStats = {
    totalUser: chartData?.data?.reduce((acc, item) => acc + item.totalUser, 0),
    totalVideo: 120, 
    totalArticle: 50, 
  };

  const dataa = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 100 },
    { name: "May", value: 60 },
    { name: "Jun", value: 80 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 40 },
  ];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value); // Update the selected year
  };

  const { data, isLoading, error } = useGetUserManageQuery();
  const userData = data?.data?.result
  .slice(0, 3) // Take the first 5 users
  .map((user, index) => ({
    key: user._id,
    sl: index + 1,
    userId: user.user?._id,
    userName: user.username,
    dateOfBirth: user.dateOfBirth || "N/A",
    contactNumber: user.phone || "N/A",
    email: user.email || "N/A",
    status: user.user?.status || "N/A", // blocked or in-progress
  }));

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "User's Name",
      dataIndex: "userName",
      width: 150,
      render: (text) => (
        <Space>
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            style={{ borderRadius: "50%", width: 32, height: 32 }}
          />
          {text}
        </Space>
      ),
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    
  ];

  return (
    <div className=" min-h-screen ">
      <div className="">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                  <h3 className="text-[#2F799E] text-xl font-semibold">
                    Total User
                  </h3>
                  <div className="flex justify-center my-2">
                    <div className="bg-[#2F799E] p-2  rounded-full">
                      <img className="" src={totalUser} alt="" />
                    </div>
                  </div>
                  <p className="text-2xl ">{totalArticle?.data?.totalUser}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                  <h3 className="text-[#2F799E] text-xl font-semibold">
                    Total Video's
                  </h3>
                  <div className="flex justify-center my-2">
                    <div className="bg-[#2F799E] p-2  rounded-full">
                      <img className="" src={totalVideo} alt="" />
                    </div>
                  </div>
                  <p className="text-2xl ">{totalArticle?.data?.totalVideo}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                  <h3 className="text-[#2F799E] text-xl font-semibold">
                    Total Articles
                  </h3>
                  <div className="flex justify-center my-2">
                    <div className="bg-[#2F799E] p-2  rounded-full">
                      <img className="" src={article} alt="" />
                    </div>
                  </div>
                  <p className="text-2xl ">
                    {totalArticle?.data?.totalArticle}
                  </p>
                </div>
              </div>
            </div>
            {/* ---------------Chart ----------------*/}
            <div className="bg-white rounded mt-4">
              <div className="items-center mb-4">
                <h3 className="text-gray-700 font-bold pt-3 pl-7">User Growth</h3>
                <div className="flex justify-end">
                  <select
                    className="text-[#2F799E] rounded p-2 px-4 bg-[#00000000] mr-11"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="95%" height={300}>
                <AreaChart
                  data={transformedData}
                  margin={{
                    top: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2F799E"
                    fill="#2F799E"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="col-span-1">
            <div className="bg-white h-[533px] overflow-scroll p-4 rounded shadow ">
              <h3 className="text-gray-700 font-bold mb-4">Top - Video's</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-[#2F799E]">
                      <th className="px-4 py-2 text-left">SL no.</th>
                      <th className="px-4 py-2">Video</th>
                      <th className="px-4 py-2 text-left">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.slice(0,7).map((video, index) => (
                      <tr key={video._id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <Link to={`/dashboard/videos/videodetails/${video._id}`}><td className="px-4 py-2 flex gap-2">
                          <img className="w-[50px] h-[50px] rounded-lg" src={`${imageUrl}/${video.thumbnail_image}`} alt={video.title} />
                          <span className="mt-2">{video.title}</span>
                        </td> </Link>
                        <td className="px-4 py-2">{video.totalView} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        

        <div className="bg-white   mt-4 p-4 rounded shadow mb-6">
          <div className="flex justify-between">
          <h3 className="text-gray-700 font-bold mb-4">Recent User</h3>
          <Link to={'/dashboard/UserManagement'}><button className="flex gap-2 text-[#2F799E]">See All  <FaArrowRight className="mt-1"/></button></Link>
          </div>
          <Table
          columns={columns}
          dataSource={userData}
          pagination={false}
        />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
