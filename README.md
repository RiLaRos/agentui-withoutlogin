# 🧠 Interfaz Frontend sin Login – Integración con API en Cloud Run

Este proyecto forma parte del taller [**GCP AI Agent Starter Kit**](https://github.com/macespinoza/gcp-ai-agent-starter-kit). Proporciona una interfaz web construida en **Next.js**, lista para integrarse con una API desplegada en **Cloud Run**, sin necesidad de autenticación.

👉 Puedes usar esta base clonándola y conectándola a tu propio repositorio para luego personalizarla.

---

## 🚀 Clonar y reutilizar el proyecto

No es necesario instalar dependencias desde cero. Solo sigue estos pasos:

```bash
# 1. Clona este repositorio
git clone https://github.com/macespinoza/agentui-withoutlogin
cd agentui-withoutlogin

# 2. Elimina la referencia al repositorio original
git remote remove origin
```

---

## 🔗 Configura la conexión con tu API (Cloud Run)

Antes de subir tu versión del proyecto, realiza este cambio:

1. Abre el archivo:

```
src/app/api/agent/route.ts
```

2. Reemplaza la lógica de la URL con la dirección de tu servicio en Cloud Run, por ejemplo:

```ts
const url = `https://tu-api-cloudrun.a.run.app/agent?` +
  new URL(request.url).searchParams.toString();
```

Este cambio permite que tu frontend reenvíe correctamente las peticiones al backend.

---

## 📤 Subir tu repositorio personalizado

Una vez hayas hecho tus modificaciones:

```bash
# 3. Agrega tu propio repositorio remoto
git remote add origin <tu_repo_propio>
git push -u origin main
```

### Para subir cambios futuros:

```bash
git add .
git commit -m "update"
git push
```

---

## 💬 Variables esperadas por la API

En el archivo:

```
src/app/page.tsx
```

La API espera que se envíen las siguientes variables:

- `msg`: mensaje del usuario.
- `idagente`: identificador para mantener el historial conversacional.

Puedes adaptarlas según las necesidades de tu solución.

---

## 📦 Despliegue en Vercel

Este proyecto está preparado para ser desplegado directamente en [Vercel](https://vercel.com/).  
Solo debes configurar la variable de entorno `NEXT_PUBLIC_API_URL` apuntando a tu endpoint de Cloud Run.

---

## 🤝 Conecta conmigo

Gracias por revisar este repositorio.  
Si te interesa colaborar, aprender más o invitarme a dar una charla, puedes escribirme o seguirme en LinkedIn:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Miguel%20Cotrina-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/mcotrina/)

---

## 🙌 Autor

**Miguel Ángel Cotrina Espinoza**
