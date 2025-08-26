import { motion } from "framer-motion";
import { FaRegTimesCircle } from "react-icons/fa";

const NotificationModal = ({
  requests,
  toggleNotificationModal,
  handleSentRequest,
}) => {
  const handleClick = (teamId, userId, resolution) => {
    console.log("handleClick", teamId, userId, resolution);
    handleSentRequest(teamId, userId, resolution);
  };

  console.log("requests from notification modal", requests);

  return (
    <div className="border-2 border-[#495867] p-2 w-[80%] h-[80%] bg-white rounded-2xl shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center gap-4">
      <button
        className="absolute right-30 cursor-pointer"
        onClick={toggleNotificationModal}
        type="button"
      >
        <FaRegTimesCircle size={30} color="#F7B1AB" />
      </button>
      <h1 className="text-2xl text-center">Notifications</h1>
      <div className="h-[1px] w-[80%] bg-[#495867]"></div>
      <h1 className="text-2xl text-center">Requests</h1>
      <div className="flex flex-col gap-2 overflow-auto h-full w-full">
        {requests.length > 0 && (
          <div className="flex flex-col gap-4 w-full items-center">
            {requests.map(({ teamName, requests: teamRequests }) => (
              <div
                key={teamName}
                className="flex flex-col gap-2 w-full items-center"
              >
                <h2 className="text-xl font-semibold text-center">
                  {teamName}
                </h2>
                {teamRequests.map((req, index) => (
                  <motion.div
                    key={req.id}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="border-2 border-[#495867] px-4 py-2 w-[90%] bg-white rounded-xl shadow-md flex items-center justify-between"
                  >
                    <div className="flex gap-6 items-center">
                      <span className="font-medium">{teamName}</span>
                      <span>User ID: {req.user_id}</span>
                      <span className="text-sm text-[#495867]">
                        {new Date(req.joined_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-[#495867] text-white py-1 px-3 rounded-md cursor-pointer hover:bg-[#577399] hover:scale-110 transition-transform duration-300 ease-in-out"
                        onClick={() =>
                          handleClick(req.team_id, req.user_id, "accept")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-[#F7B1AB] text-white py-1 px-3 rounded-md cursor-pointer hover:bg-[#FF847E] hover:scale-110 transition-transform duration-300 ease-in-out"
                        onClick={() =>
                          handleClick(req.team_id, req.user_id, "reject")
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
