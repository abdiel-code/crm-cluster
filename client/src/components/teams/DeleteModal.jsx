import { log } from "../../core/logWrapper";

const DeleteModal = ({
  id,
  userId,
  toggleDeleteModal,
  handleDeleteFunction,
  message,
  refreshTeams,
}) => {
  log("teamId", id);
  const handleClick = async () => {
    try {
      if (!userId) {
        await handleDeleteFunction(id);
      } else {
        await handleDeleteFunction(id, userId);
      }

      refreshTeams();
      toggleDeleteModal();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-[4px_4px_4px_rgba(0,0,0,0.20)] p-6 flex flex-col items-center space-y-6">
      <h1 className="text-lg font-semibold text-gray-800 text-center">
        {message || "Are you sure you want to delete?"}
      </h1>
      <div className="flex space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-[#F7B1AB] text-white rounded-md hover:bg-[#FF847E] transition-colors cursor-pointer"
          onClick={handleClick}
        >
          Yes
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-[#577399] text-white rounded-md hover:bg-[#495867] transition-colors cursor-pointer"
          onClick={toggleDeleteModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
