# Portafolio de Loreley Carrillo

Sitio de una sola página con HTML5, CSS3 y JavaScript Vanilla. No requiere compilación, npm ni dependencias de ejecución. Incluye un manifiesto y un Service Worker para consultar el contenido local después de una primera visita con conexión.

## Abrir en local

Para reproducir la ruta de GitHub Pages, sirve la carpeta padre del proyecto:

```powershell
cd C:\Users\LAP\Desktop\lcj
python -m http.server 8000
```

Abre `http://localhost:8000/portafolio-loreley/`.

También funciona cualquier servidor HTTP local. No abras `index.html` con `file://` si quieres probar el Service Worker.

## Qué editar

- **Textos:** `index.html`.
- **Colores y tipografía:** variables en `:root`, al inicio de `styles.css`.
- **Imágenes:** reemplaza los archivos de `assets/images/` conservando los nombres, o actualiza las rutas en `index.html` y en `sw.js`. Ajusta `width` y `height` si cambia la relación de aspecto.
- **Iconos:** `assets/icons/`.
- **Datos del manifiesto:** `manifest.json`.

Si agregas o renombras un recurso local, inclúyelo también en `PRECACHE_URLS` de `sw.js` para que esté disponible sin conexión.

## Actualizar la caché

1. Cambia `CACHE_NAME` en `sw.js`, por ejemplo de `loreley-portfolio-v1` a `loreley-portfolio-v2`.
2. Publica los cambios.
3. Abre el sitio con conexión y recarga una segunda vez para que el nuevo Service Worker tome el control.
4. En DevTools → Application → Cache Storage verifica que exista la versión nueva.

En la activación se eliminan únicamente las cachés anteriores que empiezan con `loreley-portfolio-`. No se tocan cachés de otros proyectos.

## Publicar en GitHub Pages

1. Sube los archivos a la rama `main`.
2. En GitHub: **Settings → Pages → Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta **/ (root)**.
4. Guarda y espera a que termine el despliegue.

URL esperada: `https://loreley100.github.io/portafolio-loreley/`

## Verificar antes de una entrevista

1. Abre la URL publicada con conexión y espera a que cargue por completo.
2. En DevTools → Application → Service Workers confirma que el Service Worker está activado.
3. En Cache Storage confirma que existe `loreley-portfolio-v1` con el HTML, CSS, JS, manifiesto, iconos e imágenes.
4. Activa el modo sin conexión (Network → Offline) y recarga. Deben verse los textos y las imágenes locales.
5. Prueba las anclas, el enlace `mailto:` y los enlaces a GitHub y a la demo de la PWA.

Los enlaces externos no funcionan sin conexión. El contenido local debe haberse cargado antes, al menos una vez, con conexión. La instalación de la PWA es opcional y no hay botón de instalación.

## Notas de contenido

- El caso CENIDET se limita a lo documentado en el informe de estadía. No incluye métricas, control automático, nube ni funcionalidades no confirmadas.
- Los documentos fuente privados (CV e informe) no forman parte del repositorio. La carpeta `sources/` está excluida por `.gitignore`.
- No se incluye un CV descargable. Si más adelante se agrega una versión pública, debe llamarse `cv-publico.pdf` y enlazarse de forma explícita.
- El sitio no usa formularios, analítica, IndexedDB ni Background Sync.

## Estructura

```text
index.html
styles.css
app.js
sw.js
manifest.json
assets/
  icons/
  images/
README.md
.gitignore
```
