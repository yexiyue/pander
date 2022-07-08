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
import { write, ques, getDirname } from '../utils/util.js';
import { resolve } from "path";
import chalk from 'chalk';
import logSymbols from 'log-symbols';
const tmpUrl = resolve(getDirname(import.meta.url), '../template.json');
const choices = Object.keys(template);
const opts = {
    name: 'templates',
    type: 'checkbox',
    message: 'choice the templates that which you want to delete',
    choices,
};
export function del() {
    return __awaiter(this, void 0, void 0, function* () {
        if (choices.length == 0) {
            console.log(chalk.yellowBright(logSymbols.info, 'the templates has been empty!'));
            process.exit();
        }
        const res = yield ques(opts);
        //获得剩下的
        const surplus = choices.filter(x => {
            return !res.templates.includes(x);
        });
        //把剩下的保存起来
        const data = {};
        for (let i of surplus) {
            data[i] = template[i];
        }
        //重写回文件
        write(tmpUrl, data);
        console.log(chalk.greenBright(logSymbols.success + ' delete successfully\n'));
        console.log(chalk.greenBright(logSymbols.info + " use 'tmcli list' to show list"));
    });
}
