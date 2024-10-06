import { ShortUrl } from '../types';

// const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

// export const getEntries = (): DiaryEntry[] => diaries;

// export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
//   const entry = diaries.find(d => d.id === id);
//   if (entry != null) {
//     const { comment, ...restOfDiaries } = entry;
//     return restOfDiaries;
//   }
//   return undefined;
// }

// export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
//   return diaries.map(({ id, date, weather, visibility }) => {
//     return {
//       id,
//       date,
//       weather,
//       visibility
//     }
//   })
// }

export function createShortUrl(shortUrl: ShortUrl) {
  // Add the shortUrl to firestore
  return shortUrl;
}

export function getShortUrl(shortCode: string) {
  // Get the shortUrl from firestore
  return shortCode;
}

export function updateShortUrl(shortCode: string, url: string) {
  // Update the shortUrl in firestore
  return { shortCode, url };
}

export function deleteShortUrl(shortCode: string) {
  // Delete the shortUrl from firestore
  return shortCode;
}

export function getShortUrlStats(shortCode: string) {
  // Get the shortUrl stats from firestore
  return shortCode;
}