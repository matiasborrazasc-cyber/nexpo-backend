# Despliegue del Backend (API Fair) en DigitalOcean - Ubuntu

Guía paso a paso para instalar la API desde cero en un Droplet Ubuntu de DigitalOcean.

---

## Paso 1: Crear el Droplet en DigitalOcean

1. Entra a [DigitalOcean](https://cloud.digitalocean.com/)
2. **Create** → **Droplets**
3. Configuración sugerida:
   - **Imagen**: Ubuntu 24.04 LTS
   - **Plan**: Basic, $6/mes (1 GB RAM) o superior
   - **Región**: La más cercana a tus usuarios (ej: NYC)
   - **Autenticación**: SSH key (recomendado) o contraseña
4. Crea el Droplet y anota la **IP pública** (ej: `164.92.xxx.xxx`)

---

## Paso 2: Conectarte por SSH

```bash
ssh root@TU_IP_PUBLICA
```

(Reemplaza `TU_IP_PUBLICA` con la IP de tu Droplet)

---

## Paso 3: Actualizar el sistema

```bash
apt update && apt upgrade -y
```

---

## Paso 4: Instalar Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # Debe mostrar v20.x
npm -v
```

---

## Paso 5: Instalar PM2 (gestor de procesos)

PM2 mantiene la API corriendo y la reinicia si falla.

```bash
npm install -g pm2
```

---

## Paso 6: Crear usuario para la app (opcional pero recomendado)

```bash
adduser fair-api
usermod -aG sudo fair-api
su - fair-api
```

(Si prefieres usar root, salta este paso y sigue con `root`)

---

## Paso 7: Crear directorio de la aplicación

```bash
mkdir -p /var/www/fair-api
cd /var/www/fair-api
```

---

## Paso 8: Subir el código

**Opción A: Desde tu máquina local (con SCP)**

En tu Mac/PC (fuera del servidor):

```bash
cd /ruta/a/tu/proyecto/fair/fair
npm run build
scp -r dist package.json package-lock.json .env root@TU_IP_PUBLICA:/var/www/fair-api/
```

(No subas `node_modules` ni archivos `.ts` si ya compilaste)

**Opción B: Con Git**

En el servidor:

```bash
apt install -y git
cd /var/www/fair-api
git clone https://github.com/TU_USUARIO/TU_REPO.git .
cd fair   # si el backend está en una subcarpeta
```

---

## Paso 9: Instalar dependencias y compilar

```bash
cd /var/www/fair-api
npm install --production
```

Si subiste código fuente (TypeScript) en lugar de `dist`:

```bash
npm install
npm run build   # npx tsc
```

---

## Paso 10: Crear archivo .env

```bash
nano .env
```

Pega y ajusta con tus datos de DigitalOcean:

```env
DB_HOST=db-mysql-nyc3-86522-do-user-15130565-0.k.db.ondigitalocean.com
DB_USER=doadmin
DB_PASSWORD=TU_PASSWORD_DE_LA_DB
DB_NAME=defaultdb
DB_PORT=25060
DB_SSL=true
PORT=3000
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

---

## Paso 11: Crear carpeta uploads

La API guarda imágenes en `uploads/`:

```bash
mkdir -p uploads/stands uploads/blog uploads/speakers uploads/events uploads/sponsors uploads/banners uploads/products
chmod -R 755 uploads
```

---

## Paso 12: Probar que arranca

```bash
npm start
```

Deberías ver: `✅ Base de datos conectada correctamente` y `Server is running on port 3000`.

Prueba en otra terminal o desde tu navegador:

```bash
curl http://localhost:3000/api/test
```

Debería responder con un JSON. Detén con `Ctrl+C`.

---

## Paso 13: Configurar PM2 para que corra siempre

```bash
pm2 start dist/app.js --name fair-api
pm2 save
pm2 startup
```

El último comando te dará un comando para copiar y ejecutar (ej: `env PATH=...`). Ejecútalo.

Verifica:

```bash
pm2 status
pm2 logs fair-api
```

---

## Paso 14: Configurar Nginx como proxy reverso (recomendado)

Así la API estará en el puerto 80 y podrás usar un dominio.

```bash
apt install -y nginx
nano /etc/nginx/sites-available/fair-api
```

Pega esto (reemplaza `TU_IP` o `tu-dominio.com`):

```nginx
server {
    listen 80;
    server_name TU_IP_O_DOMINIO;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}
```

Activa el sitio:

```bash
ln -s /etc/nginx/sites-available/fair-api /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## Paso 15: Firewall (opcional)

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## Resumen de comandos útiles

| Acción | Comando |
|--------|---------|
| Ver logs | `pm2 logs fair-api` |
| Reiniciar | `pm2 restart fair-api` |
| Detener | `pm2 stop fair-api` |
| Estado | `pm2 status` |

---

## Actualizar la API después de cambios

```bash
cd /var/www/fair-api
git pull   # si usas Git
npm install --production
npm run build   # si compilas en el servidor
pm2 restart fair-api
```

---

## ⚠️ IMPORTANTE: Usar nexpo-backend (no fair)

Si tu API es **nexpo-backend** (no el backend `fair`), usa estas rutas:

**Desde tu máquina (despliegue manual):**

```bash
cd /Users/wonasportsdev/Desktop/projects/fair/nexpo-backend
npm run build
scp -r dist package.json package-lock.json .env root@64.23.187.211:/var/www/fair-api/
```

**En el servidor (reiniciar):**

```bash
ssh root@64.23.187.211
cd /var/www/fair-api
pm2 restart fair-api
pm2 logs fair-api --lines 50
```

Si el proceso tiene otro nombre, usa `pm2 list` para verlo.

---

## URLs finales

- API: `http://TU_IP/api/...`
- Test: `http://TU_IP/api/test`
- Influencers: `http://TU_IP/influencers/tu-link`
- Uploads: `http://TU_IP/uploads/...`

Si configuras un dominio, reemplaza `TU_IP` por `tu-dominio.com`.
