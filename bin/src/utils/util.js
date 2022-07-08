var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import fs from 'fs';
import Table from 'cli-table';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
//处理字符串两边空格
export function trim(str) {
    return str.trim();
}
export function ques(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt(opts);
        return answer;
    });
}
export function write(url, data) {
    const str = JSON.stringify(data, null, '\t');
    fs.writeFileSync(url, str, 'utf-8');
}
//打印表格
const table = new Table({
    head: ['name', 'url'],
    style: {
        head: ['green'],
        border: ['yellow'],
    }
});
export function showTable(tempList) {
    const list = Object.entries(tempList);
    if (list.length > 0) {
        table.push(...list);
        console.log(table.toString());
        process.exit();
    }
    else {
        console.log(table.toString());
        process.exit();
    }
}
export function getDirname(url) {
    return dirname(fileURLToPath(url));
}
