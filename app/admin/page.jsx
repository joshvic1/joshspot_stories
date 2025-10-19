"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div style={{ padding: "50px" }}>
      <h1>Welcome, Admin 👋</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}
