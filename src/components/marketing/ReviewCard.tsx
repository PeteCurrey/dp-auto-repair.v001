import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  text: string;
  rating?: number;
  date?: string;
  vehicle?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  text,
  rating = 5,
  date = "Recent Customer",
  vehicle
}) => {
  return (
    <Card className="h-full border-border/50 hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex gap-1 mb-6 text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        
        <blockquote className="text-lg text-foreground italic mb-8 flex-grow leading-relaxed">
          "{text}"
        </blockquote>
        
        <div className="flex items-center gap-4 border-t border-border/50 pt-6 mt-auto">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              {date} {vehicle && <span className="opacity-50">| {vehicle}</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
