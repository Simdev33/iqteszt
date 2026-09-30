/**
 * Jogi szövegek egy nyelven. Bekezdésenként egy sztring; a „- ” kezdetű bekezdések felsorolássá állnak össze.
 * Jelölések: *kiemelés*, [szöveg](terms|privacy|subscription), és behelyettesítés:
 * {company} {address} {country} {register} {ico} {dic} {capital} {email} {site}
 * {oneTime} {trial} {monthly} {days}
 */
export type LegalDoc = { title: string; lead: string; sections: { h: string; p: string[] }[] };
export type LegalTexts = { terms: LegalDoc; privacy: LegalDoc };
