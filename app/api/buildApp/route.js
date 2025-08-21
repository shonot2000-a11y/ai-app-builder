import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const res = await fetch(
      "https://api-inference.huggingface.co/models/bigcode/starcoder",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Create a simple HTML + JavaScript app based on this request:\n${prompt}\nReturn only raw HTML with inline JS.`,
        }),
      }
    );

    const data = await res.json();

    console.log("HF Response:", data); // נבדוק בלוג מה באמת חוזר

    // חלק מהמודלים מחזירים ישירות מחרוזת ולא מערך
    let code = "";
    if (Array.isArray(data) && data[0]?.generated_text) {
      code = data[0].generated_text;
    } else if (data.generated_text) {
      code = data.generated_text;
    } else if (typeof data === "string") {
      code = data;
    }

    if (!code) {
      return NextResponse.json(
        { error: "לא התקבלה תשובה מהמודל", raw: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ code });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "שגיאה בשרת", details: err.message }, { status: 500 });
  }
}
