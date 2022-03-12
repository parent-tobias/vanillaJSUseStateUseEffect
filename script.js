import VanillaHooks from './tools/vanillaHooks.js';

import App from './components/App.js';

const { render } = VanillaHooks;

const global = render(App, document.querySelector("#root"));

// global.instance.countSetter();
// global.instance.countSetter();
// global.instance.countSetter();
// global.instance.wordSetter('Yooo!');
// global.instance.wordSetter('Sup foo!');
