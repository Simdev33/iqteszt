import type { Metadata } from "next";
import TestRunner from "@/components/test/TestRunner";

export const metadata: Metadata = {
  title: "IQ-teszt kitöltése",
  description: "30 feladat mintázatfelismerésből, számsorokból, verbális és logikai gondolkodásból. Időkorlát nélkül, azonnali eredménnyel.",
};

export default function TestPage() {
  return <TestRunner />;
}
