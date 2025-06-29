import { Clock, MapPin, StickyNote } from "lucide-react";
import { FC } from "react";

interface ListWeekViewProps {
  title: string;
  timeRange: string;
  location: string;
  notes: string;
}

export const ListWeekView: FC<ListWeekViewProps> = ({
  title,
  timeRange,
  location,
  notes,
}) => {
  return (
    <div className="p-2">
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
  );
};
