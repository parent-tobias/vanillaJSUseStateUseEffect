const VanillaHooks = (()=>{
  let global = {};
  let index = 0;

  const render = (Component, DOMRoot) => {
    global.DOMRoot = DOMRoot;
    global.Component = Component;
    const instance = Component();
    index = 0;
    global.DOMRoot.firstChild?.remove();
    global.DOMRoot.append(instance.render() );
    global.instance = instance;
    return global;
  }

  const useState = (initialValue) => {
    if(!global){
      throw new Error("Need a global storage");
    }
    global.hooks = global.hooks || [];

    const hooks = global.hooks;
    const currentState = global.hooks[index] || initialValue;
    hooks[index] = currentState; // memoization
    // firstrender = true;

    const setState = (()=>{
      // save the index inside the closure
      let currentIndex = index;
      return (value)=>{
        global.hooks[currentIndex] = value;
        // any time we update, we re-render.
        render(global.Component, global.DOMRoot);
      };
    })();
    index += 1;
    return [currentState, setState]
  }

  const useEffect = (fn, dependencyArr=[])=>{
    const hooks = global.hooks;

    // getting older dependencies from the hooks
    //  we will also store dependencies in a subarray
    let oldDeps = hooks[index];

    // if no dependencies are provided,
    // the callback will be run each 
    let hasChanged = true;

    if(oldDeps){
      // update hasChanged as needed
      hasChanged = dependencyArr.some( (d, index)=> !Object.is(d, oldDeps[index]))
    }

    if(hasChanged) fn();
    hooks[index] = dependencyArr;
    index += 1;
  }

  return { render, useState, useEffect}
})()

export default VanillaHooks;