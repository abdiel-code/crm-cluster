const AddTeamButton = ({ toggleCreateTeamModal }) => {
  return (
    <button
      onClick={toggleCreateTeamModal}
      className="cursor-pointer flex items-center justify-center w-[50px] 
      h-[50px] rounded-full bg-[#495867] hover:bg-[#577399] text-white shadow-lg z-40
      "
    >
      <span className="absolute w-1 h-6 bg-white rounded-full "></span>
      <span className="absolute h-1 w-6 bg-white rounded-full"></span>
    </button>
  );
};

export default AddTeamButton;
