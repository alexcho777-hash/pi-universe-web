/**
 * 泰國四面佛 許願還願 (Thai Four-Faced Buddha — Phra Phrom — wish-making and its
 * fulfilment). Making a wish is free and kept on the server (cross-device); fulfilling
 * it ("還願") can optionally be paired with a Pi-paid offering (花環／大象), mirroring
 * the lamp-lighting payment flow.
 */

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { apiClient } from '../../api/ApiClient';
import { usePiPayment, PaymentCancelledError } from '../../hooks/usePiPayment';
import { useI18n } from '../../i18n/i18n';

type TR4 = (zh: string, en: string, vi: string, th: string) => string;

const CATEGORIES: { key: string; icon: string; label: [string, string, string, string] }[] = [
  { key: 'career', icon: '💼', label: ['事業', 'Career', 'Sự nghiệp', 'หน้าที่การงาน'] },
  { key: 'love', icon: '💕', label: ['愛情', 'Love', 'Tình duyên', 'ความรัก'] },
  { key: 'wealth', icon: '💰', label: ['財運', 'Wealth', 'Tài lộc', 'โชคลาภ'] },
  { key: 'health', icon: '🙏', label: ['健康平安', 'Health', 'Sức khỏe', 'สุขภาพ'] },
  { key: 'study', icon: '📚', label: ['考試學業', 'Study', 'Học hành', 'การเรียน'] },
  { key: 'other', icon: '✨', label: ['其他', 'Other', 'Khác', 'อื่น ๆ'] },
];

const OFFERINGS: { key: 'garland' | 'elephant'; icon: string; price: number; label: [string, string, string, string] }[] = [
  { key: 'garland', icon: '🌼', price: 1, label: ['花環', 'Flower garland', 'Vòng hoa', 'พวงมาลัย'] },
  { key: 'elephant', icon: '🐘', price: 3.14, label: ['木雕大象', 'Wooden elephant', 'Tượng voi gỗ', 'ช้างไม้แกะสลัก'] },
];

interface Wish {
  id: number;
  sanctuary_id: number;
  category: string;
  wish_text: string | null;
  status: 'pending' | 'fulfilled';
  fulfillment_note: string | null;
  fulfilled_at: string | null;
  created_at: string;
}

