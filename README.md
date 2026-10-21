# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Supabase: publicaciones

La página de inicio consulta la tabla `publications` y ordena las publicaciones por `published_at` descendente.

1. Copia `.env.example` a `.env.local`.
2. Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con la URL del proyecto y su clave publicable (anon).
3. En Supabase, habilita Row Level Security para `publications` y permite lectura pública para este demo:

```sql
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON public.publications
FOR SELECT
TO anon
USING (true);
```

Reinicia `npm run dev` después de cambiar las variables. No uses una clave `service_role` en el frontend.
