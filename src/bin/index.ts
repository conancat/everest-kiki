import { prompt } from './prompt';

import { program } from 'commander';
import { ProgramInputSchema } from './schemas';
import { formatZodError } from '../utils';

program
  .option('-b, --base-cost <number>', 'Base cost')
  .option('-p, --packages-count <number>', 'Packages count')
  .option('-c, --vehicles-count <number>', 'Vehicles count')
  .option('-s, --vehicles-max-speed <number>', 'Vehicles max speed')
  .option('-w, --vehicles-max-weight <number>', 'Vehicles max weight');

async function main() {
  program.parse();

  console.log('Welcome to Kiki Delivery Service!');

  const result = ProgramInputSchema.safeParse(program.opts());

  if (!result.success) {
    const errorMsg = formatZodError(result.error)
      .split(' | ')
      .map((str) => '  * ' + str)
      .join('\n');

    console.log('Error parsing program options:');
    console.log(errorMsg);
    process.exit(1);
  }

  if (result.data) {
    console.log('You have provided the following options:');

    Object.entries(result.data).forEach(([key, value]) => {
      console.log(`  * ${key}: ${value}`);
    });
  }

  const options = await prompt(result.data);
  console.log(options);
}

main();
