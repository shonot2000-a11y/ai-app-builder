import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2", // אפשר לשנות מודל
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();
    return NextResponse.json({ result: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
