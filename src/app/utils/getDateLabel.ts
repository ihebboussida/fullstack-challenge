import { EventInput } from "@fullcalendar/core";
import { DateRange } from "@fullcalendar/core/internal";

export const getDateLabel = (
  selectedDate: DateRange | undefined,
  events: EventInput[]
): string => {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (selectedDate?.start) {
    return formatDate(selectedDate.start);
  }

  const labelDate = new Date();
  const labelDateStr = labelDate.toISOString().split("T")[0];

  const eventDates = events.map(
    (e) => new Date(e.start as string).toISOString().split("T")[0]
  );

  const existsInEvents = eventDates.includes(labelDateStr);

  if (existsInEvents) {
    return formatDate(labelDate);
  }

  if (events.length > 0) {
    return formatDate(new Date(events[0].start as string));
  }

  return "";
};
