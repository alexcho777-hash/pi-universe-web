/**
 * Announcement board / message wall (公告欄與留言板), one per religion.
 *
 * Official announcements (posted with an admin key) are pinned at the top and
 * expire on their own. Visitor messages are kept for 7 days and then removed
 * automatically. Anyone can report a message; it is hidden once enough people
 * have reported it. Posting a message needs the visitor to be logged in.
 */

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiClient } from '../../api/ApiClient';
import { Lang } from '../../i18n/i18n';
import { useAuthStore } from '../../stores/authStore';

type TR = (zh: string, en: string) => string;

interface Post {
  id: number;
  author_name: string;
  content: string;
  is_official: boolean;
  is_mine?: boolean;
  created_at: string;
  expires_at?: string | null;
}

function timeAgo(iso: string, lang: Lang): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(0, Math.round(diffMs / 60000));
  if (mins < 1) return lang === 'en' ? 'just now' : '剛剛';
  if (mins < 60) return lang === 'en' ? `${mins} min ago` : `${mins} 分鐘前`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return lang === 'en' ? `${hours} h ago` : `${hours} 小時前`;
  const days = Math.round(hours / 24);
  return lang === 'en' ? `${days} d ago` : `${days} 天前`;
}

export function BoardPanel({ religionType, tr, lang }: { religionType: string; tr: TR; lang: Lang }) {
  const { isAuthenticated } = useAuthStore();
  const [official, setOfficial] = useState<Post[]>([]);
  const [messages, setMessages] = useState<Post[]>([]);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [postedToday, setPostedToday] = useState(0);
  const [maxLen, setMaxLen] = useState(200);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [reportedIds, setReportedIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pu-board-reported') || '[]');
    } catch {
      return [];
    }
  });

  const load = async () => {
    setLoading(true);
    const res: any = await apiClient.getBoard(religionType);
    if (res.success) {
      setOfficial(res.data.official || []);
      setMessages(res.data.messages || []);
      setDailyLimit(res.data.daily_limit ?? 5);
      setPostedToday(res.data.posted_today ?? 0);
      setMaxLen(res.data.message_max_len ?? 200);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [religionType]);

  const submit = async () => {
    const content = draft.trim();
    if (!content) return;
    setPosting(true);
    setError('');
    const res: any = await apiClient.postBoardMessage(religionType, content);
    setPosting(false);
    if (res.success) {
      setDraft('');
      setNotice(tr('留言已發布', 'Message posted'));
      setPostedToday((n) => n + 1);
      setMessages((list) => [{ ...res.data, is_mine: true }, ...list]);
    } else {
      setError(res.error || tr('發布失敗，請再試一次', 'Failed to post, please try again'));
    }
  };

  const report = async (id: number) => {
    if (reportedIds.includes(id)) return;
    const res: any = await apiClient.reportBoardPost(id);
    if (res.success) {
      const next = [...reportedIds, id];
      setReportedIds(next);
      try {
        localStorage.setItem('pu-board-reported', JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      setNotice(tr('已收到您的檢舉，感謝您協助維護留言板', 'Thanks — your report has been recorded'));
    }
  };

  const remove = async (id: number) => {
    const res: any = await apiClient.deleteBoardPost(id);
    if (res.success) {
      setMessages((list) => list.filter((m) => m.id !== id));
    }
  };

  const reachedLimit = postedToday >= dailyLimit;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{tr('公告欄與留言板', 'Announcements & message wall')}</Typography>

      {loading ? (
        <Typography sx={{ color: 'text.secondary' }}>{tr('載入中…', 'Loading…')}</Typography>
      ) : (
        <>
          {official.length === 0 && messages.length === 0 && (
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              {tr('目前還沒有公告或留言，來留下第一則吧。', 'No announcements or messages yet — be the first.')}
            </Typography>
          )}

          {official.map((p) => (
            <Paper key={p.id} sx={{ p: 1.6, mb: 1, bgcolor: '#FFF6DD', border: '1px solid #F4C152' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4 }}>
                <PushPinIcon sx={{ fontSize: '1.1rem', color: '#B8860B' }} />
                <Chip label={tr('官方公告', 'Official')} size="small" sx={{ bgcolor: '#5B2A93', color: '#fff', fontWeight: 700 }} />
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', ml: 'auto' }}>{timeAgo(p.created_at, lang)}</Typography>
              </Box>
              <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: '1.02rem' }}>{p.content}</Typography>
            </Paper>
          ))}

          {messages.map((p) => (
            <Paper key={p.id} sx={{ p: 1.6, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.author_name}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>· {timeAgo(p.created_at, lang)}</Typography>
                <Box sx={{ ml: 'auto', display: 'flex', gap: 0.25 }}>
                  {p.is_mine ? (
                    <IconButton size="small" aria-label={tr('刪除', 'Delete')} onClick={() => remove(p.id)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      aria-label={tr('檢舉', 'Report')}
                      onClick={() => report(p.id)}
                      disabled={reportedIds.includes(p.id)}
                      sx={{ color: reportedIds.includes(p.id) ? '#C62828' : undefined }}
                    >
                      <FlagOutlinedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: '1.02rem' }}>{p.content}</Typography>
            </Paper>
          ))}
        </>
      )}

      {notice && (
        <Alert severity="success" sx={{ mt: 1, mb: 1 }} onClose={() => setNotice('')}>
          {notice}
        </Alert>
      )}

      <Paper sx={{ p: 1.6, mt: 1.5 }}>
        {!isAuthenticated ? (
          <Typography sx={{ color: 'text.secondary' }}>{tr('登入後即可留言', 'Log in to post a message')}</Typography>
        ) : (
          <>
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder={tr('留下一句話……', 'Leave a message…')}
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, maxLen))}
              disabled={posting || reachedLimit}
              helperText={`${draft.length} / ${maxLen}`}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
            {reachedLimit ? (
              <Alert severity="info" sx={{ mt: 1 }}>
                {tr(`今天留言已達上限（${dailyLimit} 則），請明天再來`, `You've reached today's limit (${dailyLimit} messages) — come back tomorrow`)}
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                  {tr(`今天還可留言 ${dailyLimit - postedToday} 次`, `${dailyLimit - postedToday} messages left today`)}
                </Typography>
                <Button variant="contained" onClick={submit} disabled={!draft.trim() || posting}>
                  {tr('發布', 'Post')}
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
      <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.75 }}>
        {tr('留言會保留 7 天後自動清除。', 'Messages are kept for 7 days, then removed automatically.')}
      </Typography>
    </Box>
  );
}
