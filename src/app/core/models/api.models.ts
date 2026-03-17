export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: { message: string; details?: unknown } | null;
}

export type UserRole = 'ADMIN' | 'ARTIST' | 'CLIENT';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'BOOKED';
export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'DONE'
  | 'REQUESTED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED';


  
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roles: UserRole[];
  isActive?: boolean;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  city?: string;
  idea?: string;
  notes?: string;
  status: LeadStatus;
  createdAt?: string;
}

export interface Appointment {
  _id: string;
  leadId?: Lead | string;
  clientName?: string;
  artistName?: string;
  scheduledFor: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt?: string;
}
