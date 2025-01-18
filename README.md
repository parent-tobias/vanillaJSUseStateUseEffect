# Vanilla `useState` and `useEffect`

Over the last few years, there have been folks who have asked me (and interviews in which I was asked) about "how to go about building React hooks with vanilla javascript." This is an exploration of how I implemented the functionality, *but in no way reflects what React does, or what "best practices" look like.* This is just my own maunderings. ymmv.

## First, Understand the Scope

While I implemented an IIFE (a *module pattern*) in `vanillaHooks.js`, it isn't really necessary - as that file is imported it is already an ES6 module, with its own closed scope. And when that file is imported, any top-level code will be parsed and evaluated when the module is imported, which is pretty much exactly what we get from an IIFE. I had implemented this in replit originally, in a single file, so having the IIFE was useful, but in this context it doesn't actually matter.

The point here is, when we do this line:

```js
const { useState, useEffect } = vanillaHooks;
```

we are referencing functions defined *in the context of that module*. What that means is, those are *priviledged* functions. They have access to private variables or properties that we, from the outside, do not. This is key, as we are going to place values into that closed modular scope, and we will want to check *if those values have changed later*.

How can we tell if a thing has "changed"? If it's a primitive value, like a string or a number, it's pretty easy, most javascript engines will coerce and compare primitive values to determine a change. But with non-primitives, arrays or objects, it is a little more difficult.

The issue is that non-primitives are *mutable*, we can change them in-place. An example of that might be sorting an array - if we sort or reverse an array using `.sort()` or `.reverse()`, we are doing so within that original array. So before the mutation and after the mutation, we have no way of knowing:

```js
let nums = [2,3,4,5,6];
let secondNums = nums; // a shared memory reference
// we flip it about,
nums.reverse();
// and we have mutated the shared memory reference for all the things.
console.log( secondNums ); // [6,5,4,3,2]
```
They're the same array. We have no way of knowing if the thing has been changed. But if instead, we treat it as an immutable, and we re-assign a new value each time we change it...

```js
let nums = [2,3,4,5,6];
let secondNums = nums;
// we assign a new thing that is flipped about,
nums = nums.toReversed();
// and we have broken the shared reference, making two different things.
console.log( secondNums ); // [2,3,4,5,6]

```

in that case, we have assigned the `nums` variable to reference a new location in memory. We know explicitly that it has been changed. This is the basis for `useEffect` - if the memory reference for a given 'hook' has changed, then we know the thing itself has changed and we need to re-run the effect.