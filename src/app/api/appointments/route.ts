import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export interface Appointment {
  id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  patient: string;
  category: {
    label: string;
    color: string;
  };
  notes: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let q = supabase
    .from("appointments")
    .select(
      "id, title, start, end, location, patient, category (label,color), notes"
    )
    .order("start", { ascending: true });

  if (searchParams.has("category"))
    q = q.eq("category", searchParams.get("category")!);
  if (searchParams.has("patient"))
    q = q.eq("patient", searchParams.get("patient")!);
  if (searchParams.has("start")) q = q.gte("start", searchParams.get("start")!);
  if (searchParams.has("end")) q = q.lte("end", searchParams.get("end")!);

  const { data, error } = await q;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("appointments")
    .insert(body)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
