// /app/api/events/route.ts
import { NextResponse } from "next/server";

// ⚠️ Replace the gid below with your Events tab GID
const EVENTS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfh_UEP2eK5lSeAtuZ3v91hiICHqiJybnfK530sMl-vYVXyeH6p8q557Ke2Y3sJjnfahDgCOCkG4FW/pub?gid=0&single=true&output=csv";

export async function GET() {
  try {
    const response = await fetch(EVENTS_SHEET_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch Events data");

    const text = await response.text();
    const rows = text.trim().split("\n").map((r) => r.split(","));
    const headers = rows.shift()?.map((h) => h.trim()) || [];

    const data = rows.map((row) =>
      Object.fromEntries(row.map((cell, i) => [headers[i], cell.trim()]))
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load Events" }, { status: 500 });
  }
}
