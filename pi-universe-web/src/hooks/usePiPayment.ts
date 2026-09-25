/**
 * Hook for Pi Network Payments (User-to-App donations)
 *
 * Pi payment flow:
 *  1. Pi.createPayment() opens the Pi Wallet
 *  2. onReadyForServerApproval  -> our backend approves it with the Pi API
 *  3. the user signs the transaction in the Pi Wallet
 *  4. onReadyForServerCompletion -> our backend completes it and records the donation
 */

import { useState, useCallback } from 'react';
import { apiClient } from '../api/ApiClient';
import { isPiBrowser } from '../auth/piSignIn';

declare global {
  interface Window {
    Pi?: any;
  }
}

export interface DonationConfig {
  amount: number;
  sanctuaryId: number;
  memo: string;
  /** Show as 隱名善信 in the merit book */
  anonymous?: boolean;
}

export interface DonationResult {
  paymentId: string;
  txid: string;
  amount: number;
}

export class PaymentCancelledError extends Error {
  constructor() {
    super('付款已取消');
  }
}

export const usePiPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const donate = useCallback((config: DonationConfig): Promise<DonationResult> => {
    setIsLoading(true);
    setError(null);

    const finish = () => setIsLoading(false);

    return new Promise<DonationResult>((resolve, reject) => {
      let settled = false;
      const failWith = (err: Error) => {
        if (settled) return;
        settled = true;
        if (!(err instanceof PaymentCancelledError)) setError(err.message);
        finish();
        reject(err);
      };
      const succeed = (result: DonationResult) => {
        if (settled) return;
        settled = true;
        finish();
        resolve(result);
      };

      if (!isPiBrowser() || !window.Pi || typeof window.Pi.createPayment !== 'function') {
        failWith(new Error('捐獻 Pi 需要在 Pi Browser 中進行，請用 Pi Browser 開啟 pi-universe-web.onrender.com'));
        return;
      }

      try {
        window.Pi.createPayment(
          {
            amount: config.amount,
            memo: config.memo,
            metadata: { sanctuary_id: config.sanctuaryId, kind: 'donation', anonymous: !!config.anonymous },
          },
          {
            onReadyForServerApproval: async (paymentId: string) => {
              const r = await apiClient.approvePayment(paymentId);
              if (!r.success) failWith(new Error(`核准付款失敗：${r.error || 'unknown error'}`));
            },
            onReadyForServerCompletion: async (paymentId: string, txid: string) => {
              const r = await apiClient.completePayment(paymentId, txid);
              if (r.success) {
                succeed({ paymentId, txid, amount: config.amount });
              } else {
                failWith(new Error(`完成付款失敗：${r.error || 'unknown error'}`));
              }
            },
            onCancel: (paymentId: string) => {
              if (paymentId) apiClient.cancelPayment(paymentId);
              failWith(new PaymentCancelledError());
            },
            onError: (err: any, payment?: any) => {
              if (payment?.identifier) apiClient.cancelPayment(payment.identifier);
              failWith(new Error(err?.message || String(err) || '付款發生錯誤'));
            },
          }
        );
      } catch (err: any) {
        failWith(new Error(err?.message || '無法開啟 Pi 付款'));
      }
    });
  }, []);

  return { isLoading, error, donate };
};
