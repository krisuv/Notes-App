import { getNotesRequest } from '@api/getNotes.api';
import { debounce } from '@utils/api.utilts';
import './components/add-edit-note';
import './components/card-note';
import './components/delete-note-dialog';
import './components/no-notes';

/**
 * Function to add a new note to the DOM
 */
function onAddNewNote(): void {
  const main = document.querySelector('main');
  const addNewNoteButton = document.querySelector('#button-add-new-note');

  if (!main) {
    throw new Error('No main selector');
  }

  if (document.querySelector('add-edit-note')) {
    throw new Error('A form for adding a new note has already been rendered.');
  }

  addNewNoteButton?.setAttribute('disabled', 'true');

  const addEditNote = document.createElement('add-edit-note');

  main.insertBefore(addEditNote, main.childNodes[2]);
}

/**
 * Function to load the list of notes and render them in the DOM
 * @param searchTerm - Optional search term to filter the notes
 */
async function loadNoteList(searchTerm?: string): Promise<void> {
  const notes = await getNotesRequest(searchTerm);
  const main = document.querySelector('main');
  const searchNotesInput = document.querySelector('#search-notes');
  const addNewNoteButton = document.querySelector('#button-add-new-note');
  const noNotesComponent = document.querySelector('no-notes');

  const cardNotes = document.querySelectorAll('card-note');
  cardNotes.forEach(note => note.remove());

  if (noNotesComponent) {
    noNotesComponent.remove();
  }

  if (notes.length === 0) {
    if (addNewNoteButton) {
      addNewNoteButton.remove();
    }

    const noNotes = document.createElement('no-notes');
    main?.appendChild(noNotes);
    return;
  }

  if (!document.querySelector('#button-add-new-note')) {
    const newAddNoteButton = document.createElement('button');
    newAddNoteButton.id = 'button-add-new-note';
    newAddNoteButton.textContent = 'Add New Note';
    newAddNoteButton.classList.add('primary');
    newAddNoteButton.addEventListener('click', _event => onAddNewNote());

    searchNotesInput?.parentNode?.insertBefore(
      newAddNoteButton,
      searchNotesInput.nextSibling
    );
  }

  for (const note of notes) {
    const slot = document.createElement('slot');
    slot.innerHTML = `
      <card-note
        data-id="${note.id}"
        title="${note.title}"
        content="${note.content}"
        date="${note.createdDate}"
      >
      </card-note>
    `;

    main?.appendChild(slot);
  }
}

/**
 * Function to handle the search input and apply debounced search functionality
 */
function attachSearchEvent(): void {
  const searchNotes = document.querySelector('#search-notes');

  const debouncedSearch = debounce(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.trim();

    // Load the note list based on the search term
    await loadNoteList(searchTerm);
  }, 500);

  searchNotes?.addEventListener('input', debouncedSearch);
}

/**
 * Function to attach the event listener to the "Add New Note" button
 */
function attachAddNewNoteEvent(): void {
  const addNewNoteButton = document.querySelector('#button-add-new-note');
  addNewNoteButton?.addEventListener('click', _event => onAddNewNote());
}

/**
 * Main function to initialize the app
 */
function main(): void {
  document.addEventListener('DOMContentLoaded', () => loadNoteList());

  attachAddNewNoteEvent();

  attachSearchEvent();
}

main();
