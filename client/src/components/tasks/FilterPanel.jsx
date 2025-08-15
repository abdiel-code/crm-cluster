import FilterChart from "./FilterChart.jsx";

const FilterPanel = ({ availableFilters, filters, handleAddFilter }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-4 mb-4 w-full">
      {availableFilters.map((filter) => {
        const isActive =
          filters.status === filter ||
          filters.priority === filter ||
          filters.due_date === filter;

        return (
          <FilterChart
            key={filter}
            filter={filter}
            handleAddFilter={handleAddFilter(filter)}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default FilterPanel;
