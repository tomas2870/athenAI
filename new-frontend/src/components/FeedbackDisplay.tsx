// FeedbackDisplay.jsx

import { ScrollArea } from "./ui/scrollarea";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { FeedbackItem } from './types';

interface FeedbackDisplayProps {
  feedback: FeedbackItem[];
  setHoveredFeedbackId: (id: number | null) => void;
  setSelectedFeedbackId: (id: number | null) => void;
  hoveredFeedbackId: number | null;
  selectedFeedbackId: number | null;
}

export default function FeedbackDisplay({
  feedback,
  setHoveredFeedbackId,
  setSelectedFeedbackId,
  hoveredFeedbackId,
  selectedFeedbackId,
}: FeedbackDisplayProps) {
  return (
    <Card className="bg-white rounded-lg shadow-2xl border border-purple-200 mr-7">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Feedback</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="max-h-[639px] overflow-y-auto pr-4">
          {feedback.map((item, index) => {
            const isHovered = item.id === hoveredFeedbackId;
            const isSelected = item.id === selectedFeedbackId;

            // Base styling
            let baseClassName = `mb-4 p-3 rounded-lg shadow-sm border border-purple-100 cursor-pointer`;

            // Determine background color
            let backgroundColor = index % 2 === 0 ? 'purple' : 'blue';

            if (isSelected) {
              backgroundColor = `bg-${backgroundColor}-500 text-white`
            } else if (isHovered) {
              backgroundColor = `bg-${backgroundColor}-300`
            } else {
              backgroundColor = `bg-${backgroundColor}-50`
            }

            return (
              <div
                key={item.id}
                className={`${baseClassName} ${backgroundColor}`}
                onMouseEnter={() => setHoveredFeedbackId(item.id)}
                onMouseLeave={() => setHoveredFeedbackId(null)}
                onClick={() => setSelectedFeedbackId(item.id)}
              >
                <p className="text-sm">{item.text}</p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
