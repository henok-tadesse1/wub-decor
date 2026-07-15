import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://wub-decor.netlify.app";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const pages = [
  {
    url: `${SITE_URL}/`,
    changefreq: "monthly",
    priority: "1.0"
  }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(resolve(publicDir, "robots.txt"), robots, "utf8");
