import { render } from './tools/vanillaHooks.js';

import App from './components/App.js';

const global = render(App, document.querySelector("#root"));

// global.instance.countSetter();
// global.instance.countSetter();
// global.instance.countSetter();
 global.instance.wordSetter('Yooo!');
// global.instance.wordSetter('Sup foo!');
