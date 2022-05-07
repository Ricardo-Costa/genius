function clickBlock(event, blockId) {
  window.sequence.unshift(parseInt(blockId));
  console.log(window.sequence);

  if (
    window.theSequence.length === window.sequence.length &&
    window.theSequence.every((value, index) => value === window.sequence[index])
  ) {
    alert('Parabéns!!');
    document.location.reload(true);
  } else if (
    window.theSequence.length === window.sequence.length
  ) {
    alert('Deu Ruim :[');
    document.location.reload(true);
  }
}
