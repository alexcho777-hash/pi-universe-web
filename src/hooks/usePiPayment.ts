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
import { trNow } from '../i18n/i18n';

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

export interface LampConfig {
  amount: number;
  sanctuaryId: number;
  memo: string;
  lampType: 'guangming' | 'taisui' | 'wenchang';
  dedicateName?: string;
}

export interface VowOfferingConfig {
  amount: number;
  sanctuaryId: number;
  memo: string;
  offeringType: 'garland' | 'elephant';
  /** Link this offering to a wish, marking it fulfilled automatically */
  wishId?: number;
}

export class PaymentCancelledError extends Error {
  constructor() {
    super(trNow('付款已取消', 'Payment cancelled'));
  }
}

export const usePiPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runPayment = useCallback((amount: number, memo: string, metadata: Record<string, any>): Promise<DonationResult> => {
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
        failWith(new Error(trNow('捐獻 Pi 需要在 Pi Browser 中進行，請用 Pi Browser 開啟 pi-universe-web.onrender.com', 'Donating Pi works in the Pi Browser. Please open pi-universe-web.onrender.com in the Pi Browser.')));
        return;
      }

      try {
        window.Pi.createPayment(
          { amount, memo, metadata },
          {
            onReadyForServerApproval: async (paymentId: string) => {
              const r = await apiClient.approvePayment(paymentId);
              if (!r.success) failWith(new Error(`${trNow('核准付款失敗', 'Payment approval failed')}: ${r.error || 'unknown error'}`));
            },
            onReadyForServerCompletion: async (paymentId: string, txid: string) => {
              const r = await apiClient.completePayment(paymentId, txid);
              if (r.success) {
                succeed({ paymentId, txid, amount });
              } else {
                failWith(new Error(`${trNow('完成付款失敗', 'Payment completion failed')}: ${r.error || 'unknown error'}`));
              }
            },
            onCancel: (paymentId: string) => {
              if (paymentId) apiClient.cancelPayment(paymentId);
              failWith(new PaymentCancelledError());
            },
            onError: (err: any, payment?: any) => {
              if (payment?.identifier) apiClient.cancelPayment(payment.identifier);
              failWith(new Error(err?.message || String(err) || trNow('付款發生錯誤', 'Payment error')));
            },
          }
        );
      } catch (err: any) {
        failWith(new Error(err?.message || trNow('無法開啟 Pi 付款', 'Could not open the Pi payment')));
      }
    });
  }, []);

  const donate = useCallback(
    (config: DonationConfig) =>
      runPayment(config.amount, config.memo, { sanctuary_id: config.sanctuaryId, kind: 'donation', anonymous: !!config.anonymous }),
    [runPayment]
  );

  const lightLamp = useCallback(
    (config: LampConfig) =>
      runPayment(config.amount, config.memo, {
        sanctuary_id: config.sanctuaryId,
        kind: 'lamp',
        lamp_type: config.lampType,
        dedicate_name: config.dedicateName || '',
      }),
    [runPayment]
  );

  const makeVowOffering = useCallback(
    (config: VowOfferingConfig) =>
      runPayment(config.amount, config.memo, {
        sanctuary_id: config.sanctuaryId,
        kind: 'vow',
        offering_type: config.offeringType,
        wish_id: config.wishId || '',
      }),
    [runPayment]
  );

  return { isLoading, error, donate, lightLamp, makeVowOffering };
};
