import { linkCssFileForComponent } from '@utils/styles.utils';

class NoNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
        <div class="notes-empty">
          <div class="icon-wrapper">
            <img 
              class="icon icon-no-notes" 
              src="public/icons/info-icon.svg" 
              alt="No notes"
            />
          </div>
          <h2>No notes yet</h2>
          <p>Add a note to keep track of your learnings.</p>
          <button class="secondary">
            <img 
              class="icon" 
              src="icons/add-note-icon.svg" 
              alt="Add note icon"
            />
            <span>Add note</span>
          </button>
        </div>
      `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.shadowRoot?.append(linkCssFileForComponent('no-notes'));
  }

  private connectedCallback(): void {
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const addButton = this.shadowRoot?.querySelector('button.secondary');
    addButton?.addEventListener('click', this.renderAddEditNote.bind(this));
  }

  private renderAddEditNote(): void {
    this.remove();

    const addEditNote = document.createElement('add-edit-note');

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.appendChild(addEditNote);
    }
  }
}

customElements.define('no-notes', NoNotes);
