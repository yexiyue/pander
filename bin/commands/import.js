var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { write, getDirname } from '../utils/util.js';
import template from '../template.json' assert { type: 'json' };
import { resolve } from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { promisify } from 'util';
import fs from 'fs';
const readFile = promisify(fs.readFile);
const tmpUrl = resolve(getDirname(import.meta.url), '../template.json');
const inUrl = resolve(process.cwd(), 'template.json');
export function importFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inFile = (yield readFile(inUrl, 'utf-8')).toString();
            const data = JSON.parse(inFile);
            write(tmpUrl, Object.assign(Object.assign({}, template), data));
            console.log(chalk.greenBright('\n', logSymbols.success + ' export template.json successfully!\n'));
            console.log(chalk.greenBright("use 'pander list' to watch templates"));
        }
        catch (error) {
            console.log(chalk.red(logSymbols.error, ` ${error}`));
            console.log(chalk.red('当前目录下并没有template.json文件'));
        }
    });
}
