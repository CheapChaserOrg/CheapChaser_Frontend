
import React from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ActivityProps {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: number;
  capacity: number;
  image: string;
  category: string;
  description: string;
}

const ActivityCard = ({
  title,
  location,
  date,
  time,
  price,
  capacity,
  image,
  category,
  description
}: ActivityProps) => {
  return (
    <Card className="activity-card overflow-hidden border border-border/40 bg-white/80 transition-all duration-300 hover:bg-white animate-fade-in">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 z-20 bg-srilanka-primary text-white font-medium">
          {category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-3.5 w-3.5 text-srilanka-primary" />
            <span className="text-xs">{location}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-3.5 w-3.5 text-srilanka-primary" />
            <span className="text-xs">{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1.5 h-3.5 w-3.5 text-srilanka-primary" />
            <span className="text-xs">{time}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1.5 h-3.5 w-3.5 text-srilanka-primary" />
            <span className="text-xs">{capacity} people</span>
          </div>
          <div className="flex items-center font-medium">
            <DollarSign className="mr-1 h-3.5 w-3.5 text-srilanka-primary" />
            <span className="text-xs">${price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <button className="w-full rounded-md bg-srilanka-primary py-2 text-sm font-medium text-white transition-colors hover:bg-srilanka-dark">
          Book Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
