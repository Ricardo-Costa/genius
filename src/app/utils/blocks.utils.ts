import { DEFAULT_BG_ACTIVE_COLOR, DEFAULT_BG_DEACTIVE_COLOR } from "../configs";

export const highlightBlockBackground = (blockId: number, color: string) => {
  const el = document.getElementById(`block-ref-${blockId}`);
  if (el) el.style.boxShadow = color;
}
    
export const activeBlock = (blockId: number | undefined) => {
  highlightBlockBackground(blockId || 0, DEFAULT_BG_ACTIVE_COLOR);
}
    
export const deactiveBlock = (blockId: number | undefined) => {
  highlightBlockBackground(blockId || 0, DEFAULT_BG_DEACTIVE_COLOR);
}