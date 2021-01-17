export function convertInnerHtmlToText(innerHtml: string) {
  return innerHtml
    .replace(/<div>/gi, '<br>')
    .replace(/<\/div>/gi, '')
    .replace(/<br>/gi, '\n')
    .trim();
}
