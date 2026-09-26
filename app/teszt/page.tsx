import type { Metadata } from "next";
import TestRunner from "@/components/test/TestRunner";
import { publicSlots } from "@/lib/questions";

export const metadata: Metadata = {
  title: "IQ-teszt kitöltése",
  description: "30 feladat mintázatfelismerésből, számsorokból, verbális és logikai gondolkodásból. Időkorlát nélkül, azonnali eredménnyel.",
};

export default function TestPage() {
  // A böngésző csak a kérdéseket kapja meg – a helyes válaszok és a pontozás a szerveren maradnak.
  return <TestRunner slots={publicSlots()} />;
}
