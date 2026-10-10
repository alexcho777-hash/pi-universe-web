/**
 * 眾神聖像圖（AI 生成、逐格裁切而成，attach 到每尊神明）。
 * DeityStatue 找得到生成圖（src/assets/deities/<key>.jpg）就用圖；找不到 fallback 原本的手繪 SVG。
 * 之後生成新神像只要丟檔案進 assets/deities/，元件這邊零改動。
 */
const files = import.meta.glob('../../assets/deities/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const MAP: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const key = (path.split('/').pop() || '').replace(/\.jpg$/, '');
  MAP[key] = url;
}

export function deityArtFor(deityKey?: string): string | undefined {
  return (deityKey && MAP[deityKey]) || undefined;
}
