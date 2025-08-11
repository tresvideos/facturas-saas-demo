# FacturaKit — DEMO v5
- Previsualización PDF en vivo en el editor
- Corrección de overflow de texto en PDF
- Home con imagen, reviews con estrellas y avatares, y FAQ
- Login/Signup con Google (NextAuth) + /login
- Guardado cliente: /editor y /dashboard requieren login (client-side)
- Panel con Preview, Editar, Descargar, Eliminar

## Auth (Google)
En Vercel > Project > Settings > Environment Variables:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET (cualquiera, recomendado `openssl rand -hex 32`)

Callback URL: https://TU_DOMINIO.vercel.app/api/auth/callback/google

