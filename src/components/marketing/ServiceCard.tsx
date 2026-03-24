import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wrench } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ElementType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  href, 
  icon: Icon = Wrench 
}) => {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-elegant transition-all duration-300 group overflow-hidden border-border/50">
        <CardContent className="p-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center text-primary font-medium">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
