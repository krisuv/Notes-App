# Notes-App
Notes-App is a simple, dynamic web application for managing personal notes. This app allows users to create, view, search, and delete notes directly from the UI. It's built using modern web technologies and is designed to be extended with additional features.

## Table of Contents
1. Features
2. Tech Stack
3. Installation
4. Usage
   
## Features
**Add New Notes**: Easily add notes using the "Add New Note" button, which appears below the search bar.
**Search Notes**: Filter and search notes by typing into the search input field. The search is debounced to improve performance.
**Delete Notes**: Delete individual notes using the trash can icon within each note card.
**Responsive UI**: The layout adapts to different screen sizes and displays.
**Dynamic Rendering**: The UI dynamically updates based on the user's interactions, ensuring a smooth experience.

## Tech Stack
### Frontend:
**TypeScript**: Strongly typed language for building scalable and maintainable code.
**Custom Web Components**: Built using native JavaScript custom elements (add-edit-note, card-note, delete-note-dialog, no-notes).
**Debounce Logic**: For search input, using custom debouncing to improve performance during user interactions.

**Build Tools**:
Vite: To bundle and serve the application during development.

## Installation
Make sure that your node.js version and your package manager are up to date with these used for the development of this app:
1. node.js:  _v20.5.1_
2. pnpm: _v20.5.1_

Run this command:
```bash
pnpm i
```
## Usage
In order to start the application in dev mode, run this commnad:
```bash
pnpm dev
```
