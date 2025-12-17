import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);

  // Fetch user type on mount
  useEffect(() => {
    if (!user) {
      setUserType(null);
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("user_id", user.id)
        .single();
      setUserType(data?.user_type || null);
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    // Only enable for admin/employee users
    if (!user || !userType || (userType !== "admin" && userType !== "employee")) {
      return;
    }

    // Subscribe to new appointments
    const appointmentsChannel = supabase
      .channel("appointments-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "appointments",
        },
        (payload) => {
          const appointment = payload.new as any;
          toast.success("New Booking Received!", {
            description: `${appointment.customer_name || "A customer"} booked ${appointment.service_type} for ${appointment.appointment_date}`,
            duration: 8000,
          });
          playNotificationSound();
        }
      )
      .subscribe();

    // Subscribe to new contact submissions
    const contactChannel = supabase
      .channel("contact-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contact_submissions",
        },
        (payload) => {
          const submission = payload.new as any;
          toast.info("New Enquiry!", {
            description: `${submission.full_name} sent a message about ${submission.service_needed || "general enquiry"}`,
            duration: 8000,
          });
          playNotificationSound();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(appointmentsChannel);
      supabase.removeChannel(contactChannel);
    };
  }, [user, userType]);
};

const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (e) {
    // Audio not available
  }
};
