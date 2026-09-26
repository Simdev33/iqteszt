import { normCdf } from "./norms";

/** Az IQ-skála sávjai a haranggörbéhez, népességi arányokkal. */
export const SCALE_BANDS = [
  { a: 55, b: 70, label: "Nagyon alacsony", range: "< 70", color: "#ff7d4d", desc: "Valódi megítéléséhez szakember által felvett, standardizált vizsgálat szükséges – egy online teszt erre nem alkalmas." },
  { a: 70, b: 80, label: "Alacsony", range: "70–79", color: "#ff9a6b", desc: "Online tesztnél ide sokszor a fáradtság, a figyelem hiánya vagy a nyelvi akadály is lehúzza az eredményt." },
  { a: 80, b: 90, label: "Átlag alatti", range: "80–89", color: "#ffb98f", desc: "Az átlagnál valamivel lassabb elvont gondolkodás – a mindennapi élethez bőven elegendő tartomány." },
  { a: 90, b: 110, label: "Átlagos", range: "90–109", color: "#ffcf5c", desc: "Ide tartozik a népesség fele: ez a „normál” tartomány, kiegyensúlyozott gondolkodási profillal." },
  { a: 110, b: 120, label: "Átlag feletti", range: "110–119", color: "#b3a8ff", desc: "Gyors mintázatfelismerés és jó munkamemória – az új szabályok hamar átláthatók." },
  { a: 120, b: 130, label: "Magas", range: "120–129", color: "#8b7bff", desc: "A több szabályt egyszerre követő, összetett feladatok is jól mennek." },
  { a: 130, b: 145, label: "Kiemelkedő", range: "130+", color: "#45e3c4", desc: "A népesség kb. 2%-a. Az elvont szabályok gyors és megbízható felismerése, bonyolult helyzetekben is." },
].map((band) => {
  const lo = band.a === 55 ? -Infinity : (band.a - 100) / 15;
  const hi = band.b === 145 ? Infinity : (band.b - 100) / 15;
  const share = (normCdf(hi) - normCdf(lo)) * 100;
  return { ...band, share };
});
