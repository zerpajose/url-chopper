// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>

// export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>

// export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export interface ShortUrl {
  id: string;
  url: string;
  shortCode: string;
  createdAt?: string;
  updatedAt?: string;
  accessCount?: number;
}

export interface CreateShortUrlInput {
  url: string;
}
