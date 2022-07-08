#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import template from '../template.json' assert { type: 'json' };
import { trim, ques, write, getDirname } from '../utils/util.js';
import { resolve } from 'path';
import { showTable } from '../utils/util.js';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
const tmpUrl = resolve(getDirname(import.meta.url), '../template.json');
const opts = [
    {
        name: 'name',
        type: 'input',
        message: '请输入模板名称',
        validate: (input) => {
            if (trim(input).length === 0) {
                return 'name is required';
            }
            else if (template[input]) {
                return 'name han been used';
            }
            else {
                return true;
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        message: '请输入模板远程仓库地址',
        validate: (input) => {
            if (trim(input).length === 0) {
                return 'url is required';
            }
            else {
                return true;
            }
        },
    }
];
export function add(options = opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, url } = yield ques(options);
        name = trim(name);
        url = trim(url);
        const data = Object.assign({}, template);
        data[name] = url.replace(/[\u0000-\u0019]/g, ''); // 过滤 unicode 字符
        write(tmpUrl, data);
        console.log('\n');
        console.log(chalk.greenBright(logSymbols.success), chalk.greenBright('Add a template successfully!'));
        console.log(chalk.greenBright('The latest templateList is: \n'));
        showTable(data);
    });
}
