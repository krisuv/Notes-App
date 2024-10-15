import { deleteNoteRequest } from '@api/deleteNote.api';
import { linkCssFileForComponent } from '@utils/styles.utils';

export class DeleteNoteDialog extends HTMLElement {
  private cardId: string | null = null;
  private isSubmitting: boolean = false;
  private dialog: HTMLDialogElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <dialog id="delete-dialog">
        <div class="dialog-wrapper">
          <h2>Delete Note</h2>
          <p>Are you sure you want to delete this note?</p>
          <div class="dialog-buttons">
            <button class="primary" id="close-button">Cancel</button>
            <button class="secondary" id="delete-button">Delete</button>
          </div>
        </div>
      </dialog>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.shadowRoot?.append(linkCssFileForComponent('delete-note-dialog'));

    this.dialog = this.shadowRoot?.querySelector(
      '#delete-dialog'
    ) as HTMLDialogElement;
  }

  connectedCallback(): void {
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const closeButton = this.shadowRoot?.querySelector('#close-button');
    const deleteButton = this.shadowRoot?.querySelector('#delete-button');

    closeButton?.addEventListener('click', () => this.closeDialog());
    deleteButton?.addEventListener('click', this.deleteNote.bind(this));
  }

  private async deleteNote(): Promise<void> {
    if (!this.cardId)
      throw new Error('No id provided for the card to be deleted');

    this.isSubmitting = true;
    this.toggleButtonsState();

    try {
      await deleteNoteRequest(this.cardId);

      const cardNote = document.querySelector(
        `card-note[data-id="${this.cardId}"]`
      );
      cardNote?.remove();

      this.isSubmitting = false;
      this.closeDialog();
    } catch (error: unknown) {
      this.isSubmitting = false;
      this.toggleButtonsState();
    }
  }

  public openDialog(cardId: string): void {
    this.cardId = cardId;
    this.dialog?.showModal();
    this.resetDialog();
  }

  private closeDialog(): void {
    this.dialog?.close();
  }

  private toggleButtonsState(): void {
    const closeButton = this.shadowRoot?.querySelector(
      '#close-button'
    ) as HTMLButtonElement;
    const deleteButton = this.shadowRoot?.querySelector(
      '#delete-button'
    ) as HTMLButtonElement;

    if (this.isSubmitting) {
      closeButton.disabled = true;
      deleteButton.disabled = true;
    } else {
      closeButton.disabled = false;
      deleteButton.disabled = false;
    }
  }

  private resetDialog(): void {
    this.isSubmitting = false;
    this.toggleButtonsState();
  }
}

customElements.define('delete-note-dialog', DeleteNoteDialog);
