import { toHTML } from "../tools/toHTML.js";

const Counter = (count, setCount) => {
  const incrementHandler = ()=>setCount(1);
  const decrementHandler = ()=>setCount(-1);

  const render = () => {
    const htmlFragment = toHTML(`<div>
    <span>Count ${count}</span>
    <div><button class='increment-btn'>+</button><button class='decrement-btn'>-</button></div>`);

    htmlFragment.querySelector(".increment-btn").addEventListener("click", incrementHandler);
    htmlFragment.querySelector(".decrement-btn").addEventListener("click", decrementHandler);

    return htmlFragment;
  }

  return { render }
};

export default Counter;