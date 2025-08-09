
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserPlus, CheckCircle, Archive, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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
  status: "new" | "in_progress" | "resolved" | "archived";
  assigned_to: string | null;
  internal_notes: string | null;
};

const statusVariant = (status: ContactSubmission["status"]) => {
  switch (status) {
    case "new": return "destructive";
    case "in_progress": return "secondary";
    case "resolved": return "outline";
    case "archived": return "secondary";
    default: return "secondary";
  }
};

export default function EnquiriesInbox({ profile }: { profile: Profile }) {
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
      setSubmissions(data as ContactSubmission[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
    // Optionally, you could set up a Realtime channel here later.
  }, []);

  const updateStatus = async (id: string, status: ContactSubmission["status"]) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: "Could not update status.", variant: "destructive" });
      return;
    }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast({ title: "Status updated", description: "Enquiry status has been updated." });
  };

  const assignToMe = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").update({ assigned_to: profile.id }).eq("id", id);
    if (error) {
      toast({ title: "Assign failed", description: "Could not assign enquiry.", variant: "destructive" });
      return;
    }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, assigned_to: profile.id } : s));
    toast({ title: "Assigned", description: "Enquiry assigned to you." });
  };

  const saveNotes = async (id: string, notes: string) => {
    const { error } = await supabase.from("contact_submissions").update({ internal_notes: notes }).eq("id", id);
    if (error) {
      toast({ title: "Save failed", description: "Could not save notes.", variant: "destructive" });
      return;
    }
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, internal_notes: notes } : s));
    toast({ title: "Notes saved", description: "Internal notes updated." });
  };

  const filtered = submissions.filter(s => filter === "all" ? true : s.status === filter);

  return (
    <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Enquiries Inbox
        </CardTitle>
        <CardDescription>View and manage contact form submissions</CardDescription>
        <div className="flex flex-wrap gap-2 mt-3">
          {(["all","new","in_progress","resolved","archived"] as const).map(s => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
            >
              {s === "all" ? "All" : s.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={fetchSubmissions}>Refresh</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading enquiries...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">No enquiries found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((s) => (
              <div key={s.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{s.full_name}</h4>
                      <Badge variant={statusVariant(s.status)}>{s.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(s.created_at)} • {s.email}{s.phone ? ` • ${s.phone}` : ""}
                    </p>
                    {s.service_needed && (
                      <p className="text-sm mt-1"><strong>Service:</strong> {s.service_needed}</p>
                    )}
                    {s.vehicle_info && (
                      <p className="text-sm"><strong>Vehicle:</strong> {s.vehicle_info}</p>
                    )}
                    {s.source_page && (
                      <p className="text-xs text-muted-foreground">Source: {s.source_page}</p>
                    )}
                    {s.message && (
                      <p className="text-sm mt-2">{s.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {s.assigned_to !== profile.id && (
                      <Button size="sm" variant="outline" onClick={() => assignToMe(s.id)}>
                        <UserPlus className="h-4 w-4 mr-1" /> Assign to me
                      </Button>
                    )}
                    {s.status === "new" && (
                      <Button size="sm" onClick={() => updateStatus(s.id, "in_progress")}>
                        <Play className="h-4 w-4 mr-1" /> Start
                      </Button>
                    )}
                    {s.status === "in_progress" && (
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(s.id, "resolved")}>
                        <CheckCircle className="h-4 w-4 mr-1" /> Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => updateStatus(s.id, "archived")}>
                      <Archive className="h-4 w-4 mr-1" /> Archive
                    </Button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <label className="text-sm font-medium">Internal Notes</label>
                    <Textarea
                      className="mt-1"
                      placeholder="Add notes for your team (not visible to the customer)"
                      value={s.internal_notes ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSubmissions(prev => prev.map(x => x.id === s.id ? { ...x, internal_notes: val } : x));
                      }}
                    />
                  </div>
                  <div className="md:pl-4 flex md:flex-col gap-2 mt-2 md:mt-0">
                    <Button size="sm" onClick={() => saveNotes(s.id, s.internal_notes ?? "")}>Save Notes</Button>
                    <Input
                      readOnly
                      value={s.assigned_to === profile.id ? "Assigned to you" : (s.assigned_to ? "Assigned" : "Unassigned")}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
