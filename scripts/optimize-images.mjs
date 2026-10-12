// Convertit les images sources (jpg/png) de public/images en WebP allégé,
// et génère l'icône du site + l'image de partage à partir du logo.
// Usage : node scripts/optimize-images.mjs
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const MAX_SIDE = 1800;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    })
  );
  return files.flat();
}

const sources = (await walk(imagesDir)).filter((file) =>
  /\.(jpe?g|png)$/i.test(file)
);

for (const source of sources) {
  const { dir, name } = path.parse(source);
  const target = path.join(dir, `${name.toLowerCase()}.webp`);

  await sharp(source)
    .rotate()
    .resize({
      width: MAX_SIDE,
      height: MAX_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(target);

  const [before, after] = await Promise.all([stat(source), stat(target)]);
  console.log(
    `${path.relative(root, target)}  ${Math.round(before.size / 1024)} Ko -> ${Math.round(after.size / 1024)} Ko`
  );
}

// Icônes et image de partage
const logo = path.join(imagesDir, "logo.webp");

// Version détourée du logo : tout ce qui entoure le contour blanc de l'autocollant
// (fond noir et halo gris) devient transparent. L'intérieur reste intact.
{
  const size = 900;
  const { data } = await sharp(logo)
    .resize(size, size)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Un pixel « de fond » est sombre ou gris ; le contour blanc et les couleurs vives arrêtent la propagation.
  const isBackground = (pixel) => {
    const r = data[pixel * 3];
    const g = data[pixel * 3 + 1];
    const b = data[pixel * 3 + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return max < 215 && max - min < 45;
  };

  // Remplissage depuis les bords de l'image
  const outside = new Uint8Array(size * size);
  const queue = new Int32Array(size * size);
  let head = 0;
  let tail = 0;

  const visit = (pixel) => {
    if (outside[pixel] || !isBackground(pixel)) return;
    outside[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let i = 0; i < size; i++) {
    visit(i);
    visit((size - 1) * size + i);
    visit(i * size);
    visit(i * size + size - 1);
  }

  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % size;

    if (x > 0) visit(pixel - 1);
    if (x < size - 1) visit(pixel + 1);
    if (pixel >= size) visit(pixel - size);
    if (pixel < size * (size - 1)) visit(pixel + size);
  }

  const mask = Buffer.alloc(size * size);
  for (let i = 0; i < mask.length; i++) mask[i] = outside[i] ? 0 : 255;

  // Léger adoucissement du bord pour éviter l'effet d'escalier
  const alpha = await sharp(mask, { raw: { width: size, height: size, channels: 1 } })
    .blur(1.1)
    .toColourspace("b-w")
    .raw()
    .toBuffer();

  const rgba = Buffer.alloc(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = alpha[i];
  }

  await sharp(rgba, { raw: { width: size, height: size, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 95 })
    .toFile(path.join(imagesDir, "logo-transparent.webp"));
}

await sharp(logo).resize(256, 256).png().toFile(path.join(root, "app", "icon.png"));
await sharp(logo).resize(180, 180).png().toFile(path.join(root, "app", "apple-icon.png"));

const logoForShare = await sharp(logo).resize(630, 630).toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#000000" },
})
  .composite([{ input: logoForShare, gravity: "center" }])
  .jpeg({ quality: 85 })
  .toFile(path.join(root, "app", "opengraph-image.jpg"));

console.log("Icônes et image de partage générées.");
