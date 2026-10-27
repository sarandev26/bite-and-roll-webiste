"use client";

export interface GlobalFrameItem {
  globalIndex: number;
  chapterId: "burger" | "wrap" | "drink" | "bag";
  chapterIndex: number;
  dir: string;
  frameNumber: number;
  url: string;
  isPriority: boolean;
}

export interface ChapterBoundary {
  id: "burger" | "wrap" | "drink" | "bag";
  name: string;
  startIndex: number;
  count: number;
  endIndex: number;
}

export const CHAPTER_BOUNDARIES: ChapterBoundary[] = [
  { id: "burger", name: "BURGER", startIndex: 0, count: 120, endIndex: 119 },
  { id: "wrap", name: "WRAP", startIndex: 120, count: 119, endIndex: 238 },
  { id: "drink", name: "DRINK", startIndex: 239, count: 119, endIndex: 357 },
  { id: "bag", name: "BAG", startIndex: 358, count: 119, endIndex: 476 },
];

export const GLOBAL_FRAMES: GlobalFrameItem[] = [];

function buildGlobalFrames() {
  let gIdx = 0;

  // 1. Burger (1..120) - ALL 120 are priority
  for (let i = 1; i <= 120; i++) {
    const pad = String(i).padStart(6, "0");
    GLOBAL_FRAMES.push({
      globalIndex: gIdx++,
      chapterId: "burger",
      chapterIndex: 0,
      dir: "burger",
      frameNumber: i,
      url: `/frames/burger/frame_${pad}.webp`,
      isPriority: true,
    });
  }

  // 2. Wrap (2..120) - First 40 are priority
  for (let i = 2; i <= 120; i++) {
    const pad = String(i).padStart(6, "0");
    const frameOffset = i - 2;
    GLOBAL_FRAMES.push({
      globalIndex: gIdx++,
      chapterId: "wrap",
      chapterIndex: 1,
      dir: "wrap",
      frameNumber: i,
      url: `/frames/wrap/frame_${pad}.webp`,
      isPriority: frameOffset < 40,
    });
  }

  // 3. Drink (2..120) - First 40 are priority
  for (let i = 2; i <= 120; i++) {
    const pad = String(i).padStart(6, "0");
    const frameOffset = i - 2;
    GLOBAL_FRAMES.push({
      globalIndex: gIdx++,
      chapterId: "drink",
      chapterIndex: 2,
      dir: "drink",
      frameNumber: i,
      url: `/frames/drink/frame_${pad}.webp`,
      isPriority: frameOffset < 40,
    });
  }

  // 4. Bag (2..120) - First 40 are priority
  for (let i = 2; i <= 120; i++) {
    const pad = String(i).padStart(6, "0");
    const frameOffset = i - 2;
    GLOBAL_FRAMES.push({
      globalIndex: gIdx++,
      chapterId: "bag",
      chapterIndex: 3,
      dir: "bag",
      frameNumber: i,
      url: `/frames/bag/frame_${pad}.webp`,
      isPriority: frameOffset < 40,
    });
  }
}

buildGlobalFrames();

export const TOTAL_GLOBAL_FRAMES = GLOBAL_FRAMES.length; // 477
export const PRIORITY_COUNT = GLOBAL_FRAMES.filter((f) => f.isPriority).length; // 240

export type DecodedFrame = ImageBitmap | HTMLImageElement;

// Raw fetched image blobs/elements
const frameBlobs: (Blob | HTMLImageElement | null)[] = new Array(TOTAL_GLOBAL_FRAMES).fill(null);

// LRU Decoded Bitmaps cache (bounded window)
const decodedCache = new Map<number, DecodedFrame>();
const MAX_CACHE_SIZE = 140;

// Callbacks waiting specifically for frame 0
const frame0Listeners: ((frame: DecodedFrame) => void)[] = [];

