import formatDate from "../../hooks/global/formatDate.js";
import { FaChevronDown } from "react-icons/fa";

const MyTeamsChart = ({
  team,
  toggleDeleteModal,
  handleFetchMembers,
  toggleUpdateModal,
}) => {
  const { id, name, description, created_at } = team;

  const formattedDate = formatDate(created_at);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2">
        <div className=" w-[4px] h-[100%] bg-[#577399] rounded-2xl"></div>
        <h1 className="font-medium text-xl">{name}</h1>
        <h1 className="text-xl">{description}</h1>
        <h1 className="text-xl text-gray-600">{formattedDate}</h1>
        <button
          type="button"
          className="bg-[#F7B1AB] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF847E]"
          onClick={() => toggleDeleteModal(id)}
        >
          <div className="w-[80%] h-1 bg-white rounded-full"></div>
        </button>
        <button
          type="button"
          className="text-[#577399] hover:text-[#495867] cursor-pointer"
          onClick={() => toggleUpdateModal(id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="text-[#495867] hover:text-[#577399] cursor-pointer"
          onClick={() => handleFetchMembers(id)}
        >
          <FaChevronDown size={25} />
        </button>
      </div>
    </div>
  );
};

export default MyTeamsChart;
