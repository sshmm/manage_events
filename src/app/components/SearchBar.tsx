import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by Actor Name, Action Name, or Target Name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full min-h-full mb-4 bg-zinc-100"
    />
  );
};

export default SearchBar;
