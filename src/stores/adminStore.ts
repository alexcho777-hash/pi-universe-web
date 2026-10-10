/**
 * Admin role (owner / admin) of the signed-in user, asked from the server once per login.
 * The server decides; the app only uses this to show the preview tools.
 */
import { create } from 'zustand';
import { apiClient } from '../api/ApiClient';

export type AdminRole = 'owner' | 'admin' | null;

interface AdminState {
  role: AdminRole;
  loaded: boolean;
  refresh: () => Promise<void>;
  clear: () => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
  role: null,
  loaded: false,
  refresh: async () => {
    try {
      const res: any = await apiClient.get('/api/admin/me');
      set({ role: res?.success ? (res.data?.role ?? null) : null, loaded: true });
    } catch {
      set({ role: null, loaded: true });
    }
  },
  clear: () => set({ role: null, loaded: false }),
}));
