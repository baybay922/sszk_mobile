const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

// 本地后端项目地址
const localBackEndPathFile = path.resolve(__dirname, "../config/.localBackEndPath.json")

let localBackEndPath = "";


if (!fs.existsSync(localBackEndPathFile)) {
  // 如果没有配置后端项目地址    
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let ask = () => {
    rl.question(chalk.cyan('输入本地MTM系统后端工程中webapp目录的绝对路径:'), answer => {
      answerPath = path.resolve(answer);
      if (fs.existsSync(answerPath) && fs.statSync(answerPath).isDirectory() && answer) {
        fs.writeFileSync(localBackEndPathFile, JSON.stringify({ webapp: answerPath }), { encoding: 'utf8' });
        localBackEndPath = require(localBackEndPathFile);
        rl.close();
      } else {
        ask();
      }
    });
  };
  ask();
} else {
  // 已经配置之后, 直接读取文件
  localBackEndPath = require(localBackEndPathFile);
}

exports.localBackEndPath = localBackEndPath;