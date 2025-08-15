import { useState } from "react";

const useTaskFilters = () => {

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    due_date: ""
  });

  const getFilterCategory = (filter) => {
    if (["pending", "in_progress", "completed", "cancelled"].includes(filter)) {
      return "status";
    }
    if (["low", "medium", "high", "urgent"].includes(filter)) {
      return "priority";
    }
    return null;
  }

  const handleAddFilter = (filter) => {

    return () => {
      const category = getFilterCategory(filter);
      if (!category) return;
      setFilters((prevFilters) => ({

        ...prevFilters,
        [category]: prevFilters[category] === filter ? "" : filter
      }));
    }

  };

  return {
    filters,
    handleAddFilter
  };

};

export default useTaskFilters
