import React from 'react';
import { Shield, Clock, Users, Wrench, CheckCircle } from 'lucide-react';

interface TrustBarItem {
  icon: React.ElementType;
  text: string;
}

const defaultItems: TrustBarItem[] = [
  { icon: Shield, text: "15+ Years Experience" },
  { icon: CheckCircle, text: "All Makes & Models" },
  { icon: Wrench, text: "Qualified Technicians" },
  { icon: Clock, text: "Transparent Pricing" },
  { icon: Users, text: "Independent Specialist" }
];

const TrustBar: React.FC<{ items?: TrustBarItem[] }> = ({ items = defaultItems }) => {
  return (
    <div className="bg-card border-y border-border/50 shadow-sm relative z-20 -mt-10 mx-4 max-w-6xl lg:mx-auto rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border/50">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-6 text-center hover:bg-muted/30 transition-colors">
            <item.icon className="h-6 w-6 text-primary mb-3" />
            <span className="text-sm font-medium text-foreground tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
