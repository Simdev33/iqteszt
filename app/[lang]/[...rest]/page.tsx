import { notFound } from "next/navigation";

/** Minden ismeretlen cím a nyelvi szegmensen belül: a lokalizált 404-es oldal jelenik meg. */
export default function CatchAll() {
  notFound();
}
