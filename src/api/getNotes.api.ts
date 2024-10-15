import { CardNote } from '@frontend-types/notes.types';
import { mockFetch } from '@mocks/api.mocks';
import { mockNoteList } from '@mocks/notes.mocks';
import { filterSearchableNotes } from '@utils/notes.utils';

export async function getNotesRequest(
  searchTerm?: string
): Promise<CardNote[]> {
  const response = await mockFetch(
    `${import.meta.env.API_PATH}/notes`,
    'GET',
    filterSearchableNotes(mockNoteList, searchTerm)
  );

  if (response.statusCode >= 400 || !response.data) {
    throw new Error('Failed to get your notes');
  }

  return response.data;
}
