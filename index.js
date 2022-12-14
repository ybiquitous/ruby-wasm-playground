#!/usr/bin/env -S node --experimental-wasi-unstable-preview1

import fs from "node:fs/promises";
import { DefaultRubyVM } from "ruby-head-wasm-wasi/dist/node.cjs.js"; // TODO: `node.esm.js` is not working...

const binary = await fs.readFile(
  "./node_modules/ruby-head-wasm-wasi/dist/ruby.wasm"
);
const module = await WebAssembly.compile(binary);
const { vm } = await DefaultRubyVM(module);

console.log("");
vm.printVersion();

console.log("");
console.log("-".repeat(30));

let rubyCode = `
    luckiness = ["Lucky", "Unlucky"].sample
    puts "You are #{luckiness}"
  `;
const inputFile = process.argv[2];
if (inputFile) {
  rubyCode = await fs.readFile(inputFile);
}
vm.eval(rubyCode);
