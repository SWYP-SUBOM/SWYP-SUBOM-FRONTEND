export const getHighlightedHTML = (text: string, targets: string[]): string => {
  if (!text) return '';
  if (!targets || targets.length === 0) return text.replace(/\n/g, '<br/>');

  let highlighted = text;

  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  targets.forEach((target) => {
    if (!target.trim()) return;

    const sanitizedTarget = escapeRegExp(target.trim()).replace(/\s+/g, '\\s+');
    const regex = new RegExp(`(${sanitizedTarget})`, 'g');

    highlighted = highlighted.replace(
      regex,
      '<span class="text-[#2277ff] font-semibold">$1</span>',
    );
  });

  return highlighted.replace(/\n/g, '<br/>');
};
