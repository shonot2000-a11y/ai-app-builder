"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        // אם אין משתמש מחובר → מחזירים לדף התחברות
        router.push("/auth");
      }
    };

    getUser();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ברוך הבא!</h1>
      {user && <p>נכנסת עם האימייל: {user.email}</p>}
      <button onClick={logout}>התנתק</button>
    </div>
  );
}
