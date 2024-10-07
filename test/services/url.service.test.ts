// import { describe, it, expect, vi } from 'vitest';
// import * as Firestore from "@google-cloud/firestore";
// // import { getShortUrl } from '../../src/services/url.service';
// // import { db } from '../../src/clients/firestore.client';
// // import { responseDecorator } from '../../src/utils';

// // vi.mock('../../src/clients/firestore.client');
// // vi.mock('../../src/utils');

// describe('getShortUrl', () => {
//   type FakeFirestore = { onSnapshot(this: void): void }

//   // Mock the import:
//   vi.mock("@google-cloud/firestore", async (getModule) => {
//     const original: FakeFirestore = await getModule();

//     return {
//       ...original,
//       onSnapshot: vi.fn().mockImplementation(original.onSnapshot),
//     }
//   });

//   it('should retrieve a short URL successfully', async () => {
//     const onSnapshot = vi.spyOn(Firestore, 'DocumentReference');
//     expect(onSnapshot).toHaveBeenCalled();
//   });
//   // const collectionMock = {
//   //   where: vi.fn().mockReturnThis(),
//   //   get: vi.fn(),
//   //   doc: vi.fn().mockReturnThis(),
//   //   update: vi.fn(),
//   // };

//   // const documentMock = {
//   //   empty: false,
//   //   docs: [
//   //     {
//   //       id: 'test-id',
//   //       data: vi.fn().mockReturnValue({
//   //         url: 'https://example.com',
//   //         shortCode: 'abc123',
//   //         createdAt: '2023-01-01T00:00:00.000Z',
//   //         updatedAt: '2023-01-01T00:00:00.000Z',
//   //         accessCount: 0,
//   //       }),
//   //     },
//   //   ],
//   // };
//   // vi.fn().mockImplementation(Firestore.CollectionReference);
//   // vi.spyOn(Firestore, 'FieldValue', 'get').mockReturnValue(1);
//   // const onSnapshot = vi.spyOn(Firestore, 'CollectionReference');
//   // onSnapshot.mockImplementation(() => {
//   //   return collectionMock;
//   // });
//   // expect(onSnapshot).toHaveBeenCalled()
//   // db.collection.mockReturnValue(collectionMock);
//   // responseDecorator.mockImplementation((data) => data);

//   // it('should retrieve a short URL successfully', async () => {
//   //   collectionMock.get.mockResolvedValue(documentMock);

//   //   const result = await getShortUrl('abc123');

//   //   expect(collectionMock.where).toHaveBeenCalledWith('shortCode', '==', 'abc123');
//   //   expect(collectionMock.get).toHaveBeenCalled();
//   //   expect(collectionMock.doc).toHaveBeenCalledWith('test-id');
//   //   expect(collectionMock.update).toHaveBeenCalledWith({ accessCount: 1 });
//   //   expect(result).toEqual({
//   //     url: 'https://example.com',
//   //     shortCode: 'abc123',
//   //     createdAt: '2023-01-01T00:00:00.000Z',
//   //     updatedAt: '2023-01-01T00:00:00.000Z',
//   //   });
//   // });

//   // it('should throw an error if short URL is not found', async () => {
//   //   collectionMock.get.mockResolvedValue({ empty: true });

//   //   await expect(getShortUrl('nonexistent')).rejects.toThrow('Short URL not found');

//   //   expect(collectionMock.where).toHaveBeenCalledWith('shortCode', '==', 'nonexistent');
//   //   expect(collectionMock.get).toHaveBeenCalled();
//   // });
// });