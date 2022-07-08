var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ora from "ora";
import template from '../template.json' assert { type: 'json' };
import logSymbols from "log-symbols";
import chalk from "chalk";
import { ques } from '../utils/util.js';
//@ts-ignore
import download from 'download-git-repo';
chalk.level = 1;
const choices = Object.keys(template);
const opts = [
    {
        name: 'template',
        type: 'list',
        message: 'choice which template to create project',
        choices,
    },
    {
        name: 'dirname',
        type: 'input',
        message: 'please input you project name',
        default: 'my-project'
    }
];
export function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield ques(opts);
        console.log(chalk.blueBright('\n Start creating ... \n'));
        const spinner = ora("Downloading...");
        spinner.start();
        download(`direct:${template[res.template]}`, `./${res.dirname}`, { clone: true }, (err) => {
            if (err) {
                spinner.fail();
                console.log(chalk.red(logSymbols.error + ` Create failed. ${err}`));
                return;
            }
            //结束加载图标
            spinner.succeed();
            console.log(chalk.greenBright(logSymbols.success + ' Create completed!'));
            console.log(`\n cd ${res.dirname}`);
            console.log('\n npm i \n');
        });
    });
}
