import ora from "ora";
import template from '../template.json' assert {type:'json'}
import logSymbols from "log-symbols";
import chalk from "chalk";
import {Options,ques,Reset} from '../utils/util.js'
//@ts-ignore
import download from 'download-git-repo'
chalk.level=1
const choices:Reset<typeof template>=Object.keys(template) as any
const opts:Options=[
  {
    name:'template',
    type:'list',
    message:'choice which template to create project',
    choices,
  },
  {
    name:'dirname',
    type:'input',
    message:'please input you project name',
    default:'my-project'
  }
]

export async function create(){
  const res:{template:typeof choices[number],dirname:string}=await ques(opts) as any
  console.log(chalk.blueBright('\n Start creating ... \n'))
  const spinner=ora("Downloading...");
  spinner.start();
  download(`direct:${template[res.template]}`,`./${res.dirname}`,{clone:true},(err:any)=>{
    if(err){
      spinner.fail();
      console.log(chalk.red(logSymbols.error+` Create failed. ${err}`))
      return
    }

    //结束加载图标
    spinner.succeed();
    console.log(chalk.greenBright(logSymbols.success+' Create completed!'))
    console.log(`\n cd ${res.dirname}`)
    console.log('\n npm i \n')
  })
}