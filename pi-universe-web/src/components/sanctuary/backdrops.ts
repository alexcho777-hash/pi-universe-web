/**
 * 每個宗教聖地的「大殿內部」場景圖與「迎賓人群」照片。
 * 以檔名自動對應（import.meta.glob）：
 *   interiors/i_<religion_type>.jpg  → 大殿內部場景（疊在 3D 大殿之上）
 *   crowds/<religion_type>.jpg       → 穿傳統服飾的信眾列隊（歡迎畫面）
 * 新增聖地時只要把同名圖片放進資料夾即可，不必改程式；沒有圖時自動使用預設畫面。
 */
function byName(files: Record<string, string>, strip: RegExp): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(files)) {
    const key = (path.split('/').pop() || '').replace(strip, '');
    out[key] = url;
  }
  return out;
}

const INTERIORS = byName(
  import.meta.glob('../../assets/interiors/i_*.jpg', { eager: true, import: 'default' }) as Record<string, string>,
  /^i_|\.jpg$/g,
);

const CROWDS = byName(
  import.meta.glob('../../assets/crowds/*.jpg', { eager: true, import: 'default' }) as Record<string, string>,
  /\.jpg$/,
);

export function backdropFor(religionType?: string): string | undefined {
  return (religionType && INTERIORS[religionType]) || undefined;
}

/** 每個宗教專屬的「迎賓人群」照片（穿著該宗教傳統服飾的信眾列隊） */
export function crowdFor(religionType?: string): string | undefined {
  return (religionType && CROWDS[religionType]) || undefined;
}
