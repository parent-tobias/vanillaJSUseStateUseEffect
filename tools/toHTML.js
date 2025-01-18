export const toHTML = (str)=>document.createRange()
  .createContextualFragment(
    str.trim()
  ).firstChild;