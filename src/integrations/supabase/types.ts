export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_secret: boolean | null
          setting_key: string
          setting_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_secret?: boolean | null
          setting_key: string
          setting_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_secret?: boolean | null
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          booked_online: boolean | null
          booking_reference: string | null
          client_id: string | null
          created_at: string
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          duration_minutes: number
          estimated_cost: number | null
          id: string
          managed_client_id: string | null
          notes: string | null
          service_type: string
          status: string
          technician_id: string | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          booked_online?: boolean | null
          booking_reference?: string | null
          client_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_minutes?: number
          estimated_cost?: number | null
          id?: string
          managed_client_id?: string | null
          notes?: string | null
          service_type: string
          status?: string
          technician_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          booked_online?: boolean | null
          booking_reference?: string | null
          client_id?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_minutes?: number
          estimated_cost?: number | null
          id?: string
          managed_client_id?: string | null
          notes?: string | null
          service_type?: string
          status?: string
          technician_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_managed_client_id_fkey"
            columns: ["managed_client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "mot_reminders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_times: {
        Row: {
          all_day: boolean | null
          created_at: string
          created_by: string | null
          date: string
          end_time: string | null
          id: string
          reason: string | null
          start_time: string | null
        }
        Insert: {
          all_day?: boolean | null
          created_at?: string
          created_by?: string | null
          date: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
        }
        Update: {
          all_day?: boolean | null
          created_at?: string
          created_by?: string | null
          date?: string
          end_time?: string | null
          id?: string
          reason?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocked_times_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookable_services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          max_daily_slots: number | null
          name: string
          online_booking_enabled: boolean | null
          price: number | null
          price_from: boolean | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          max_daily_slots?: number | null
          name: string
          online_booking_enabled?: boolean | null
          price?: number | null
          price_from?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          max_daily_slots?: number | null
          name?: string
          online_booking_enabled?: boolean | null
          price?: number | null
          price_from?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      business_hours: {
        Row: {
          close_time: string | null
          created_at: string
          day_of_week: number
          id: string
          is_closed: boolean | null
          open_time: string | null
          slot_interval_minutes: number | null
        }
        Insert: {
          close_time?: string | null
          created_at?: string
          day_of_week: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
          slot_interval_minutes?: number | null
        }
        Update: {
          close_time?: string | null
          created_at?: string
          day_of_week?: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
          slot_interval_minutes?: number | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          service_needed: string | null
          source_page: string | null
          status: string
          updated_at: string
          vehicle_info: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          service_needed?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          vehicle_info?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          service_needed?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          vehicle_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_schedules: {
        Row: {
          created_at: string
          day_of_week: number
          employee_id: string
          end_time: string | null
          id: string
          is_available: boolean | null
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          employee_id: string
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          employee_id?: string
          end_time?: string | null
          id?: string
          is_available?: boolean | null
          start_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_schedules_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_time_off: {
        Row: {
          approved: boolean | null
          approved_by: string | null
          created_at: string
          employee_id: string
          end_date: string
          id: string
          reason: string | null
          start_date: string
          updated_at: string
        }
        Insert: {
          approved?: boolean | null
          approved_by?: string | null
          created_at?: string
          employee_id: string
          end_date: string
          id?: string
          reason?: string | null
          start_date: string
          updated_at?: string
        }
        Update: {
          approved?: boolean | null
          approved_by?: string | null
          created_at?: string
          employee_id?: string
          end_date?: string
          id?: string
          reason?: string | null
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_time_off_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_time_off_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string | null
          item_type: string
          part_number: string | null
          quantity: number
          sort_order: number | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id?: string | null
          item_type?: string
          part_number?: string | null
          quantity?: number
          sort_order?: number | null
          total_price?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string | null
          item_type?: string
          part_number?: string | null
          quantity?: number
          sort_order?: number | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_due: number
          amount_paid: number | null
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          invoice_number: string
          items: Json | null
          notes: string | null
          quote_id: string | null
          status: string
          subtotal: number
          tax_amount: number | null
          tax_rate: number | null
          title: string
          total_amount: number
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          amount_due?: number
          amount_paid?: number | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          items?: Json | null
          notes?: string | null
          quote_id?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          title: string
          total_amount?: number
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          amount_due?: number
          amount_paid?: number | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          items?: Json | null
          notes?: string | null
          quote_id?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          title?: string
          total_amount?: number
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "mot_reminders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string | null
          user_type: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          created_at: string
          description: string
          id: string
          item_type: string
          part_number: string | null
          quantity: number
          quote_id: string | null
          sort_order: number | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          item_type?: string
          part_number?: string | null
          quantity?: number
          quote_id?: string | null
          sort_order?: number | null
          total_price?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          item_type?: string
          part_number?: string | null
          quantity?: number
          quote_id?: string | null
          sort_order?: number | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          items: Json | null
          notes: string | null
          quote_number: string
          status: string
          subtotal: number
          tax_amount: number | null
          tax_rate: number | null
          title: string
          total_amount: number
          updated_at: string
          valid_until: string | null
          vehicle_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          quote_number: string
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          title: string
          total_amount?: number
          updated_at?: string
          valid_until?: string | null
          vehicle_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          quote_number?: string
          status?: string
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          title?: string
          total_amount?: number
          updated_at?: string
          valid_until?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "mot_reminders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          created_at: string
          id: string
          is_sent: boolean | null
          message: string | null
          profile_id: string | null
          reminder_date: string
          reminder_type: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_sent?: boolean | null
          message?: string | null
          profile_id?: string | null
          reminder_date: string
          reminder_type: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_sent?: boolean | null
          message?: string | null
          profile_id?: string | null
          reminder_date?: string
          reminder_type?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "mot_reminders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          cost: number | null
          created_at: string
          description: string | null
          id: string
          labour_hours: number | null
          notes: string | null
          parts_used: string | null
          service_date: string
          service_type: string
          status: string
          technician_id: string | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          labour_hours?: number | null
          notes?: string | null
          parts_used?: string | null
          service_date?: string
          service_type: string
          status?: string
          technician_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          labour_hours?: number | null
          notes?: string | null
          parts_used?: string | null
          service_date?: string
          service_type?: string
          status?: string
          technician_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "mot_reminders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          account_number: string | null
          address: string | null
          category: string | null
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          account_number?: string | null
          address?: string | null
          category?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          account_number?: string | null
          address?: string | null
          category?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_lookups: {
        Row: {
          colour: string | null
          created_at: string
          fuel_type: string | null
          id: string
          last_updated: string | null
          lookup_count: number | null
          make: string | null
          model: string | null
          mot_expiry_date: string | null
          mot_status: string | null
          registration: string
          tax_due_date: string | null
          tax_status: string | null
          year: number | null
        }
        Insert: {
          colour?: string | null
          created_at?: string
          fuel_type?: string | null
          id?: string
          last_updated?: string | null
          lookup_count?: number | null
          make?: string | null
          model?: string | null
          mot_expiry_date?: string | null
          mot_status?: string | null
          registration: string
          tax_due_date?: string | null
          tax_status?: string | null
          year?: number | null
        }
        Update: {
          colour?: string | null
          created_at?: string
          fuel_type?: string | null
          id?: string
          last_updated?: string | null
          lookup_count?: number | null
          make?: string | null
          model?: string | null
          mot_expiry_date?: string | null
          mot_status?: string | null
          registration?: string
          tax_due_date?: string | null
          tax_status?: string | null
          year?: number | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          client_id: string | null
          colour: string | null
          created_at: string
          engine_code: string | null
          fuel_type: string | null
          id: string
          make: string
          mileage: number | null
          model: string
          mot_expiry: string | null
          notes: string | null
          owner_id: string | null
          registration: string
          service_due_date: string | null
          service_due_mileage: number | null
          updated_at: string
          vin: string | null
          year: number
        }
        Insert: {
          client_id?: string | null
          colour?: string | null
          created_at?: string
          engine_code?: string | null
          fuel_type?: string | null
          id?: string
          make: string
          mileage?: number | null
          model: string
          mot_expiry?: string | null
          notes?: string | null
          owner_id?: string | null
          registration: string
          service_due_date?: string | null
          service_due_mileage?: number | null
          updated_at?: string
          vin?: string | null
          year: number
        }
        Update: {
          client_id?: string | null
          colour?: string | null
          created_at?: string
          engine_code?: string | null
          fuel_type?: string | null
          id?: string
          make?: string
          mileage?: number | null
          model?: string
          mot_expiry?: string | null
          notes?: string | null
          owner_id?: string | null
          registration?: string
          service_due_date?: string | null
          service_due_mileage?: number | null
          updated_at?: string
          vin?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      web_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_name: string
          id: string
          profile_id: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_name: string
          id?: string
          profile_id?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_name?: string
          id?: string
          profile_id?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "web_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      web_pageviews: {
        Row: {
          created_at: string
          id: string
          path: string
          profile_id: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          profile_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          profile_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "web_pageviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      mot_reminders: {
        Row: {
          client_email: string | null
          client_phone: string | null
          created_at: string | null
          id: string | null
          make: string | null
          model: string | null
          mot_expiry_date: string | null
          registration: string | null
          reminder_date: string | null
          reminder_sent: boolean | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_appointment_conflict: {
        Args: {
          p_date: string
          p_duration: number
          p_exclude_id?: string
          p_time: string
        }
        Returns: boolean
      }
      check_employee_availability: {
        Args: { p_date: string; p_employee_id: string; p_time: string }
        Returns: boolean
      }
      convert_quote_to_invoice: { Args: { quote_id: string }; Returns: string }
      generate_booking_reference: { Args: never; Returns: string }
      generate_invoice_number: { Args: never; Returns: string }
      generate_quote_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "employee" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "employee", "client"],
    },
  },
} as const
