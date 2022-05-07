const blocks = document.getElementsByClassName("block");

const DEFAULT_INTERVAL = 1500;

const DEFAULT_BG_DEACTIVE_COLOR = "rgba(255, 255, 0, 0.39)";
const DEFAULT_BG_ACTIVE_COLOR = "rgba(155, 155, 37, 0.39)";

function setBlockBackGroundColor(blockId, color) {
  blocks.item(blockId).style.backgroundColor = color;
}

function activeBlock(blockId) {
  setBlockBackGroundColor(blockId, DEFAULT_BG_ACTIVE_COLOR);
}

function deactiveBlock(blockId) {
  setBlockBackGroundColor(blockId, DEFAULT_BG_DEACTIVE_COLOR);
}

let oldItem = null;
const sequence = [ ...window.theSequence ];

const agente = setInterval(() => {

  if (sequence.length) {
    if (!oldItem) {
      oldItem = sequence.pop();
    } else {
      deactiveBlock(oldItem);
      oldItem = sequence.pop();
    }
    activeBlock(oldItem);
  } else if (oldItem) {
    deactiveBlock(oldItem);
  }
  
}, DEFAULT_INTERVAL);

