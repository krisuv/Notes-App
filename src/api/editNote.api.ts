import { CardNote } from '@frontend-types/notes.types';
import { mockFetch } from '@mocks/api.mocks';

type EditNoteRequestBody = CardNote;

export async function editNoteRequest(
  body: EditNoteRequestBody
): Promise<CardNote> {
  const { id, ...rest } = body;

  const response = await mockFetch(
    `${import.meta.env.API_PATH}/notes${id}`,
    'PUT',
    rest
  );

  if (response.statusCode >= 400) {
    throw new Error(`Failed to edit the note with id "${id}"`);
  }

  if (!response.data) {
    throw new Error(
      `Failed respond with updated data for the note with id "${id}"`
    );
  }

  return {
    id,
    title: response.data.title,
    content: response.data.content,
    createdDate: response.data.createdDate
  };
}
