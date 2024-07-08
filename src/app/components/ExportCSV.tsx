import React from "react";
import { Event } from "./EventTable";

interface ExportCSVProps {
  selectedFilters: {
    actor_ids: string[];
    target_ids: string[];
    action_ids: string[];
  };
}

export const ExportCSV: React.FC<ExportCSVProps> = ({ selectedFilters }) => {
  const exportCSV = async () => {
    const res = await fetch(
      `/api/events?actor_ids=${selectedFilters.actor_ids.join(
        ","
      )}&target_ids=${selectedFilters.target_ids.join(
        ","
      )}&action_ids=${selectedFilters.action_ids.join(",")}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    res.json().then((res: { events: Event[] }) => {
      const flatEvents = res.events.map((event) => {
        const { actor, action, ...flatEvent } = {
          ...event,
          actor_name: event.actor.actor_name,
          occurred_at: new Date(event.occurred_at).toISOString(),
          metadata: JSON.stringify(event.metadata),
          action_name: event.action_id ? event.action.name : "",
          action_id: event.action_id ?? "",
          group: event.actor.group,
          location: event.location ?? "",
        };
        return flatEvent;
      });

      let csvText = `${Object.keys(flatEvents[0]).join(",")}\r\n`;
      flatEvents.map((event) => {
        csvText += `${Object.values(event).join(",")}\r\n`;
      });

      const csvData = new Blob([csvText], { type: "text/csv" });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement("a");
      link.href = csvURL;
      link.download = `events.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <button onClick={exportCSV} className="border p-2 rounded bg-zinc-100 mb-4">
      export
    </button>
  );
};
