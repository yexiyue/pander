#!/usr/bin/env node
import {Command} from 'commander'
import {clear} from './commands/clear.js'
import {add} from './commands/add.js'
import { list } from './commands/list.js'
import { del } from './commands/delete.js'
const program=new Command()
program.usage('<command>')

program.version('1.0.0')

program.command('add')
  .description('add a new template （添加一个新模板）')
  .action(()=>{
    add()
  })

program.command('list')
  .description('list the templates')
  .action(()=>{
    list()
  })

program.option("-l,--list","alias of list | to list all of template")
  .action(()=>{
    list()
  })

program.command('clear')
  .description('delete all of the template')
  .action(()=>{
    clear()
  })

program.command('delete')
  .description('delete template')
  .action(()=>{
    del()
  })
//这个必须放最后
program.parse(process.argv)