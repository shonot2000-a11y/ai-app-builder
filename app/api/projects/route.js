import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { userId, prompt } = await req.json();

    const { error } = await supabase
      .from("projects")
      .insert({ user_id: userId, prompt });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
