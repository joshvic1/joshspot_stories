"use client";
import Link from "next/link";
import { PaperPlaneIcon } from "@radix-ui/react-icons"; // You can replace this with any icon you prefer

export default function FloatingSubmitButton() {
  return (
    <Link href="/submit" className="fab">
      <span className="fab-icon">
        <PaperPlaneIcon width={20} height={20} />
      </span>
    </Link>
  );
}
