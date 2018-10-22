# sszk_mobile

## 部署

部署测试:

1. 切换到master分支

   ```bash
   git checkout master
   ```

2. 拉取代码

   ```bash
   git pull
   ```

3. 执行编译

   ```bash
   npm run deploy:test
   ```

   编译完成后, 项目里会生成dist文件夹，运维部署这个编译后的目录就好了

4. 执行后端编译

部署预生产和生产

1. 切换到release分支

   ```bash
   git checkout release
   ```

2. 拉取代码

   ```bash
   git pull
   ```

3. 执行编译

   ```bash
   npm run deploy
   ```

   编译完成后,同样在项目里会生成dist目录，运维部署这个目录就好

4. 执行后端编译

> 三生众康前端git仓库

## 项目后端

http地址: (http://118.31.39.243:3000/zengtao/sszk_mobile.git)

git地址: ``

## 本地开发

``` bash
npm run dev
```
