import { CardNote } from '@frontend-types/notes.types';

/**
 * The function `filterSearchableNotes` filters a list of `CardNote` objects based on a search term
 * provided.
 * @param {CardNote[]} noteList - The `noteList` parameter is an array of `CardNote` objects. Each
 * `CardNote` object typically contains a `title` and `content` property representing the title and
 * content of a note.
 * @param {string} [searchTerm] - The `searchTerm` parameter is a string that represents the term that
 * the user is searching for within the `noteList`. If `searchTerm` is provided, the function will
 * filter the `noteList` to only include notes that have the search term in their title or content. If
 * `search
 * @returns The `filterSearchableNotes` function returns an array of `CardNote` objects that match the
 * search term provided. If no search term is provided, the function returns the original `noteList`
 * array without any filtering.
 */
export function filterSearchableNotes(
  noteList: CardNote[],
  searchTerm?: string
): CardNote[] {
  if (!searchTerm) return noteList;

  const lowerCasedSearchTerm = searchTerm.toLowerCase();

  return noteList.filter(
    note =>
      note.title.toLowerCase().includes(lowerCasedSearchTerm) ||
      note.content.toLowerCase().includes(lowerCasedSearchTerm)
  );
}
