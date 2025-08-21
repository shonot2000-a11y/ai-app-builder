# AI App Builder – Copilot Guide

## מה כבר בנוי
1. פרויקט Next.js 15 עם app router.
2. חיבור ל־Supabase (`/lib/supabaseClient.js`) עבור התחברות/הרשמה.
3. עמוד Auth (`/app/auth/page.js`) עם אימייל + סיסמה.
4. עמוד Home (`/app/page.js`) עם כפתורים לניווט:
   - למחולל אפליקציות (`/builder`)
   - ללוח ניהול (`/admin/dashboard`)
   - להתחברות
   - כפתור התנתקות.
5. שמירת סודות בקובץ `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `HF_API_KEY` (מ־HuggingFace).

## מה המטרה
לבנות מחולל אפליקציות שמאפשר:
- ממשק כמו Bass44: **צ’אט בצד שמאל + תצוגה של האפליקציה שנבנית בצד ימין**.
- המשתמש יכתוב תיאור → HuggingFace או מודל LLM ייצר קוד.
- הקוד ירונדר בתוך iframe בצד ימין.
- הכול יתבצע **בלי עלות** (שימוש בחשבון Supabase חינמי + HuggingFace Inference API חינמי).

## מה צריך להוסיף
1. **עמוד Builder (`/app/builder/page.js`)**:
   - חלוקה ל־2 טורים (Grid):
     - שמאל: צ’אט ל־LLM (היסטוריית הודעות, שליחת prompt).
     - ימין: iframe שמציג את האפליקציה שנבנתה.
   - כפתור "צור קוד" ששולח את ה־prompt ל־API שלנו.

2. **API Route חדש (`/app/api/buildApp/route.js`)**:
   - יקבל `prompt` מהצד לקוח.
   - ישלח את ה־prompt ל־HuggingFace (עם `HF_API_KEY`).
   - יחזיר קוד React (או Next.js Component).
   - הקוד יישמר זמנית בקובץ או בזיכרון (לבדיקה).

3. **Render בצד ימין (iframe)**:
   - אחרי שהמשתמש לוחץ על "צור קוד", לטעון את הקוד המוחזר לתוך iframe.
   - לתת Preview חי.

4. **UI שיפה**:
   - שימוש ב־TailwindCSS ל־Grid layout.
   - חלוקה ברורה בין הצ’אט ל־Preview.

## איך Copilot צריך לעזור
- להציע שינויים בקבצים קיימים.
- לייצר קובצי קוד חדשים כשצריך.
- להדריך איך לחבר את HuggingFace API (POST → `https://api-inference.huggingface.co/models/...`).
- להוסיף אפשרות לשמור ולשתף אפליקציות דרך Supabase בעתיד.

---

💡 טיפ: בכל פעם שאתה רוצה עזרה, כתוב ל־Copilot Chat:
