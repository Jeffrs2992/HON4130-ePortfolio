import manifest from '../data/imageManifest.json'

export function entryPhotos(entryId) {
  const m = manifest[entryId]
  return {
    thumb: m?.thumb ?? null,
    gallery: m?.gallery ?? [],
  }
}