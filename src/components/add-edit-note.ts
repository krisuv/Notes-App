import { createNoteRequest } from '@api/createNote.api';
import { linkCssFileForComponent } from '@utils/styles.utils';

class AddEditNote extends HTMLElement {
  private noteTitle: string = '';
  private noteDescription: string = '';
  private isSubmitting: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="header">
          <h2>Add new note</h2>
          <button class="cancel">Cancel</button>
        </div>
        <input 
          placeholder="Note title" 
          class="default fullwidth" 
          type="text" 
          id="note-title" 
          name="note-title" 
        /> 
        <textarea placeholder="Your note" class="default" rows="10"></textarea> 
        <button class="primary button-save" disabled="true">Save</button>
      `;

    this.shadowRoot?.append(linkCssFileForComponent('add-edit-note'));
    this.shadowRoot?.append(template.content.cloneNode(true));
  }

  private connectedCallback(): void {
    this.attachEventListeners();
  }

  private attributeChangedCallback(
    _name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private disconnectedCallback(): void {
    const addNewNoteButton = document.querySelector('#button-add-new-note');
    addNewNoteButton?.removeAttribute('disabled');
  }

  private render(): void {
    const mode = this.getAttribute('mode') || 'add';
    const h2 = this.shadowRoot?.querySelector('h2.add-new-note');

    if (h2) {
      h2.textContent = mode === 'edit' ? 'Edit note' : 'Add new note';
    }
  }

  static get observedAttributes(): string[] {
    return ['mode'];
  }

  private onChangeTitle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.noteTitle = target.value;
    this.toggleSaveButtonState();
  }

  private onChangeDescription(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.noteDescription = target.value;
    this.toggleSaveButtonState();
  }

  private toggleSaveButtonState(): void {
    const saveButton = this.shadowRoot?.querySelector(
      '.button-save'
    ) as HTMLButtonElement;

    if (
      !this.isSubmitting &&
      this.noteTitle.trim() !== '' &&
      this.noteDescription.trim() !== ''
    ) {
      saveButton.removeAttribute('disabled');
    } else {
      saveButton.setAttribute('disabled', 'true');
    }
  }

  private attachEventListeners(): void {
    const cancelButton = this.shadowRoot?.querySelector('.cancel');
    const saveButton = this.shadowRoot?.querySelector('.button-save');
    const noteTitle = this.shadowRoot?.querySelector(
      '#note-title'
    ) as HTMLInputElement;
    const noteDescription = this.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;

    noteTitle?.addEventListener('input', this.onChangeTitle.bind(this));
    noteDescription?.addEventListener(
      'input',
      this.onChangeDescription.bind(this)
    );

    cancelButton?.addEventListener('click', () => this.cancelNote());
    saveButton?.addEventListener('click', () => this.saveNote());

    noteTitle.focus();
  }

  private async saveNote(): Promise<void> {
    this.isSubmitting = true;
    this.toggleSaveButtonState();

    this.disableInputs(true);

    try {
      const note = await createNoteRequest({
        title: this.noteTitle,
        content: this.noteDescription
      });

      const container = document.querySelector('main');

      if (!container) {
        throw new Error(
          `Cannot create card note for 
          not existing "main" DOM node`
        );
      }

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

      const addNewNoteButton = container.querySelector('#button-add-new-note');

      addNewNoteButton?.parentNode?.insertBefore(
        slot,
        addNewNoteButton.nextSibling
      );

      this.remove();
    } catch (error: unknown) {
      this.isSubmitting = false;
      this.toggleSaveButtonState();
      this.disableInputs(false);
    }
  }

  private disableInputs(disable: boolean): void {
    const noteTitle = this.shadowRoot?.querySelector(
      '#note-title'
    ) as HTMLInputElement;
    const noteDescription = this.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    const cancelButton = this.shadowRoot?.querySelector(
      '.cancel'
    ) as HTMLButtonElement;
    const saveButton = this.shadowRoot?.querySelector(
      '.button-save'
    ) as HTMLButtonElement;

    noteTitle.disabled = disable;
    noteDescription.disabled = disable;
    cancelButton.disabled = disable;
    saveButton.disabled = disable;
  }

  private cancelNote(): void {
    this.remove();
  }
}

customElements.define('add-edit-note', AddEditNote);
