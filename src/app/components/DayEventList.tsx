import {
  CalendarIcon,
  MapPinIcon,
  StickyNoteIcon,
} from "lucide-react";
import { EventInput } from "@fullcalendar/core";

interface DayEventListProps {
  dateLabel: string;
  events: EventInput[];
  onEventClicked: (id: string) => void;
}

export function DayEventList({
  dateLabel,
  events,
  onEventClicked,
}: DayEventListProps) {
  if (!events.length) {
    return null;
  }
  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">{dateLabel}</h2>

      <div className="space-y-4">
        {events.map((event) => {
          const color = event.backgroundColor ?? "bg-muted";

          return (
            <div
              key={event.id}
              className="relative rounded-md border bg-muted p-4 pl-4 shadow-sm"
              onClick={() => onEventClicked(event.id ?? "")}
            >
              <div
                className="absolute left-0 top-4 h-10 w-1 rounded-full"
                style={{ backgroundColor: color }}
              />

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">{event.title}</h3>

                  <div className="text-sm text-muted-foreground space-y-1">
                    {event.start && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {new Date(event.start as string).toLocaleTimeString(
                          "de-DE",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    )}
                    {event.extendedProps?.location && (
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        {event.extendedProps.location}
                      </div>
                    )}
                    {event.extendedProps?.notes && (
                      <div className="flex items-center gap-2">
                        <StickyNoteIcon className="h-4 w-4" />
                        {event.extendedProps.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
