import {write,getDirname} from '../utils/util.js'
import template from '../template.json' assert {type:'json'};
import {resolve} from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import {promisify} from 'util'
import fs from 'fs'
const readFile=promisify(fs.readFile)
const tmpUrl=resolve(getDirname(import.meta.url),'../template.json')
const inUrl=resolve(process.cwd(),'template.json')
export async function importFile(){
  try {
    const inFile:string=(await readFile(inUrl,'utf-8')).toString()
    const data=JSON.parse(inFile)
    write(tmpUrl,{
      ...template,
      ...data
    })
    console.log(chalk.greenBright('\n',logSymbols.success + ' export template.json successfully!\n'))
    console.log(chalk.greenBright("use 'tmcli list' to watch templates"))
  } catch (error) {
    console.log(chalk.red(logSymbols.error,` ${error}`))
    console.log(chalk.red('当前目录下并没有template.json文件'))
  }
  
}