export function onFrame0Ready(cb: (frame: DecodedFrame) => void) {
  if (decodedCache.has(0)) {
    cb(decodedCache.get(0)!);
  } else {
    frame0Listeners.push(cb);
  }
}

export function isFrame0Ready(): boolean {
  return decodedCache.has(0);
}

// Track highest contiguous frame starting from index 0
let highestContiguousIndex = -1;

function updateContiguousIndex() {
  while (
    highestContiguousIndex + 1 < TOTAL_GLOBAL_FRAMES &&
    frameBlobs[highestContiguousIndex + 1] !== null
  ) {
    highestContiguousIndex++;
  }
}

export function getDecodedFrame(targetIndex: number): DecodedFrame | null {
  // If frame 0 is requested and ready, return immediately
  if (targetIndex === 0 && decodedCache.has(0)) {
    return decodedCache.get(0)!;
  }

  // Clamp target index to highest contiguous loaded frame to prevent skipping
  const maxAvailable = Math.max(0, highestContiguousIndex);
  const clamped = Math.max(0, Math.min(maxAvailable, Math.min(TOTAL_GLOBAL_FRAMES - 1, targetIndex)));

  // If in decoded cache, return immediately
  if (decodedCache.has(clamped)) {
    scheduleLazyDecodeWindow(clamped);
    return decodedCache.get(clamped)!;
  }

  // Fallback: search backwards for nearest cached frame
  for (let i = clamped - 1; i >= 0; i--) {
    if (decodedCache.has(i)) {
      scheduleLazyDecode(clamped);
      return decodedCache.get(i)!;
    }
  }

  // Or search forwards within loaded limit
  for (let i = clamped + 1; i <= maxAvailable; i++) {
    if (decodedCache.has(i)) {
      scheduleLazyDecode(clamped);
      return decodedCache.get(i)!;
    }
  }

  scheduleLazyDecode(clamped);
  return null;
}

const decodingIndices = new Set<number>();

function scheduleLazyDecode(index: number) {
  if (index < 0 || index >= TOTAL_GLOBAL_FRAMES) return;
  if (decodedCache.has(index) || decodingIndices.has(index)) return;

  const blobOrImg = frameBlobs[index];
  if (!blobOrImg) return;

  if (blobOrImg instanceof HTMLImageElement) {
    decodedCache.set(index, blobOrImg);
    if (index === 0) {
      frame0Listeners.forEach((cb) => cb(blobOrImg));
      frame0Listeners.length = 0;
    }
    return;
  }

  decodingIndices.add(index);

  if (typeof window !== "undefined" && "createImageBitmap" in window) {
    createImageBitmap(blobOrImg)
      .then((bitmap) => {
        decodedCache.set(index, bitmap);
        decodingIndices.delete(index);
        if (index === 0) {
          frame0Listeners.forEach((cb) => cb(bitmap));
          frame0Listeners.length = 0;
        }
        evictFarCache(index);
      })
      .catch(() => {
        decodingIndices.delete(index);
      });
  }
}

function scheduleLazyDecodeWindow(centerIdx: number) {
  const start = Math.max(0, centerIdx - 20);
  const end = Math.min(TOTAL_GLOBAL_FRAMES - 1, centerIdx + 60);

  for (let i = start; i <= end; i++) {
    if (!decodedCache.has(i) && frameBlobs[i] !== null && !decodingIndices.has(i)) {
      scheduleLazyDecode(i);
    }
  }
}

function evictFarCache(currentIdx: number) {
  if (decodedCache.size <= MAX_CACHE_SIZE) return;

  let farthestKey = -1;
  let maxDist = -1;

  for (const key of decodedCache.keys()) {
    // Never evict frame 0 (the initial exploded burger frame)
    if (key === 0) continue;

    const dist = Math.abs(key - currentIdx);
    if (dist > maxDist) {
      maxDist = dist;
      farthestKey = key;
    }
  }

  if (farthestKey !== -1) {
    const old = decodedCache.get(farthestKey);
    if (old && "close" in old) {
      (old as ImageBitmap).close();
    }
    decodedCache.delete(farthestKey);
  }
}

