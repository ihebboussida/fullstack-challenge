import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Clock, MapPin, StickyNote } from "lucide-react";
import { FC } from "react";
import { lightenColor } from "../utils/lightenColor";


interface DayGridMonthViewProps {
  title: string;
  timeRange: string;
  location: string;
  notes: string;
  categoryColor: string
}

export const DayGridMonthView:FC<DayGridMonthViewProps> = ({title,timeRange,location,notes,categoryColor}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="p-1 text-sm font-semibold w-full h-full "
          style={{
            borderLeft: `4px solid ${lightenColor(
              categoryColor,
              70
            )}`,
          }}
        >
          {title}
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="p-1 overflow-hidden ">
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
