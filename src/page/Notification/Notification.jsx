import { FaArrowLeft } from "react-icons/fa";
import notification from "../../assets/routerImg/notification.png";

const notifications = [
  {
    id: 1,
    title: "News Reminder",
    time: "1 hour ago",
    img: notification,
  },
  {
    id: 2,
    title: "System Update",
    time: "2 hours ago",
    img: notification,
  },
  {
    id: 3,
    title: "Meeting Alert",
    time: "3 hours ago",
    img: notification,
  },
];

const Notification = () => {
  return (
    <div className="mt-4">
      <h1 className="flex gap-4">
        <span className="text-[#004466] mt-[7px]">
          <FaArrowLeft />
        </span>
        <span className="text-lg font-semibold">Notification</span>
      </h1>
      <div className="mt-11">
        {notifications.map((notification) => (
          <div className="border-b py-6 ml-5 flex justify-between" key={notification.id}>
            <div className="flex gap-11 ">
              <div>
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={notification.img}
                  alt={notification.title}
                />
              </div>
              <div className="flex items-center">
                <div>
                  <h3>{notification.title}</h3>
                  <p className="text-[#595959]">{notification.time}</p>
                </div>
              </div>
            </div>
            <div>
              <h1>{notification.time}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
