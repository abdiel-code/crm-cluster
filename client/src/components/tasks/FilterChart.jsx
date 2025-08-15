const FilterChart = ({ filter, handleAddFilter, isActive }) => {
  return (
    <button
      onClick={handleAddFilter}
      className={`flex items-center justify-center cursor-pointer py-2 px-3 rounded-xl 
        ${isActive ? 'bg-[#577399] text-white' : 'border border-[#577399] hover:bg-[#577399] text-black'}`}
    >
      {filter}
    </button>
  );
};
export default FilterChart
