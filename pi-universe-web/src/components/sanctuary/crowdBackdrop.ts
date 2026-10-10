/**
 * 各宗教專屬的迎接人群照片：數百位信眾在燭光中沿走道兩側列隊迎來，
 * 每個宗教用自己的場景（佛寺皂隊、教堂詩班、清真寺噴泉、神社表參道…）。
 */
import buddhist from '../../assets/crowds/buddhist.jpg';
import christian from '../../assets/crowds/christian.jpg';
import catholic from '../../assets/crowds/catholic.jpg';
import islamic from '../../assets/crowds/islamic.jpg';
import shinto from '../../assets/crowds/shinto.jpg';
import hindu from '../../assets/crowds/hindu.jpg';
import taiwanFolk from '../../assets/crowds/taiwan_folk.jpg';
import thaiFourFace from '../../assets/crowds/thai_four_face.jpg';
import vietnameseFolk from '../../assets/crowds/vietnamese_folk.jpg';
import tibetanBuddhist from '../../assets/crowds/tibetan_buddhist.jpg';
import mongolShaman from '../../assets/crowds/mongol_shaman.jpg';
import theravada from '../../assets/crowds/theravada.jpg';
import orthodox from '../../assets/crowds/orthodox.jpg';

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

export function crowdFor(religionType?: string): string | undefined {
  return (religionType && MAP[religionType]) || undefined;
}
