#!/usr/bin/env node
import { Command } from 'commander';
import { clear } from './commands/clear.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { del } from './commands/delete.js';
import { create } from './commands/create.js';
import { outFile } from './commands/export.js';
import { importFile } from './commands/import.js';
const program = new Command();
program.usage('<command>');
program.version('1.0.0');
program.command('add')
    .description('add a new template （添加一个新模板）')
    .action(() => {
    add();
});
program.command('list')
    .description('list the templates')
    .action(() => {
    list();
});
program.command('clear')
    .description('delete all of the template')
    .action(() => {
    clear();
});
program.command('delete')
    .description('delete template')
    .action(() => {
    del();
});
program.option("-d,--del", "delete template")
    .action(() => {
    del();
});
program.command('create')
    .description('to create a project')
    .action(() => {
    create();
});
program.command('export')
    .description('export you templates into template.json')
    .action(() => {
    outFile();
});
program.command('import')
    .description('import you templates from template.json')
    .action(() => {
    importFile();
});
//这个必须放最后
program.parse(process.argv);
