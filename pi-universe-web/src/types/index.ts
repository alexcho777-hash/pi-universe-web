/**
 * π Universe Web - Type Definitions
 */

export interface User {
  pi_uid: string;
  username: string;
  user_id?: string;
  sanctuary_id?: number;
  created_at?: string;
}

export interface Sanctuary {
  id: number;
  name: string;
  description: string;
  religion_type: string;
  icon?: string;
  color?: string;
  image_url?: string;
}

export interface Donation {
  id?: number;
  sanctuary_id: number;
  amount: number;
  pi_uid: string;
  timestamp?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (piUid?: string) => Promise<void>;
  signInWithPiToken: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

export interface PiAuthResult {
  user: {
    uid: string;
    username?: string;
  };
  accessToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
