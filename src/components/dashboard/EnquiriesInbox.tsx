import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, UserPlus, CheckCircle, Archive, Mail, Phone, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

type Profile = {
  id: string;
  user_type: string;
  full_name: string | null;
  email: string;
};

type ContactSubmission = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_needed: string | null;
  vehicle_info: string | null;
  message: string | null;
  source_page: string | null;
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  assigned_to: string | null;
  notes: string | null;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  response_due_date: string | null;
  first_response_at: string | null;
  last_response_at: string | null;
  response_count: number;
  customer_rating: number | null;
  resolution_notes: string | null;
};

function EnquiriesInbox({ profile }: { profile: Profile }) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ContactSubmission["status"] | "all">("new");
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch enquiries:", error);
      toast({ title: "Error", description: "Unable to load enquiries.", variant: "destructive" });
    } else {
      setSubmissions(data as any[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const updateSubmissionStatus = async (id: string, status: ContactSubmission["status"]) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status, assigned_to: profile.id, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Failed to update submission:", error);
      toast({ title: "Error", description: "Failed to update enquiry status.", variant: "destructive" });
    } else {
      setSubmissions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, status, assigned_to: profile.id } : sub
      ));
      toast({ title: "Success", description: "Enquiry status updated." });
    }
  };

  const filteredSubmissions = submissions.filter(submission => 
    filter === "all" || submission.status === filter
  );

  const getStatusBadgeVariant = (status: ContactSubmission["status"]) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'in_progress': return 'default';
      case 'responded': return 'secondary';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityBadgeVariant = (priority: ContactSubmission["priority"]) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'normal': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/20 backdrop-blur-md border-white/30">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
                <div className="h-8 bg-white/20 rounded w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageSquare className="h-5 w-5" />
            Customer Enquiries
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage and respond to customer inquiries
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filter Tabs */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "new", label: "New" },
              { key: "in_progress", label: "In Progress" },
              { key: "responded", label: "Responded" },
              { key: "closed", label: "Closed" }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key as typeof filter)}
                className={filter === key 
                  ? "gradient-primary shadow-glow" 
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                }
              >
                {label}
                {key !== "all" && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                    {submissions.filter(s => s.status === key).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No enquiries found</h3>
              <p className="text-white/70">
                {filter === "all" ? "No enquiries have been received yet." : `No ${filter} enquiries found.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="bg-white/20 backdrop-blur-md border-white/30 text-white">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-white">{submission.full_name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Mail className="h-4 w-4" />
                      {submission.email}
                      {submission.phone && (
                        <>
                          <Separator orientation="vertical" className="h-4" />
                          <Phone className="h-4 w-4" />
                          {submission.phone}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={getStatusBadgeVariant(submission.status)}>
                      {submission.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    {submission.priority && (
                      <Badge variant={getPriorityBadgeVariant(submission.priority)}>
                        {submission.priority.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {submission.service_needed && (
                  <div>
                    <h4 className="font-medium text-white mb-1">Service Needed</h4>
                    <p className="text-white/80">{submission.service_needed}</p>
                  </div>
                )}
                
                {submission.vehicle_info && (
                  <div>
                    <h4 className="font-medium text-white mb-1">Vehicle Information</h4>
                    <p className="text-white/80">{submission.vehicle_info}</p>
                  </div>
                )}
                
                {submission.message && (
                  <div>
                    <h4 className="font-medium text-white mb-1">Message</h4>
                    <p className="text-white/80">{submission.message}</p>
                  </div>
                )}

                <Separator className="bg-white/20" />
                
                <div className="flex items-center justify-between text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Received: {formatDate(submission.created_at)}
                  </div>
                  {submission.source_page && (
                    <span>From: {submission.source_page}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {submission.status === 'new' && (
                    <Button
                      size="sm"
                      onClick={() => updateSubmissionStatus(submission.id, 'in_progress')}
                      className="gradient-primary shadow-glow"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign to Me
                    </Button>
                  )}
                  
                  {submission.status === 'in_progress' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateSubmissionStatus(submission.id, 'responded')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Responded
                    </Button>
                  )}
                  
                  {['responded', 'in_progress'].includes(submission.status) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateSubmissionStatus(submission.id, 'closed')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Close Enquiry
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default EnquiriesInbox;