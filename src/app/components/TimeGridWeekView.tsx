import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Clock, MapPin, StickyNote, StickyNoteIcon } from "lucide-react";
import { FC } from "react";

interface TimeWeekViewProps {
  title: string;
  timeRange: string;
  location: string;
  notes: string;
}

export const TimeGridWeekView: FC<TimeWeekViewProps> = ({
  title,
  timeRange,
  location,
  notes,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="p-1 truncate w-full h-full">
          <h1 className="text-sm font-semibold truncate">{title}</h1>
          <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="truncate" >{timeRange}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{location}</span>
              </div>
            )}
            {notes && (
              <div className="flex items-center gap-1">
                <StickyNoteIcon className="w-4 h-4" />
                <span className="truncate">{notes}</span>
              </div>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="p-1 overflow-hidden">
          <h1 className="text-sm font-semibold">{title}</h1>
          <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeRange}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
            {notes && (
              <div className="flex items-center gap-1">
                <StickyNote className="w-4 h-4" />
                <span>{notes}</span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
