import { mockFetch } from '@mocks/api.mocks';

export async function deleteNoteRequest(noteId: string): Promise<void> {
  const response = await mockFetch(
    `${import.meta.env.API_PATH}/notes/${noteId}`,
    'DELETE'
  );

  if (response.statusCode >= 400) {
    throw new Error(`Failed to delete the note with id "${noteId}"`);
  }
}
