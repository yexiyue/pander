#!/usr/bin/env node
import template  from '../template.json' assert {type:'json'};
import {trim,ques,Options,write,getDirname} from '../utils/util.js'
import {resolve} from 'path'
import { showTable } from '../utils/util.js'
import logSymbols from 'log-symbols'
import chalk from 'chalk'
const tmpUrl=resolve(getDirname(import.meta.url),'../template.json')

const opts:Options=[
  {
    name:'name',
    type:'input',
    message:'请输入模板名称',
    validate:(input:string)=>{
      if(trim(input).length===0){
        return 'name is required'
      }else if((template as any)[input]){
        return 'name han been used'
      }else{
        return true
      }
    }
  },
  {
    name:'url',
    type:'input',
    message:'请输入模板远程仓库地址',
    validate:(input:string)=> {
      if(trim(input).length===0){
        return 'url is required'
      }else{
        return true
      }
    },
  }
]

export async function add(options:Options=opts){
  let {name,url}=await ques(options)
  name=trim(name)
  url=trim(url)
  const data:any={
    ...template,
  }
  data[name]=url.replace(/[\u0000-\u0019]/g, '') // 过滤 unicode 字符
  write(tmpUrl,data)
  console.log('\n')
  console.log(chalk.greenBright(logSymbols.success),chalk.greenBright('Add a template successfully!'))
  console.log(chalk.greenBright('The latest templateList is: \n'))
  showTable(data)
}
