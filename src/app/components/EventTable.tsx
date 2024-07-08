import React, { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { event, member, action } from "@prisma/client";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import EventTablePage from "./EventTablePage";
import { ExportCSV } from "./ExportCSV";

export interface Event extends event {
  actor: member;
  action: action;
}

export interface Filters {
  actor_ids: string[];
  target_ids: string[];
  action_ids: string[];
}

const filtersFetcher: Fetcher<Filters, string> = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const EventTable = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    actor_ids: [] as string[],
    target_ids: [] as string[],
    action_ids: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    actor_ids: [] as string[],
    target_ids: [] as string[],
    action_ids: [] as string[],
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [totalEvents, setTotalEvents] = useState(0);

  const { data: filterData } = useSWR("/api/events/filters", filtersFetcher);
  const [cnt, setCnt] = useState(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(
      <EventTablePage
        key={i}
        page={i + 1}
        filters={selectedFilters}
        search={search}
        setTotalEvents={setTotalEvents}
      />
    );
  }

  useEffect(() => {
    if (filterData) {
      setFilters({
        actor_ids: filterData.actor_ids,
        target_ids: filterData.target_ids,
        action_ids: filterData.action_ids,
      });
    }
  }, [filterData]);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (id) => id !== value
        );
      } else {
        newFilters[filterType].push(value);
      }
      return newFilters;
    });
    setCnt(1); // Reset page count on filter change
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-4xl border-collapse rounded-lg overflow-hidden shadow-lg bg-zinc-100">
      <div className="flex min-h-12 min-w-full drop-shadow-sm">
        <SearchBar search={search} setSearch={setSearch} />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="border p-2 rounded bg-zinc-100 h-full mb-4"
        >
          Filters
        </button>
        <ExportCSV selectedFilters={selectedFilters} />
      </div>
      {showFilters && (
        <FilterDropdown
          filters={filters}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />
      )}
      <div className="grid grid-cols-3 justify-start  w-full p-4 rounded-lg shadow-md border-b border-zinc-100">
        <div className="px-6 py-4 text-left font-medium text-gray-900">
          Actor
        </div>
        <div className="px-6 py-4 text-left font-medium text-gray-900">
          Action
        </div>
        <div className="px-6 py-4 text-left font-medium text-gray-900">
          Date
        </div>
      </div>
      <div className="w-full">
        {pages.length ? pages : <div>Loading...</div>}
      </div>
      {totalEvents > cnt * 5 && (
        <button onClick={() => setCnt(cnt + 1)} className="min-w-full min-h-14">
          Load More
        </button>
      )}
    </div>
  );
};

export default EventTable;
