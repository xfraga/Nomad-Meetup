// Type definitions for Nomad Meetup App
// Designed for cross-platform mobile deployment (Android & iOS)

// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  created_at: string;
}

// ============================================
// PROFILE TYPES
// ============================================

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  photo_url: string | null;
  bio: string | null;
  current_city: string;
  latitude: number;
  longitude: number;
  skills: string[];
  interests: string[];
  languages: string[];
  work_schedule: WorkSchedule | null;
  timezone: string;
  available_for_meetup: boolean;
  preferred_meetup_types: MeetupType[];
  created_at?: string;
  updated_at?: string;
}

export interface WorkSchedule {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
}

// ============================================
// MEETUP TYPES
// ============================================

export enum MeetupType {
  COFFEE_CHAT = 'COFFEE_CHAT',
  COWORKING = 'COWORKING',
  SKILL_EXCHANGE = 'SKILL_EXCHANGE',
  SOCIAL_EVENT = 'SOCIAL_EVENT'
}

export enum MeetupStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Meetup {
  id: string;
  creator_id: string;
  participant_id: string;
  status: MeetupStatus;
  scheduled_time: string;
  location: MeetupLocation;
  meetup_type: MeetupType;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MeetupLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  place_id?: string; // For Google Places API integration
}

// ============================================
// MESSAGE TYPES
// ============================================

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  meetup_id?: string; // Optional - link to a specific meetup
  content: string;
  status: MessageStatus;
  created_at: string;
  read_at?: string | null;
}

export interface Conversation {
  id: string;
  participant_ids: string[];
  last_message: Message | null;
  unread_count: number;
  updated_at: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export enum NotificationType {
  MEETUP_REQUEST = 'MEETUP_REQUEST',
  MEETUP_ACCEPTED = 'MEETUP_ACCEPTED',
  MEETUP_DECLINED = 'MEETUP_DECLINED',
  MEETUP_CANCELLED = 'MEETUP_CANCELLED',
  MEETUP_REMINDER = 'MEETUP_REMINDER',
  NEW_MESSAGE = 'NEW_MESSAGE',
  PROFILE_VIEW = 'PROFILE_VIEW'
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>; // Additional data payload
  read: boolean;
  created_at: string;
}

// ============================================
// LOCATION & MAP TYPES
// ============================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface NearbyNomad {
  profile: Profile;
  distance: number; // Distance in kilometers
  coordinates: Coordinates;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================
// FORM & UI TYPES
// ============================================

export interface ProfileFormData {
  name: string;
  bio: string;
  current_city: string;
  skills: string[];
  interests: string[];
  languages: string[];
  work_schedule: WorkSchedule | null;
  timezone: string;
  preferred_meetup_types: MeetupType[];
}

export interface MeetupFormData {
  participant_id: string;
  scheduled_time: string;
  location: MeetupLocation;
  meetup_type: MeetupType;
  title?: string;
  description?: string;
}

export interface FilterOptions {
  meetup_types?: MeetupType[];
  max_distance?: number; // in kilometers
  languages?: string[];
  skills?: string[];
  interests?: string[];
  available_only?: boolean;
}

// ============================================
// NAVIGATION TYPES (React Navigation)
// ============================================

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  EditProfile: undefined;
  Map: undefined;
  Messages: undefined;
  Conversation: { conversationId: string; recipientId: string };
  CreateMeetup: { participantId: string };
  MeetupDetails: { meetupId: string };
  Notifications: undefined;
  Settings: undefined;
  Auth: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

// ============================================
// UTILITY TYPES
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// ============================================
// DATABASE TYPES (Supabase)
// ============================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'user_id'>>;
      };
      meetups: {
        Row: Meetup;
        Insert: Omit<Meetup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Meetup, 'id'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Omit<Message, 'id' | 'sender_id' | 'recipient_id'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id' | 'user_id'>>;
      };
    };
  };
}

// ============================================
// EXPORT ALL TYPES
// ============================================

export type { User, Profile, Meetup, Message, Conversation, Notification };