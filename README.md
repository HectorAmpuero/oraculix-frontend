# Oraculix - Frontend

Este repositorio contiene el frontend del proyecto Oraculix, desarrollado con React + Vite, desplegado en Vercel.

## 🔧 Tecnologías

- Vite
- React
- Axios
- React Router DOM
- tsparticles
- dotenv (Vite usa `import.meta.env`)

## 🗂 Estructura

```
/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── public/
├── .env
├── vite.config.js
└── package.json
```

## 🚀 Despliegue en Vercel

### 1. Variables de entorno

Agregar en Vercel → **Project Settings > Environment Variables**:

| Clave               | Valor                                       |
|--------------------|---------------------------------------------|
| `VITE_BACKEND_URL` | https://oraculix-backend.onrender.com       |

> Asegúrate de usar el mismo nombre definido en `.env`

### 2. Ruta de construcción

- Framework: `Vite`
- Directorio raíz: raíz del repo
- Comando de build: `npm run build`
- Output: `dist`

### 3. URL pública

Tu frontend quedará accesible en:  
`https://oraculix-frontend.vercel.app`

## ✅ Buenas prácticas

- Nunca subir `node_modules`
- `.env` debe estar en `.gitignore`
- Usar `npm install` antes de correr `npm run dev`
