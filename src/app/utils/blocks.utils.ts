import { DEFAULT_BG_ACTIVE_COLOR, DEFAULT_BG_DEACTIVE_COLOR } from "../configs";

export const setBlockBackGroundColor = (blockId: number, color: string) => {
  const el = document.getElementById(`block-ref-${blockId}`);
  if (el) el.style.backgroundColor = color;
}
    
export const activeBlock = (blockId: number | undefined) => {
  setBlockBackGroundColor(blockId || 0, DEFAULT_BG_ACTIVE_COLOR);
}
    
export const deactiveBlock = (blockId: number | undefined) => {
  setBlockBackGroundColor(blockId || 0, DEFAULT_BG_DEACTIVE_COLOR);
}