import { prompt } from './prompt';

import { program } from 'commander';

program
  .option('-b, --base-cost <number>', 'Base cost')
  .option('-p, --packages-count <number>', 'Packages count')
  .option('-c, --count <number>', 'Vehicles count')
  .option('-s, --max-speed <number>', 'Vehicles max speed')
  .option('-w, --max-weight <number>', 'Vehicles max weight');

async function main() {
  program.parse();

  const options = program.opts();

  console.log(program.opts());

  const input = await prompt();
  console.log(input);
}

main();
