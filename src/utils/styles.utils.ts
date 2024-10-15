/**
 * The function creates a `<link>` element for linking a CSS file to a component.
 * @param {string} fileName - The `fileName` parameter is a string that represents the name of the CSS
 * file that you want to link to your component.
 * @returns An HTMLLinkElement element with the specified attributes for linking a CSS file.
 */
export function linkCssFileForComponent(fileName: string): HTMLLinkElement {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', `../../public/styles/${fileName}.css`);

  return link;
}
