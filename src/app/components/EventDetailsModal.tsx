import React from "react";
import { Event } from "./EventTable";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
}) => {
  return (
    <div
      onClick={onClose}
      className="p-4 w-full max-w-2xl max-h-full min-w-full"
    >
      <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="p-4 md:p-5 space-y-4">
          <div
            className=" flex  p-4 w-full max-w-2xl max-h-full
            gap-x-4 "
          >
            <div className="flex flex-col">
              <p>Actor</p>
              <div>
                <span className="inline font-light">Name</span>{" "}
                <span className="inline">{event.actor.actor_name}</span>
              </div>
              <div>
                <span className="inline font-light">Email</span>{" "}
                <span className="inline">{event.actor.email}</span>
              </div>
              <div className="block whitespace-nowrap">
                <span className="inline font-light">ID</span>{" "}
                <span className="inline">{event.actor.id}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Action</p>
              <div>
                <span className="inline font-light">Name</span>{" "}
                <span className="inline">{event.action.name}</span>
              </div>
              <div className="block whitespace-nowrap">
                <span className="inline font-light">ID</span>{" "}
                <span className="inline ">{event.action.id}</span>
              </div>
              <div className="block whitespace-nowrap">
                <span className="inline font-light">object</span>{" "}
                <span className="inline">{event.action.object}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <p>Date</p>
              <div className="block whitespace-nowrap">
                <span className="inline font-light">Readable</span>{" "}
                <span className="inline">
                  {new Date(event.occurred_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
