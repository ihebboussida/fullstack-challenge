import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: any) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: any) {
  const {id} = await params
  const body = await request.json();
  const { data, error } = await supabase
    .from("appointments")
    .update(body)
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: any) {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
