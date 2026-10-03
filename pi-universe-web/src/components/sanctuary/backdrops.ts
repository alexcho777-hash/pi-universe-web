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

import c_buddhist from '../../assets/crowds/buddhist.jpg';
import c_christian from '../../assets/crowds/christian.jpg';
import c_catholic from '../../assets/crowds/catholic.jpg';
import c_islamic from '../../assets/crowds/islamic.jpg';
import c_shinto from '../../assets/crowds/shinto.jpg';
import c_hindu from '../../assets/crowds/hindu.jpg';
import c_taiwan_folk from '../../assets/crowds/taiwan_folk.jpg';
import c_thai_four_face from '../../assets/crowds/thai_four_face.jpg';
import c_vietnamese_folk from '../../assets/crowds/vietnamese_folk.jpg';

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
};

export function backdropFor(religionType?: string): string | undefined {
  return (religionType && MAP[religionType]) || undefined;
}

const CROWD: Record<string, string> = {
  buddhist: c_buddhist,
  christian: c_christian,
  catholic: c_catholic,
  islamic: c_islamic,
  shinto: c_shinto,
  hindu: c_hindu,
  taiwan_folk: c_taiwan_folk,
  thai_four_face: c_thai_four_face,
  vietnamese_folk: c_vietnamese_folk,
};

/** 每個宗教專屬的「迎賓人群」照片（穿著該宗教傳統服飾的信眾列隊） */
export function crowdFor(religionType?: string): string | undefined {
  return (religionType && CROWD[religionType]) || undefined;
}
