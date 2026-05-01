// Prepends Vite's BASE_URL so image paths work on GitHub Pages (/HON4130-ePortfolio/)
// and in local dev (/) without any changes to the JSON data.
export function imgSrc(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}