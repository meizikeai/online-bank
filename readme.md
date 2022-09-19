# online-bank

### 项目构架

基于[koa](https://koajs.com)、[react](https://reactjs.org)构建，支持[mysql](https://www.npmjs.com/package/mysql)、[redis](https://www.npmjs.com/package/redis)查询，依赖[Node.js](https://nodejs.org)环境。

#### 项目地址

https://github.com/meizikeai/online-bank.git

#### 项目结构

| 路径          | 描述                        | 详情 |
|---------------|-----------------------------|------|
| client        | react.js                    | --   |
| pm2           | pm2.keymetrics.io           | --   |
| public        | koa-static                  | --   |
| server        | koa.js / typescriptlang.org | --   |
| views         | koa-views                   | --   |
| package.json  | package.json                | --   |
| tsconfig.json | typescriptlang.org          | --   |

#### 开发环境

  + 克隆项目 - `$ git clone https://github.com/meizikeai/online-bank.git`
  + 安装依赖 - `$ cd online-bank && npm i`
  + 启动项目 - `$ npm run start`

开发依赖[eslint.org](https://eslint.org)，请使用支持它的编辑器。推荐[Visual Studio Code](https://code.visualstudio.com)编辑器。

#### 数据相关

  + 本实例使用**MySQL**进行开发（默认Mac环境），安装见 https://dev.mysql.com/downloads/mysql。
  + 本实例与数据库的配置，见 **与 server/config/release-mysql.ts / test-mysql.ts** 文件。本实例支持**Redis**，但实例未使用，具体也见此条提到的配置文件。
  + 本实例使用到的表，见 **server/config/sql.sql** 文件，有已存档的创建表及插入初始数据的sql语句。
  + 本实例使用公共变量，见 **server/config/env.ts** 文件，包括鉴权使用到的token密钥、加密密码用的密钥，默认密码提示等。
  + 默认帐号 admin@bank.com / test@bank.com 默认密码 bank@123

#### 访问地址

  + http://127.0.0.1:3000
  + http://127.0.0.1:3000/admin
  + http://127.0.0.1:3000/login
