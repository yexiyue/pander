import template from '../template.json' assert {type:'json'};
import { write ,Options,ques,getDirname,Reset} from '../utils/util.js';
import { resolve } from "path";
import chalk from 'chalk';
import logSymbols from 'log-symbols';
const tmpUrl=resolve(getDirname(import.meta.url),'../template.json')

const choices=Object.keys(template)

const opts:Options={
  name:'templates',
  type:'checkbox',
  message:'choice the templates that which you want to delete',
  choices,
}

export async function del(){
  if(choices.length==0){
    console.log(chalk.yellowBright(logSymbols.info,'the templates has been empty!'))
    process.exit()
  }
  const res:{
    templates:string[]
  }=await ques(opts) as any
  //获得剩下的
  const surplus:Reset<typeof template>=choices.filter(x=>{
    return !res.templates.includes(x) 
  }) as any
  //把剩下的保存起来
  const data:Record<string,string>={}
  for(let i of surplus){
    data[i]=template[i]
  }
  //重写回文件
  write(tmpUrl,data)
  console.log(chalk.greenBright(logSymbols.success+' delete successfully\n'))
  console.log(chalk.greenBright(logSymbols.info+" use 'pander list' to show list" ))
}