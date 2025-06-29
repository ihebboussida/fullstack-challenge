import { FC } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { ListWeekView } from "./ListWeekView";
import { TimeGridWeekView } from "./TimeGridWeekView";
import { DayGridMonthView } from "./DayGridMonthView";

interface EventComponentProps {
  info: EventContentArg;
}

export const EventComponent: FC<EventComponentProps> = ({ info }) => {
  const { view, event } = info;
  const location = event.extendedProps.location;
  const timeRange = `${event.start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} bis ${event.end?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} Uhr`;

  const notes = event.extendedProps.notes as string;
  const categoryColor = event.extendedProps.category.color;

  if (view.type === "dayGridMonth") {
    return (
      <DayGridMonthView
        title={event.title}
        timeRange={timeRange}
        notes={notes}
        location={location}
        categoryColor= {categoryColor}
      ></DayGridMonthView>
    );
  }

  if (view.type === "timeGridWeek") {
    return (
      <TimeGridWeekView
        title={event.title}
        timeRange={timeRange}
        notes={notes}
        location={location}
      ></TimeGridWeekView>
    );
  }

  if (view.type === "listWeek") {
    return (
      <ListWeekView
        title={event.title}
        timeRange={timeRange}
        notes={notes}
        location={location}
      ></ListWeekView>
    );
  }

  return <div></div>;
};
