// Optional CSS Highlight API: no markup changes, so vocabulary buttons keep focus.
type HighlightWindow = Window & {
  Highlight?: new (...ranges: Range[]) => unknown;
};
type HighlightCSS = typeof CSS & {
  highlights?: {
    set: (name: string, value: unknown) => void;
    delete: (name: string) => void;
  };
};
export function clearSpeechHighlight() {
  if (typeof CSS !== "undefined")
    (CSS as HighlightCSS).highlights?.delete("spoken-word");
}
export function paragraphSpeech(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const positions: { node: Node; offset: number }[] = [];
  let text = "";
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const value = node.textContent ?? "";
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (/\s/.test(char)) {
        if (!text || text.endsWith(" ")) continue;
        text += " ";
      } else {
        text += char;
      }
      positions.push({ node, offset: i });
    }
  }
  text = text.trimEnd();
  return {
    text,
    highlight: (index: number, length: number) => {
      const Highlight = (window as HighlightWindow).Highlight;
      const registry = (CSS as HighlightCSS).highlights;
      if (!Highlight || !registry) return;
      const start = positions[index];
      const wordLength =
        length > 0
          ? length
          : (text.slice(index).match(/^\S+/)?.[0].length ?? 1);
      const end = positions[Math.min(index + wordLength, text.length) - 1];
      if (!start || !end) return;
      const range = document.createRange();
      range.setStart(start.node, start.offset);
      range.setEnd(end.node, end.offset + 1);
      registry.set("spoken-word", new Highlight(range));
    },
  };
}
