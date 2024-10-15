import { linkCssFileForComponent } from '@utils/styles.utils';
import { DeleteNoteDialog } from './delete-note-dialog';

class CardNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="notes-card-header">
          <h3></h3>
          <button class="icon-button trashcan">
            <img 
              class="icon notes-card-icon" 
              src="icons/trashcan-icon.svg" 
              alt="delete"
            />
          </button>
          <button class="icon-button edit">
            <img 
              class="icon notes-card-icon" 
              src="icons/edit-icon.svg" 
              alt="edit"
            />
          </button>
        </div>
        <p class="note"></p>
        <time></time>
      `;

    this.shadowRoot?.append(linkCssFileForComponent('card-note'));
    this.shadowRoot?.append(template.content.cloneNode(true));
  }

  connectedCallback(): void {
    this.render();
    this.attachEventListeners();
  }

  static get observedAttributes(): string[] {
    return ['title', 'content', 'date', 'data-id'];
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render(): void {
    const title = this.getAttribute('title') || 'No Title';
    const content = this.getAttribute('content') || 'No Content';
    const date = this.getAttribute('date') || 'Unknown Date';

    const h3 = this.shadowRoot?.querySelector('h3');
    const p = this.shadowRoot?.querySelector('.note');
    const time = this.shadowRoot?.querySelector('time');

    if (h3) h3.textContent = title;
    if (p) p.textContent = content;
    if (time) time.textContent = date;
    time?.setAttribute('datetime', date);
  }

  private attachEventListeners(): void {
    const trashcanButton = this.shadowRoot?.querySelector(
      '.trashcan'
    ) as HTMLButtonElement;

    trashcanButton?.addEventListener(
      'click',
      this.openDeleteNoteDialog.bind(this)
    );
  }

  private openDeleteNoteDialog(): void {
    const cardId = this.getAttribute('data-id');
    if (cardId) {
      let deleteDialog = document.querySelector(
        'delete-note-dialog'
      ) as DeleteNoteDialog;

      if (!deleteDialog) {
        deleteDialog = document.createElement(
          'delete-note-dialog'
        ) as DeleteNoteDialog;
        document.body.appendChild(deleteDialog);
      }

      deleteDialog.openDialog(cardId);

      deleteDialog.addEventListener('close', () => {
        deleteDialog.remove();
      });
    }
  }
}

customElements.define('card-note', CardNote);
