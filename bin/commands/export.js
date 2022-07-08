import template from '../template.json' assert { type: 'json' };
import { write } from '../utils/util.js';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { resolve } from 'path';
export function outFile() {
    const url = resolve(process.cwd(), 'template.json');
    write(url, template);
    console.log(chalk.greenBright('\n', logSymbols.success + ' export template.json successfully!'));
}
