/**
 * 每個宗教聖地的「大殿內部」場景圖：站在宏偉大殿內、面向神聖焦點。
 * 疊在既有 3D 大殿 Canvas 之上（screen 疊光＋慢推進），讓訪客真的感覺「人站在殿內」，
 * 而不是只看到一條走道。
 */
import buddhist from '../../assets/interiors/i_buddhist.jpg';
import christian from '../../assets/interiors/i_christian.jpg';
import catholic from '../../assets/interiors/i_catholic.jpg';
import islamic from '../../assets/interiors/i_islamic.jpg';
import shinto from '../../assets/interiors/i_shinto.jpg';
import hindu from '../../assets/interiors/i_hindu.jpg';
import taiwanFolk from '../../assets/interiors/i_taiwan_folk.jpg';
import thaiFourFace from '../../assets/interiors/i_thai_four_face.jpg';
import vietnameseFolk from '../../assets/interiors/i_vietnamese_folk.jpg';
import tibetanBuddhist from '../../assets/interiors/i_tibetan_buddhist.jpg';
import mongolShaman from '../../assets/interiors/i_mongol_shaman.jpg';
import theravada from '../../assets/interiors/i_theravada.jpg';
import orthodox from '../../assets/interiors/i_orthodox.jpg';

const MAP: Record<string, string> = {
  buddhist,
  christian,
  catholic,
  islamic,
  shinto,
  hindu,
  taiwan_folk: taiwanFolk,
  thai_four_face: thaiFourFace,
  vietnamese_folk: vietnameseFolk,
  tibetan_buddhist: tibetanBuddhist,
  mongol_shaman: mongolShaman,
  theravada: theravada,
  orthodox: orthodox,
};

export function backdropFor(religionType?: string): string | undefined {
  return (religionType && MAP[religionType]) || undefined;
}
