import { MouseEvent } from "react";
import { BlockProps } from "../types/block-props.type";

export const Block = ({ block, clickBlock }: BlockProps) => {
  return (
    <div
      id={`block-ref-${block}`}
      key={block}
      onClick={(e: MouseEvent) => {
      e.preventDefault();
      clickBlock(block);
    }} className="block"></div>
  )
}