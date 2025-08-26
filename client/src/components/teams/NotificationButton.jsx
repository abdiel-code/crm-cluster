import { FaBell } from "react-icons/fa";

const NotificationButton = ({ toggleNotificationModal, requests }) => {
  return (
    <button className="cursor-pointer" onClick={toggleNotificationModal}>
      <FaBell size={30} color="#F7B1AB" />
      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
        {requests.length}
      </span>
    </button>
  );
};

export default NotificationButton;
