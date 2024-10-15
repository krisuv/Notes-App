import { CardNote } from '@frontend-types/notes.types';
import { mockFetch } from '@mocks/api.mocks';
import { getFormattedDate } from '@utils/date.utils';
import { v4 as uuidv4 } from 'uuid';

type CreateNoteRequestBody = Pick<CardNote, 'title' | 'content'>;

export async function createNoteRequest(
  body: CreateNoteRequestBody
): Promise<CardNote> {
  const response = await mockFetch(
    `${import.meta.env.API_PATH}/notes`,
    'POST',
    body
  );

  if (!response.data) {
    throw new Error('Response lacks required data');
  }

  return {
    title: response.data.title,
    content: response.data.content,
    id: uuidv4(),
    createdDate: getFormattedDate(new Date())
  };
}
