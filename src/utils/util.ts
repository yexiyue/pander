import inquirer from "inquirer"
import fs from 'fs'
import Table from 'cli-table'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
//处理字符串两边空格
export function trim(str:string){
  return str.trim()
}
//询问方法
export type Options=inquirer.QuestionCollection<inquirer.Answers>
export async function ques(opts:Options){
  const answer=await inquirer.prompt(opts)
  return answer
}
//写入文件
export type TmpData={
  [key:PropertyKey]:string
}
export function write(url:string,data:TmpData){
  const str=JSON.stringify(data,null,'\t')
  fs.writeFileSync(url,str,'utf-8')
}
//打印表格
const table=new Table({
  head:['name','url'],
  style:{
    head:['green'],
    border:['yellow'],
  }
})
export function showTable(tempList:Record<string,string>){
  const list=Object.entries(tempList)
  if(list.length>0){
    table.push(...list)
    console.log(table.toString())
    process.exit()
  }else{
    console.log(table.toString())
    process.exit()
  }
}

export function getDirname(url:string){
  return dirname(fileURLToPath(url))
}