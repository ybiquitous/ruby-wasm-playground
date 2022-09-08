import fs from "node:fs/promises";
import { DefaultRubyVM } from "ruby-head-wasm-wasi/dist/node.cjs.js"; // TODO: `node.esm.js` is not working...

const main = async () => {
  const binary = await fs.readFile(
    "./node_modules/ruby-head-wasm-wasi/dist/ruby.wasm"
  );
  const module = await WebAssembly.compile(binary);
  const { vm } = await DefaultRubyVM(module);

  vm.printVersion();

  vm.eval(`
    luckiness = ["Lucky", "Unlucky"].sample
    puts "You are #{luckiness}"
  `);
};

main();
