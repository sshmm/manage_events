"use client";

import EventTable from "../app/components/EventTable";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl mb-4">Event List</h1>
      <EventTable />
    </div>
  );
};

export default Home;
