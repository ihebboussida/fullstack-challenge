import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPA_BASE_URL || "";
const supabaseAnonKey = process.env.SUPA_BASE_API_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
