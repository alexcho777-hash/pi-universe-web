/**
 * 越南民間信仰 — 財神爺 (Thần Tài) home-altar content. Incense and offerings reuse the
 * generic HomeAltar panels; this file adds the two Thần Tài-specific pieces: a short
 * explanation, and a countdown to Thần Tài's Day (lunar 1/10 — the day people
 * traditionally buy gold for luck).
 */

import { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useI18n } from '../../i18n/i18n';
import { daysBetween, nextAnniversary } from '../../faith/homeAltar';

type TR4 = (zh: string, en: string, vi: string, th: string) => string;

/** 財神爺聖誕：農曆正月初十 (lunar 1/10) — the day many people also buy gold. */
export function ThanTaiDayPanel() {
  const { tr4 } = useI18n();
  const T = tr4 as TR4;
  const date = useMemo(() => nextAnniversary(1, 10, 'lunar'), []);
  const days = daysBetween(new Date(), date);
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {T(
          '財神爺聖誕為農曆正月初十，許多人習慣在這天買金、祈求財運。',
          "Thần Tài's Day falls on the 10th day of the 1st lunar month — many people also buy gold that day for good fortune.",
          'Ngày vía Thần Tài là mùng 10 tháng Giêng âm lịch — nhiều người cũng mua vàng vào ngày này để cầu may mắn.',
          'วันเทศกาลเทพเจ้าแห่งโชคลาภ (ทานไท่) ตรงกับวันขึ้น 10 ค่ำ เดือน 1 ตามปฏิทินจันทรคติ หลายคนนิยมซื้อทองในวันนี้เพื่อความเป็นสิริมงคล'
        )}
      </Typography>
      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: days === 0 ? '#FFF6DD' : undefined }}>
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
          {T('距離財神爺聖誕', "Until Thần Tài's Day", 'Còn lại đến ngày vía Thần Tài', 'นับถอยหลังถึงวันเทพเจ้าแห่งโชคลาภ')}
        </Typography>
        <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: days === 0 ? '#C62828' : '#B8860B' }}>
          {days === 0
            ? T('就是今天', 'Today', 'Hôm nay', 'วันนี้')
            : T(`還有 ${days} 天`, `${days} day(s) left`, `Còn ${days} ngày`, `เหลืออีก ${days} วัน`)}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {T('農曆正月初十', 'Lunar 1/10', 'Mùng 10 tháng Giêng âm lịch', 'ขึ้น 10 ค่ำ เดือน 1')}
        </Typography>
      </Paper>
    </Box>
  );
}

/** 認識財神爺：簡介 Thần Tài - Ông Địa 的家中供奉習俗。 */
export function ThanTaiInfoPanel() {
  const { tr4 } = useI18n();
  const T = tr4 as TR4;
  return (
    <Box sx={{ py: 1 }}>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {T(
          '財神爺（Thần Tài）與土地公（Ông Địa）是越南家庭與商家最常供奉的一對神明，通常供奉在家中或店面靠近門口的矮神桌，象徵迎財入門。',
          'Thần Tài (God of Wealth) and Ông Địa (the Earth God) are the pair most Vietnamese homes and shops keep at a low altar near the entrance — inviting fortune in through the door.',
          'Thần Tài và Ông Địa là cặp thần được thờ phổ biến nhất trong các gia đình và cửa hàng Việt Nam, thường đặt trên bàn thờ thấp gần cửa ra vào, tượng trưng cho việc đón tài lộc vào nhà.',
          'ทานไท่ (เทพเจ้าแห่งโชคลาภ) และองดิ่ก (เทพเจ้าแห่งผืนดิน) เป็นคู่เทพที่บ้านเรือนและร้านค้าชาวเวียดนามนิยมบูชามากที่สุด มักตั้งโต๊ะบูชาเตี้ย ๆ ไว้ใกล้ประตูทางเข้า เพื่อเชิญโชคลาภเข้าบ้าน'
        )}
      </Typography>
      <Paper variant="outlined" sx={{ p: 1.5, mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
          🕐 {T('上香時間', 'When to light incense', 'Thời điểm thắp hương', 'เวลาจุดธูป')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {T(
            '一般在清晨與傍晚各上香一次，出門營業前上香尤其常見。',
            'Typically once in the early morning and once in the evening — many light incense before opening for business.',
            'Thường thắp hương một lần vào sáng sớm và một lần vào buổi tối — nhiều người thắp trước khi mở cửa hàng.',
            'โดยทั่วไปจะจุดธูปหนึ่งครั้งตอนเช้าตรู่และอีกครั้งตอนเย็น หลายคนจุดก่อนเปิดร้านค้า'
          )}
        </Typography>
      </Paper>
      <Paper variant="outlined" sx={{ p: 1.5, mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
          🧹 {T('清潔神桌', 'Cleaning the altar', 'Lau dọn bàn thờ', 'การทำความสะอาดโต๊ะบูชา')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {T(
            '習慣上每月最後一天，用柚子葉水或茶葉水擦拭神像與神桌。',
            'By custom the altar and statues are wiped down on the last day of the month, using pomelo-leaf water or tea-leaf water.',
            'Theo tục lệ, vào ngày cuối tháng người ta lau tượng và bàn thờ bằng nước lá bưởi hoặc nước trà.',
            'ตามธรรมเนียม ในวันสุดท้ายของเดือนจะเช็ดทำความสะอาดรูปเคารพและโต๊ะบูชาด้วยน้ำใบส้มโอหรือน้ำชา'
          )}
        </Typography>
      </Paper>
      <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
        {T(
          '※ 各地與各家習俗略有不同，僅供參考。',
          '※ Customs vary by region and family — this is a general guide only.',
          '※ Phong tục có thể khác nhau tùy vùng miền và từng gia đình — nội dung trên chỉ mang tính tham khảo.',
          '※ ธรรมเนียมอาจแตกต่างกันไปตามภูมิภาคและแต่ละครอบครัว ข้อมูลนี้ใช้เพื่อการอ้างอิงเท่านั้น'
        )}
      </Typography>
    </Box>
  );
}
