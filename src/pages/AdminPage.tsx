/**
 * Admin tools (owner / admin only): preview the special effects without waiting for the
 * daily limits, and (owner only) choose who else is an administrator. Nothing here
 * changes any visitor's data.
 */
import { useEffect, useState } from 'react';
import { Container, Paper, Box, Typography, Button, TextField, Chip, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';
import { apiClient } from '../api/ApiClient';
import { useAdminStore } from '../stores/adminStore';
import { GoldenShovelGift } from '../components/faith/GoldenShovel';
import { WelcomeCeremony } from '../components/sanctuary/Welcome';
import { MoonBlocks, ThrowResult } from '../oracle/OracleArt';
import A2UPanel from '../components/admin/A2UPanel';

const HALLS: [string, string][] = [
  ['buddhist', '佛寺 Buddhist'],
  ['taiwan_folk', '台灣民間 Taiwan folk'],
  ['vietnamese_folk', '越南 Vietnamese'],
  ['thai_four_face', '泰國四面佛 Thai'],
  ['christian', '基督教 Christian'],
  ['catholic', '天主教 Catholic'],
  ['islamic', '伊斯蘭 Islamic'],
  ['shinto', '神道 Shinto'],
  ['hindu', '印度教 Hindu'],
];

export default function AdminPage() {
  const { tr } = useI18n();
  const navigate = useNavigate();
  const role = useAdminStore((s) => s.role);
  const loaded = useAdminStore((s) => s.loaded);
  const [shovel, setShovel] = useState(false);
  const [hall, setHall] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<ThrowResult>('sheng');
  const [toss, setToss] = useState(false);
  const [admins, setAdmins] = useState<{ pi_username: string }[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [max, setMax] = useState(3);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const loadList = async () => {
    const res: any = await apiClient.get('/api/admin/list');
    if (res?.success) {
      setAdmins(res.data.admins || []);
      setOwners(res.data.owners || []);
      if (res.data.max) setMax(res.data.max);
    }
  };

  useEffect(() => {
    if (role) loadList();
  }, [role]);

  if (loaded && !role) {
    return (
      <Container maxWidth="sm" sx={{ pt: 8 }}>
        <Alert severity="info">{tr('此頁僅限管理者。', 'This page is for administrators only.')}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/')}>{tr('回首頁', 'Home')}</Button>
      </Container>
    );
  }
  if (!role) return null;

  const add = async () => {
    setMsg('');
    const res: any = await apiClient.post('/api/admin/add', { username: name });
    if (res?.success) {
      setName('');
      loadList();
    } else setMsg(res?.error || tr('新增失敗', 'Could not add'));
  };
  const remove = async (u: string) => {
    await apiClient.delete(`/api/admin/${encodeURIComponent(u)}`);
    loadList();
  };
  const cast = (r: ThrowResult) => {
    setBlocks(r);
    setToss(true);
    window.setTimeout(() => setToss(false), 1400);
  };

  return (
    <Container maxWidth="md" sx={{ pt: 7, pb: 3 }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 0.5 }}>{tr('管理者工具', 'Admin tools')}</Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {role === 'owner' ? tr('您是擁有者', 'You are the owner') : tr('您是管理者', 'You are an administrator')}
        {tr('・以下預覽不受每日次數限制，也不會改動任何人的資料。', ' · previews ignore the daily limits and change nobody’s data.')}
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1 }}>{tr('金鏟子', 'Golden shovel')}</Typography>
        <Button variant="contained" onClick={() => setShovel(true)}>{tr('預覽金鏟子', 'Preview the shovel')}</Button>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1 }}>{tr('筊杯', 'Moon blocks')}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          <Button variant="outlined" onClick={() => cast('sheng')}>{tr('聖筊', 'Holy')}</Button>
          <Button variant="outlined" onClick={() => cast('xiao')}>{tr('笑筊', 'Laughing')}</Button>
          <Button variant="outlined" onClick={() => cast('yin')}>{tr('陰筊', 'No')}</Button>
        </Box>
        <Box sx={{ bgcolor: '#2a1a10', borderRadius: 2, py: 3 }}>
          <MoonBlocks result={blocks} tossing={toss} />
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1 }}>{tr('迎賓儀式', 'Welcome ceremony')}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          {HALLS.map(([k, label]) => (
            <Button key={k} variant="outlined" sx={{ textTransform: 'none' }} onClick={() => setHall(k)}>{label}</Button>
          ))}
        </Box>
      </Paper>

      <A2UPanel />

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 1 }}>{tr('管理者名單', 'Administrators')}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          {owners.map((o) => <Chip key={o} color="primary" label={`${o} · ${tr('擁有者', 'owner')}`} />)}
          {admins.map((a) => (
            <Chip key={a.pi_username} label={a.pi_username} onDelete={role === 'owner' ? () => remove(a.pi_username) : undefined} />
          ))}
        </Box>
        {owners.length + admins.length >= max ? (
          <Typography sx={{ color: 'text.secondary' }}>{tr(`管理者已滿 ${max} 位，不能再新增。`, `The limit of ${max} administrators has been reached.`)}</Typography>
        ) : role === 'owner' ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder={tr('另一位管理者的 Pi 使用者名稱', 'Pi username of the other administrator')} />
            <Button variant="contained" disabled={!name.trim()} onClick={add}>{tr('新增', 'Add')}</Button>
          </Box>
        ) : (
          <Typography sx={{ color: 'text.secondary' }}>{tr('只有擁有者可以新增或移除管理者。', 'Only the owner can add or remove administrators.')}</Typography>
        )}
        {msg && <Alert severity="error" sx={{ mt: 1 }}>{msg}</Alert>}
      </Paper>

      {shovel && <GoldenShovelGift tr={tr} onClose={() => setShovel(false)} />}
      {hall && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 2000, bgcolor: '#1b120b' }}>
          <WelcomeCeremony key={hall} religionType={hall} onDone={() => setHall(null)} />
        </Box>
      )}
    </Container>
  );
}
