"use client";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import deLocale from "@fullcalendar/core/locales/de";
import { DateSelectArg, EventInput } from "@fullcalendar/core";
import { EventComponent } from "./EventComponent";
import { lightenColor } from "../utils/lightenColor";
import { Appointment } from "../api/appointments/route";
import { DayEventList } from "./DayEventList";
import interactionPlugin from "@fullcalendar/interaction";

type Filters = {
  category: string;
  patient: string;
  start?: string;
  end?: string;
};

interface CalendarProps {
  filters: Filters;
  onEventSelect: (id: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface DateRange {
  start: string;
  end: string;
}

export default function Calendar({
  filters,
  onEventSelect,
  setIsLoading,
}: CalendarProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg>();
  const [dateRange, setDateRange] = useState<DateRange>({
    start: "",
    end: "",
  });
  const viewType = useRef("");
  const isDayGridMonth = viewType.current === "dayGridMonth";

  function getEventsForSelectedDate(): EventInput[] {
    const targetDate = selectedDate?.start ?? new Date();
    const targetDateStr =
      targetDate.getFullYear() +
      "-" +
      String(targetDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(targetDate.getDate()).padStart(2, "0");

    return events.filter((event) => {
      const eventDate = new Date(event.start as string);
      const eventDateStr =
        eventDate.getFullYear() +
        "-" +
        String(eventDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(eventDate.getDate()).padStart(2, "0");

      return eventDateStr === targetDateStr;
    });
  }

  const fetchEvents = async () => {
    const qs = new URLSearchParams();
    if (filters.category) qs.set("category", filters.category);
    if (filters.patient) qs.set("patient", filters.patient);
    if (dateRange.start) qs.set("start", dateRange.start);
    if (dateRange.end) qs.set("end", dateRange.end);

    setIsLoading(true);
    const res = await fetch("/api/appointments?" + qs.toString());
    setIsLoading(false);

    const data = await res.json();

    setEvents(
      data.map((a: Appointment) => ({
        id: a.id.toString(),
        title: a.title,
        start: a.start,
        end: a.end,
        extendedProps: {
          category: a.category,
          patient: a.patient,
          notes: a.notes,
          location: a.location,
        },
        backgroundColor: lightenColor(a.category.color, 70),
        borderColor: null,
        textColor: "black",
      }))
    );
  };

  useEffect(() => {
    fetchEvents();
  }, [filters, dateRange]);

  return (
    <div className={`${isDayGridMonth ? "flex w-full gap-4" : ""}`}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        nowIndicator={true}
        allDaySlot={false}
        height="auto"
        events={events}
        eventContent={(info) => <EventComponent info={info}></EventComponent>}
        eventClick={(info) => onEventSelect(info.event.id)}
        locales={[deLocale]}
        selectable
        locale="de"
        select={(arg: DateSelectArg) => setSelectedDate(arg)}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,listWeek",
          center: "title",
          right: "prev,next today",
        }}
        datesSet={(arg) => {
          const startDate = arg.startStr;
          const endDate = arg.endStr;
          viewType.current = arg.view.type;

          if (startDate !== dateRange.start || endDate !== dateRange.end) {
            setDateRange({ start: startDate, end: endDate });
          }
        }}
      />

      {isDayGridMonth && (
        <DayEventList
          events={getEventsForSelectedDate()}
          onEventClicked={(id: string) => onEventSelect(id)}
          dateLabel={(selectedDate?.start ?? new Date()).toLocaleDateString(
            "de-DE",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        />
      )}
    </div>
  );
}
