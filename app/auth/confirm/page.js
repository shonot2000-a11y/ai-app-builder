"use client";

import { supabase } from "@/lib/supabaseClient";

export default function ConfirmPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        ✅ האימייל שלך אומת בהצלחה!  
        עכשיו תוכל להתחבר.
      </h1>
    </div>
  );
}