export type PreloadProgressCallback = (
  percent: number,
  loadedCount: number,
  totalCount: number
) => void;

let preloadStarted = false;

/**
 * Fast Priority Loader:
 * - 8 concurrent requests
 * - Priority queue: All Chapter 1 (120), then first 40 of Ch 2, 3, 4 (120) = 240 priority frames
 * - GUARANTEES frame 0 is fetched AND decoded before resolution
 * - Resolves immediately when priority set finishes (progress = 100%)
 * - Remaining frames continue downloading quietly in background
 */
export async function preloadAllFrames(
  onProgress?: PreloadProgressCallback
): Promise<void> {
  if (preloadStarted && highestContiguousIndex >= PRIORITY_COUNT - 1 && decodedCache.has(0)) {
    if (onProgress) onProgress(100, PRIORITY_COUNT, PRIORITY_COUNT);
    return;
  }
  preloadStarted = true;

  // Ensure Frame 0 is explicitly prioritized first
  const priorityQueue = GLOBAL_FRAMES.filter((f) => f.isPriority);
  const backgroundQueue = GLOBAL_FRAMES.filter((f) => !f.isPriority);
  const queue = [...priorityQueue, ...backgroundQueue];

  let priorityLoaded = 0;
  let priorityResolved = false;

  return new Promise<void>((resolve) => {
    const concurrency = 8;

    const checkResolve = () => {
      // Must have finished priority set AND decoded frame 0
      if (!priorityResolved && priorityLoaded >= PRIORITY_COUNT && decodedCache.has(0)) {
        priorityResolved = true;
        if (onProgress) onProgress(100, PRIORITY_COUNT, PRIORITY_COUNT);
        resolve();
      }
    };

    const worker = async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) break;

        try {
          if (typeof window !== "undefined" && "createImageBitmap" in window) {
            const res = await fetch(item.url, { cache: "force-cache" });
            if (res.ok) {
              const blob = await res.blob();
              frameBlobs[item.globalIndex] = blob;

              // Immediately decode the first 30 frames of Chapter 1 including Frame 0
              if (item.globalIndex < 30) {
                const bmp = await createImageBitmap(blob);
                decodedCache.set(item.globalIndex, bmp);
                if (item.globalIndex === 0) {
                  frame0Listeners.forEach((cb) => cb(bmp));
                  frame0Listeners.length = 0;
                }
              }
            }
          } else {
            await new Promise<void>((imgResolve) => {
              const img = new Image();
              img.src = item.url;
              img.decoding = "async";
              img.onload = () => {
                frameBlobs[item.globalIndex] = img;
                decodedCache.set(item.globalIndex, img);
                if (item.globalIndex === 0) {
                  frame0Listeners.forEach((cb) => cb(img));
                  frame0Listeners.length = 0;
                }
                imgResolve();
              };
              img.onerror = () => {
                imgResolve();
              };
            });
          }
        } catch {
          // Continue on network errors
        }

        updateContiguousIndex();

        if (item.isPriority) {
          priorityLoaded++;
          if (onProgress) {
            const pct = Math.min(100, Math.round((priorityLoaded / PRIORITY_COUNT) * 100));
            onProgress(pct, priorityLoaded, PRIORITY_COUNT);
          }
          checkResolve();
        }
      }

      // If priority queue finished, ensure frame 0 is decoded then resolve
      if (!priorityResolved) {
        if (!decodedCache.has(0) && frameBlobs[0]) {
          scheduleLazyDecode(0);
        }
        checkResolve();
        // Fallback resolve if somehow priority count reached
        if (priorityLoaded >= PRIORITY_COUNT) {
          priorityResolved = true;
          resolve();
        }
      }
    };

    const workers: Promise<void>[] = [];
    for (let i = 0; i < concurrency; i++) {
      workers.push(worker());
    }
  });
}
