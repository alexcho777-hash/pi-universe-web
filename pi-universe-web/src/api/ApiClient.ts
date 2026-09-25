/**
 * API Client for π Universe Web
 * Connects to existing backend (Render)
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types';

/** localStorage key used by the auth store (zustand persist). */
export const AUTH_STORAGE_KEY = 'pi-universe-auth';

class ApiClientClass {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Use existing π Universe backend
    this.baseURL = import.meta.env.VITE_API_URL || 'https://pi-universe-api.onrender.com';

    this.instance = axios.create({
      baseURL: this.baseURL,
      // Render's free tier sleeps when idle; the first request can take ~30-60s to wake it.
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Send the login session issued by our backend (after it verified the user with Pi)
    this.instance.interceptors.request.use((config) => {
      const token = this.getSessionToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    // Session missing/expired: clear the saved login and go back to the login page.
    // (Not for the login calls themselves, which report their own errors.)
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const url: string = error.config?.url || '';
        const isLoginCall = /\/api\/users\/(sync|pi-signin)/.test(url);
        if (error.response?.status === 401 && !isLoginCall) {
          try {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          } catch {
            /* ignore */
          }
          if (window.location.pathname !== '/login') window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private getSessionToken(): string | null {
    try {
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        return JSON.parse(authData).state?.sessionToken || null;
      }
    } catch {
      /* storage unavailable */
    }
    return null;
  }

  // Generic GET
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<ApiResponse<T>>(endpoint, config);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'API request failed',
      };
    }
  }

  // Generic POST
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<ApiResponse<T>>(endpoint, data, config);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'API request failed',
      };
    }
  }

  // Get sanctuaries
  async getSanctuaries() {
    return this.get('/api/sanctuaries');
  }

  // Get acknowledgments
  async getAcknowledgments() {
    return this.get('/api/acknowledgments');
  }

  // Daily check-in (once per day)
  async dailyCheckIn() {
    return this.post('/api/practice/checkin', {});
  }

  // Record a meditation session
  async logMeditation(durationMinutes: number) {
    return this.post('/api/practice/meditation', { duration_minutes: durationMinutes });
  }

  // Current user's practice & donation totals
  async getPracticeSummary() {
    return this.get('/api/practice/summary');
  }

  // ---- Pi payments (see src/hooks/usePiPayment.ts) ----
  async approvePayment(paymentId: string) {
    return this.post('/api/payments/approve', { paymentId });
  }

  async completePayment(paymentId: string, txid: string) {
    return this.post('/api/payments/complete', { paymentId, txid });
  }

  async cancelPayment(paymentId: string) {
    return this.post('/api/payments/cancel', { paymentId });
  }

  async handleIncompletePayment(paymentId: string) {
    return this.post('/api/payments/incomplete', { paymentId });
  }

  // Get user profile
  async getUserProfile() {
    return this.get('/api/users/profile');
  }

  // Update user profile
  async updateUserProfile(data: any) {
    return this.post('/api/users/profile', data);
  }
}

export const apiClient = new ApiClientClass();
