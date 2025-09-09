import FilterChart from "./FilterChart.jsx";

const FilterPanel = ({
  filterType,
  availableFilters,
  filters,
  handleAddFilter,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2 text-center">{filterType}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4 mb-4 w-full">
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
    </div>
  );
};

export default FilterPanel;
