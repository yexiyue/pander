import { ques ,write,Options,getDirname} from "../utils/util.js";
import chalk from "chalk";
import logSymbols from "log-symbols";
import { resolve } from "path";
const tmpUrl=resolve(getDirname(import.meta.url),'../template.json')
const opts:Options={
  name:'confirm',
  type:'confirm',
  message:'are you sure delete all the template?',
}

export async function clear(){
  const res=await ques(opts)
  if(res.confirm){
    write(tmpUrl,{})
    console.log(chalk.greenBright(logSymbols.success+' delete successfully'))
  }else{
    console.log(chalk.yellowBright(logSymbols.info+'cancel clear true'))
  }
}