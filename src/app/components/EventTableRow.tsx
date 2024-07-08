import React from "react";
import { Event } from "./EventTable";

interface EventTableRowProps {
  event: Event;
  onRowClick: (event: Event) => void;
}

const EventTableRow: React.FC<EventTableRowProps> = ({ event, onRowClick }) => {
  return <></>;
};

export default EventTableRow;
