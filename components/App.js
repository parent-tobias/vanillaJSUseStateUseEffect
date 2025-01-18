import { toHTML } from '../tools/toHTML.js';
import { useState, useEffect } from '../tools/vanillaHooks.js';
import Counter from './Counter.js'

const App = () => {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState('')

  const countSetter = (value=1) => setCount(count+value);
  const wordSetter = (word) => setWord(word);

  const render = () => {
    const domEl =  toHTML(`<div>
    <div class='count-container'>
    </div>
    <div>word is ${word}</div>`);

  domEl.querySelector(".count-container").append(Counter(count, countSetter).render() )

    return domEl;

  }

  useEffect(()=>{
    console.log(`count is now ${count}, and word is ${word}`);
  }, [count,word]);

  useEffect(()=>{
    console.log(`only fires on startup - but count is ${count} and word is ${word} at start.`);
  }, []);

  return { render, countSetter, wordSetter}
};

export default App;