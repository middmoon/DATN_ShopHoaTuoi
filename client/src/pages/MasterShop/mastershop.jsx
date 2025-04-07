import React from "react";
import CategoryList from "../../components/CategoryList/Categorylist";
import PLMastershop from "../../components/Listcard/PL-Mastershop";
import EventSidebar from "../../components/Event/EventSidebar";
import { useEvent } from "../../context/eventContext";

export default function Mastershop() {
  const { currentEvent } = useEvent();

  return (
    <div className="bg-center bg-cover">
      <div className="container mx-auto flex p-10">
        <div className="w-1/5 rounded-xl">
          <div className="mb-5">{currentEvent && <EventSidebar slug={currentEvent?.slug} name={currentEvent?.name} />}</div>
          <CategoryList />
        </div>
        <div className="w-4/5 px-4">
          <PLMastershop />
        </div>
      </div>
    </div>
  );
}
