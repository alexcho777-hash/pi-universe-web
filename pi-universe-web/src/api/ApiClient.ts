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
      // The visitor's own time zone, so "today" / "this month" follow where they are
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz) config.headers['X-Timezone'] = tz;
      } catch {
        /* older browsers: the server falls back to Taiwan time */
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
        code: error.response?.data?.code,
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
        code: error.response?.data?.code,
      };
    }
  }

  // Generic DELETE
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<ApiResponse<T>>(endpoint, config);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'API request failed',
        code: error.response?.data?.code,
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

  // ---- Merit book & visitor statistics (功德簿・參訪統計) ----
  // Record today's visit (once per person per day) -> "you are visitor #N today"
  async visitSanctuary(sanctuaryId: number) {
    return this.post(`/api/merit/visit/${sanctuaryId}`, {});
  }

  async getMeritOverview() {
    return this.get('/api/merit/overview');
  }

  async getSanctuaryMerit(sanctuaryId: number) {
    return this.get(`/api/merit/sanctuary/${sanctuaryId}`);
  }

  // The caller's own donations and rank (private)
  async getMyMerit() {
    return this.get('/api/merit/me');
  }

  // ---- Online oracle (線上求籤) ----
  async getOracleStatus() {
    return this.get('/api/oracle/status');
  }

  async confirmAdult() {
    return this.post('/api/oracle/confirm-age', {});
  }

  async drawLot(sanctuaryId?: number) {
    return this.post('/api/oracle/draw', { sanctuary_id: sanctuaryId });
  }

  async verifyLot(drawId: number) {
    return this.post('/api/oracle/verify', { draw_id: drawId });
  }

  async getOracleHistory() {
    return this.get('/api/oracle/history');
  }

  // Get user profile
  async getUserProfile() {
    return this.get('/api/users/profile');
  }

  // Update user profile
  async updateUserProfile(data: any) {
    return this.post('/api/users/profile', data);
  }

  // Announcement board / message wall
  async getBoard(religionType: string) {
    return this.get(`/api/board/${religionType}`);
  }

  async postBoardMessage(religionType: string, content: string) {
    return this.post(`/api/board/${religionType}`, { content });
  }

  async reportBoardPost(id: number) {
    return this.post(`/api/board/post/${id}/report`, {});
  }

  async deleteBoardPost(id: number) {
    return this.delete(`/api/board/post/${id}`);
  }

  // Online lamp lighting
  async getSanctuaryLamps(sanctuaryId: number) {
    return this.get(`/api/lamps/sanctuary/${sanctuaryId}`);
  }

  async getMyLamps() {
    return this.get('/api/lamps/mine');
  }

  // Ancestor memorial-day reminders
  async getMemorials() {
    return this.get('/api/memorials');
  }

  async addMemorial(data: { name: string; calendar_type: 'lunar' | 'solar'; month: number; day: number; note?: string }) {
    return this.post('/api/memorials', data);
  }

  async deleteMemorial(id: number) {
    return this.delete(`/api/memorials/${id}`);
  }
}

export const apiClient = new ApiClientClass();
