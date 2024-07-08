import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { Filters, Event } from "./EventTable";
import EventDetailsModal from "./EventDetailsModal";

const fetcher: Fetcher<
  { events: Event[]; totalEvents: number },
  string
> = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

interface FilterDropdownProps {
  page: number;
  search: String;
  filters: Filters;
  setSelectedEvent: Dispatch<SetStateAction<Event | null>>;
  setTotalEvents: Dispatch<SetStateAction<number>>;
  selectedEvent: Event | null;
}

const EventTablePage: React.FC<FilterDropdownProps> = ({
  page,
  search,
  filters,
  setSelectedEvent,
  selectedEvent,
  setTotalEvents,
}) => {
  const { data, error } = useSWR(
    `/api/events?page=${page}&search=${search}&actor_id=${filters.actor_ids.join(
      ","
    )}&target_id=${filters.target_ids.join(
      ","
    )}&action_id=${filters.action_ids.join(",")}`,
    fetcher
  );

  if (error) return <div>Failed to load events</div>;
  if (!data)
    return <div className="text-center  whitespace-nowrap">Loading...</div>;

  setTotalEvents(data.totalEvents);
  console.log(selectedEvent);
  return (
    <>
      {data.events.map((event: Event) => (
        <>
          <div
            key={event.id}
            className="grid grid-cols-3 justify-start bg-white  w-full p-4  shadow-md border-b border-zinc-100 cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="text-gray-900">{event.actor.actor_name}</div>
            <div className="text-gray-900">{event.action.name}</div>
            <div className="text-gray-900">
              {new Date(event.occurred_at).toLocaleString()}
            </div>
          </div>
          {selectedEvent && selectedEvent.id === event.id && (
            <EventDetailsModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </>
      ))}
    </>
  );
};

export default EventTablePage;
