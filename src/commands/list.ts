import template from '../template.json' assert {type:'json'};
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import { showTable } from '../utils/util.js'
export function list(){
  if(JSON.stringify(template)!=='{}'){
    console.log('\n')
    console.log(chalk.greenBright('The templateList is: \n'))
    showTable(template)
  }else{
    console.log(chalk.yellowBright(logSymbols.info),chalk.yellowBright('the templates is empty.\n'))
    console.log(chalk.yellowBright("please use 'tmcli add' to add templates"))
  }
}