import  inquirer  from 'inquirer';
import {trim,ques} from '../src/utils/util'
jest.mock('inquirer')
describe('测试utils模块',()=>{
  it('utils/trim',()=>{
    expect(trim('   hello world    ')).toMatch('hello world')
  })
  
})