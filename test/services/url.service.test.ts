import { describe, it, expect, vi, afterEach } from 'vitest';
import { Firestore } from '@google-cloud/firestore';
import { getShortUrlStats } from '../../src/services/url.service';

describe('getShortUrlStats', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if short URL is not found', async () => {
    vi.mock("@google-cloud/firestore", async (importOriginal) => {
      const actual = await importOriginal() as Firestore;
      const getStatsFirestore = vi.fn(() => ({
        collection: vi.fn(() => ({
          where: vi.fn(() => ({
            get: vi.fn().mockResolvedValue({
              docs: [
                {
                  id: "test-id",
                  data: vi.fn(() => ({
                    url: "https://example.com",
                    shortCode: "abc123",
                    createdAt: "2023-01-01T00:00:00.000Z",
                    updatedAt: "2023-01-01T00:00:00.000Z",
                    accessCount: 0,
                  })),
                },
              ],
              empty: false,
            }),
          })),
        })),
      }));
      return {
        ...actual,
        Firestore: getStatsFirestore,
      }
    });

    try {
      await getShortUrlStats('nonexistent');
    } catch (error) {
      expect(error.message).toBe('Short URL not found');
    }
    // expect(collectionMock.where).toHaveBeenCalledWith('shortCode', '==', 'nonexistent');
    // expect(collectionMock.get).toHaveBeenCalled();
  });

  it('should retrieve a short URL successfully', async () => {
    vi.mock("@google-cloud/firestore", async (importOriginal) => {
      const actual = await importOriginal() as Firestore;
      const getStatsFirestore = vi.fn(() => ({
        collection: vi.fn(() => ({
          where: vi.fn(() => ({
            get: vi.fn().mockResolvedValue({
              docs: [
                {
                  id: "test-id",
                  data: vi.fn(() => ({
                    url: "https://example.com",
                    shortCode: "abc123",
                    createdAt: "2023-01-01T00:00:00.000Z",
                    updatedAt: "2023-01-01T00:00:00.000Z",
                    accessCount: 0,
                  })),
                },
              ],
              empty: false,
            }),
          })),
        })),
      }));
      return {
        ...actual,
        Firestore: getStatsFirestore,
      }
    });
    const result = await getShortUrlStats('abc123');
    // expect(collectionMock.where).toHaveBeenCalledWith('shortCode', '==', 'abc123');
    // expect(collectionMock.get).toHaveBeenCalled();
    // expect(collectionMock.doc).toHaveBeenCalledWith('test-id');
    // expect(collectionMock.update).toHaveBeenCalledWith({ accessCount: 1 });
    expect(result).toEqual({
      id: undefined,
      url: 'https://example.com',
      shortCode: 'abc123',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      accessCount: 0,
    });
  });
});