export function WishVowPanel({ sanctuaryId, sanctuaryName: name }: { sanctuaryId: number; sanctuaryName: string }) {
  const { tr, tr4 } = useI18n();
  const T = tr4 as TR4;
  const [category, setCategory] = useState('career');
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [fulfillingId, setFulfillingId] = useState<number | null>(null);
  const [offering, setOffering] = useState<'garland' | 'elephant'>('garland');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const { makeVowOffering, isLoading: paying } = usePiPayment();

  const load = async () => {
    const res: any = await apiClient.getWishes();
    if (res.success) setWishes((res.data || []).filter((w: Wish) => w.sanctuary_id === sanctuaryId));
  };
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanctuaryId]);

  const submitWish = async () => {
    setError('');
    setNotice('');
    const res: any = await apiClient.createWish({ sanctuary_id: sanctuaryId, category, wish_text: wishText.trim() || undefined });
    if (res.success) {
      setNotice(T('已記錄您的心願 🙏', 'Your wish has been recorded 🙏', 'Đã ghi lại điều ước của bạn 🙏', 'บันทึกคำอธิษฐานของคุณแล้ว 🙏'));
      setWishText('');
      load();
    } else {
      setError(res.error || T('許願失敗', 'Could not save the wish', 'Không thể lưu điều ước', 'บันทึกคำอธิษฐานไม่สำเร็จ'));
    }
  };

  const fulfilWithoutOffering = async (id: number) => {
    const res: any = await apiClient.fulfilWish(id);
    if (res.success) {
      setNotice(T('已標記還願完成', 'Marked as fulfilled', 'Đã đánh dấu là đã tạ lễ', 'ทำเครื่องหมายว่าแก้บนแล้ว'));
      setFulfillingId(null);
      load();
    }
  };

  const payOffering = async (wishId: number) => {
    setError('');
    setNotice('');
    const o = OFFERINGS.find((x) => x.key === offering)!;
    try {
      await makeVowOffering({
        amount: o.price,
        sanctuaryId,
        memo: `${o.label[1]} (π Universe)`,
        offeringType: offering,
        wishId,
      });
      setNotice(T('還願供養完成，感謝您 🙏', 'Your offering is complete — thank you 🙏', 'Đã hoàn thành lễ tạ ơn — cảm ơn bạn 🙏', 'ถวายแก้บนเรียบร้อยแล้ว ขอบคุณครับ/ค่ะ 🙏'));
      setFulfillingId(null);
      load();
    } catch (err: any) {
      if (err instanceof PaymentCancelledError) setError(tr('已取消付款', 'Payment cancelled'));
      else setError(err?.message || T('供養失敗', 'The offering failed', 'Lễ tạ ơn thất bại', 'การถวายไม่สำเร็จ'));
    }
  };

  const pending = wishes.filter((w) => w.status === 'pending');
  const fulfilled = wishes.filter((w) => w.status === 'fulfilled');
  const catLabel = (key: string) => {
    const c = CATEGORIES.find((x) => x.key === key);
    return c ? `${c.icon} ${T(...c.label)}` : key;
  };

  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
        {T(
          `${name}供奉四面佛（Phra Phrom），共有四面，一般認為分別庇佑事業、財運、愛情與健康——各地說法略有不同，僅供參考。許願免費，還願時可選擇供養花環或木雕大象。`,
          `${name} enshrines Phra Phrom, the Four-Faced Buddha. Each face is popularly associated with career, wealth, love and health — the exact meaning varies by tradition. Making a wish is free; fulfilling it ("還願") can include an offering of a flower garland or a wooden elephant.`,
          `${name} thờ Tứ Diện Phật (Phra Phrom). Bốn mặt thường được cho là phù hộ về sự nghiệp, tài lộc, tình duyên và sức khỏe — cách hiểu có thể khác nhau tùy nơi. Khấn nguyện miễn phí; khi tạ lễ có thể cúng dường vòng hoa hoặc tượng voi gỗ.`,
          `${name} ประดิษฐานท้าวมหาพรหม (พระพรหมสี่หน้า) เชื่อกันโดยทั่วไปว่าแต่ละหน้าประทานพรด้านหน้าที่การงาน โชคลาภ ความรัก และสุขภาพ — รายละเอียดอาจแตกต่างกันไปตามความเชื่อแต่ละที่ การอธิษฐานไม่มีค่าใช้จ่าย ส่วนการแก้บนสามารถถวายพวงมาลัยหรือช้างไม้แกะสลักได้`
        )}
      </Typography>

      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        {T('許一個新的心願', 'Make a new wish', 'Khấn một điều ước mới', 'อธิษฐานขอพรใหม่')}
      </Typography>
      <Grid container spacing={1} sx={{ mb: 1.5 }}>
        {CATEGORIES.map((c) => (
          <Grid size={4} key={c.key}>
            <Card
              variant="outlined"
              sx={{
                borderColor: category === c.key ? '#F4A300' : undefined,
                borderWidth: category === c.key ? 2 : 1,
                bgcolor: category === c.key ? '#FFF6E0' : undefined,
              }}
            >
              <CardActionArea onClick={() => setCategory(c.key)} sx={{ py: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '1.4rem' }}>{c.icon}</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, textAlign: 'center' }}>{T(...c.label)}</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TextField
        fullWidth
        multiline
        minRows={2}
        label={T('心願內容（可留空）', 'What you wish for (optional)', 'Nội dung điều ước (có thể để trống)', 'รายละเอียดคำอธิษฐาน (เว้นว่างได้)')}
        value={wishText}
        onChange={(e) => setWishText(e.target.value.slice(0, 200))}
        sx={{ mb: 1.5 }}
      />
      <Button variant="contained" fullWidth onClick={submitWish} sx={{ backgroundColor: '#F4A300', mb: 2 }}>
        🙏 {T('許願', 'Make this wish', 'Khấn nguyện', 'อธิษฐานขอพร')}
      </Button>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mb: 2 }}>{notice}</Alert>}

      {pending.length > 0 && (
        <>
          <Divider sx={{ mb: 1.5 }} />
          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            {T('尚未還願', 'Not yet fulfilled', 'Chưa tạ lễ', 'ยังไม่ได้แก้บน')} ({pending.length})
          </Typography>
          {pending.map((w) => (
            <Paper key={w.id} variant="outlined" sx={{ p: 1.5, mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Chip label={catLabel(w.category)} size="small" />
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  {new Date(w.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              {w.wish_text && <Typography sx={{ mb: 1 }}>{w.wish_text}</Typography>}
              {fulfillingId !== w.id ? (
                <Button size="small" variant="outlined" onClick={() => setFulfillingId(w.id)}>
                  {T('標記還願', 'Mark as fulfilled', 'Đánh dấu đã tạ lễ', 'ทำเครื่องหมายแก้บน')}
                </Button>
              ) : (
                <Box sx={{ mt: 1 }}>
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 1 }}>
                    {T(
                      '心願實現了嗎？可以直接標記完成，或供養花環／大象答謝。',
                      'Did it come true? You can mark it fulfilled directly, or give a garland/elephant offering as thanks.',
                      'Điều ước đã thành hiện thực chưa? Bạn có thể đánh dấu hoàn thành ngay, hoặc cúng dường vòng hoa/voi gỗ để tạ ơn.',
                      'พรสำเร็จแล้วหรือยัง? คุณสามารถทำเครื่องหมายว่าสำเร็จได้เลย หรือถวายพวงมาลัย/ช้างไม้เพื่อแก้บน'
                    )}
                  </Typography>
                  <Grid container spacing={1} sx={{ mb: 1 }}>
                    {OFFERINGS.map((o) => (
                      <Grid size={6} key={o.key}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderColor: offering === o.key ? '#F4A300' : undefined,
                            borderWidth: offering === o.key ? 2 : 1,
                            bgcolor: offering === o.key ? '#FFF6E0' : undefined,
                          }}
                        >
                          <CardActionArea onClick={() => setOffering(o.key)} sx={{ py: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '1.4rem' }}>{o.icon}</Typography>
                            <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>{T(...o.label)}</Typography>
                            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{o.price} π</Typography>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={paying}
                      onClick={() => payOffering(w.id)}
                      sx={{ backgroundColor: '#8B4513', flex: 1 }}
                    >
                      {paying ? <CircularProgress size={18} sx={{ color: 'white' }} /> : `${T('供養還願', 'Give offering', 'Cúng dường tạ lễ', 'ถวายแก้บน')} ${OFFERINGS.find(o=>o.key===offering)?.price} π`}
                    </Button>
                    <Button size="small" onClick={() => fulfilWithoutOffering(w.id)}>
                      {T('直接標記', 'No offering', 'Không cúng dường', 'ไม่ถวาย')}
                    </Button>
                  </Box>
                  <Button size="small" onClick={() => setFulfillingId(null)} sx={{ mt: 0.5 }}>
                    {T('取消', 'Cancel', 'Hủy', 'ยกเลิก')}
                  </Button>
                </Box>
              )}
            </Paper>
          ))}
        </>
      )}

      {fulfilled.length > 0 && (
        <>
          <Divider sx={{ mb: 1.5 }} />
          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            {T('已還願', 'Fulfilled', 'Đã tạ lễ', 'แก้บนแล้ว')} ({fulfilled.length})
          </Typography>
          {fulfilled.map((w) => (
            <Paper key={w.id} variant="outlined" sx={{ p: 1.5, mb: 1, opacity: 0.75 }}>
              <Chip label={catLabel(w.category)} size="small" sx={{ mb: 0.5 }} />
              {w.wish_text && <Typography sx={{ fontSize: '0.95rem' }}>{w.wish_text}</Typography>}
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                ✓ {w.fulfilled_at ? new Date(w.fulfilled_at).toLocaleDateString() : ''}
              </Typography>
            </Paper>
          ))}
        </>
      )}
    </Box>
  );
}
