import React, { useState } from "react";
import { Filters } from "./EventTable";

interface FilterDropdownProps {
  filters: {
    actor_ids: string[];
    target_ids: string[];
    action_ids: string[];
  };
  selectedFilters: {
    actor_ids: string[];
    target_ids: string[];
    action_ids: string[];
  };
  handleFilterChange: (filterType: keyof Filters, value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  selectedFilters,
  handleFilterChange,
}) => {
  const [filterSearch, setFilterSearch] = useState("");

  const filteredActors = filters.actor_ids.filter((id) =>
    id.includes(filterSearch)
  );
  const filteredTargets = filters.target_ids.filter((id) =>
    id.includes(filterSearch)
  );
  const filteredActions = filters.action_ids.filter((id) =>
    id.includes(filterSearch)
  );

  return (
    <div className="mb-4 space-y-4">
      <input
        type="text"
        placeholder="Search filters"
        value={filterSearch}
        onChange={(e) => setFilterSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Actor IDs</h3>
          {filteredActors.map((id) => (
            <label key={id} className="block">
              <input
                type="checkbox"
                checked={selectedFilters.actor_ids.includes(id)}
                onChange={() => handleFilterChange("actor_ids", id)}
                className="mr-2"
              />
              {id}
            </label>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">Target IDs</h3>
          {filteredTargets.map((id) => (
            <label key={id} className="block">
              <input
                type="checkbox"
                checked={selectedFilters.target_ids.includes(id)}
                onChange={() => handleFilterChange("target_ids", id)}
                className="mr-2"
              />
              {id}
            </label>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">Action IDs</h3>
          {filteredActions.map((id) => (
            <label key={id} className="block">
              <input
                type="checkbox"
                checked={selectedFilters.action_ids.includes(id)}
                onChange={() => handleFilterChange("action_ids", id)}
                className="mr-2"
              />
              {id}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
