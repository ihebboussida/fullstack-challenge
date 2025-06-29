import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export interface CategoryResponseType {
  id: string;
  label: string;
  description: string;
  color: string;
}

export async function GET() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, label, description, color, icon")
    .order("label", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
