import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("patients")
    .select("id, firstname, lastname")
    .order("lastname", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const clients = data.map((p) => ({
    id: p.id,
    name: `${p.firstname} ${p.lastname}`,
  }));

  return NextResponse.json(clients);
}
