import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/data/marketing-blog';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full hover:shadow-elegant transition-all duration-300 group overflow-hidden border-border/50 bg-card">
        <div className="aspect-[16/9] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Badge className="absolute top-4 left-4 gradient-primary border-0">{post.category}</Badge>
        </div>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
          </div>
          <h3 className="text-2xl font-semibold mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-primary font-medium">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
