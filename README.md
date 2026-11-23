# Jersey Universe

Catálogo demostrativo responsive de jerseys de fútbol. Esta versión conserva los ocho productos del catálogo anterior y añade las seis playeras nuevas.

## Importante: conservar tus imágenes anteriores
Las rutas originales se mantienen sin cambiar:
- `./img/psg-local.png`
- `./img/madrid-local.png`
- `./img/bacerlona-local.png`
- `./img/america-visitante.png`
- `./img/francia.png`

No reemplaces ni borres esos archivos de tu carpeta `img` original. Si ya tienes esa carpeta en tu proyecto, conserva su contenido y copia dentro de ella únicamente las seis imágenes nuevas de este paquete. Los tres productos originales que no tenían fotografía siguen apareciendo con un espacio de imagen pendiente.

## Ejecutar
Abre `index.html` en el navegador o utiliza Live Server en Visual Studio Code.

## Agregar más jerseys
1. Copia la fotografía en `img`.
2. Abre `app.js` y agrega un objeto al arreglo `newProducts`.
3. Escribe una ruta relativa, por ejemplo `image: "./img/mi-playera.png"`.

Cada producto abre una ficha con descripción, características, precio y tallas CH, M, G y XG. El carrito guarda también la talla seleccionada.

## Publicar
Sube `index.html`, `app.js`, `styles.css`, `README.md` y toda la carpeta `img` a GitHub. Para Cloudflare Pages usa preset `None`, sin build command y con la carpeta raíz como directorio de salida.

## Nota
La cuenta, carrito y pedido son demostrativos. No hay autenticación real ni procesamiento de pagos. Los precios y tallas son ejemplos editables.


## Menú Acerca de nosotros y Contactos
El menú superior incluye enlaces a las secciones Acerca de nosotros y Contactos. En Contactos se muestra José Peralta y el correo `Josecrperalta@outlook.com`; al seleccionarlo se abre el programa de correo del visitante mediante un enlace `mailto:`.
El enlace Catálogo se retiró únicamente del menú superior: el catálogo sigue disponible en la página y desde el botón de exploración del inicio.
