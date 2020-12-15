export function textLength(text: string, maxLength: number) {
  return (text.length >= maxLength ? text.substring(0, 20) + '...' : text);
}