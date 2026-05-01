import { readdirSync, existsSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '../public/images')
const outputPath = join(__dirname, '../src/data/imageManifest.json')

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i
const manifest = {}

if (existsSync(imagesDir)) {
  const dirs = readdirSync(imagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const id of dirs) {
    const dir = join(imagesDir, id)
    const files = readdirSync(dir).filter((f) => IMAGE_RE.test(f))

    const thumbFile = files.find((f) => /^thumb\./i.test(f))
    const thumb = thumbFile ? `/images/${id}/${thumbFile}` : null

    const gallery = files
      .filter((f) => !/^thumb\./i.test(f))
      .sort((a, b) => {
        const na = parseInt(a, 10)
        const nb = parseInt(b, 10)
        return !isNaN(na) && !isNaN(nb) ? na - nb : a.localeCompare(b)
      })
      .map((f) => `/images/${id}/${f}`)

    if (thumb || gallery.length > 0) {
      manifest[id] = { thumb, gallery }
    }
  }
}

writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Image manifest: ${Object.keys(manifest).length} entries`)