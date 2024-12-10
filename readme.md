## online-bank

### Project Dependencies

Built on [koa](https://koajs.com) and [react](https://reactjs.org), it supports [mysql](https://www.npmjs.com/package/mysql) and [redis](https://www.npmjs.com/package/redis) queries and depends on the [Node.js](https://nodejs.org) environment.

### Project Repository

https://github.com/meizikeai/online-bank.git

### Project Structure

| directory    | describe          | details |
| ------------ | ----------------- | ------- |
| client       | react.js          | --      |
| pm2          | pm2.keymetrics.io | --      |
| public       | koa-static        | --      |
| server       | koa.js            | --      |
| views        | koa-views         | --      |
| package.json | package.json      | --      |

### Development Environment

```sh
$ git clone https://github.com/meizikeai/online-bank.git
$ cd online-bank && npm i
$ npm run start
```

Development depends on [eslint.org](https://eslint.org), please use an editor that supports it. [Visual Studio Code](https://code.visualstudio.com) is recommended.

### Access Example

+ http://127.0.0.1:3000
+ http://127.0.0.1:3000/admin
+ http://127.0.0.1:3000/login

### Precautions

The latest version uses the `ECMAScript Modules` mode. The previous `CommonJS` mode is not recommended (see branch 2024).

### Notes

此项目为论文《147272_网上银行管理系统的设计与实现》的实践（毕设），仅供学习交流。

+ 本实例依赖**MySQL**进行开发（linux），安装见 https://dev.mysql.com/downloads/mysql。
+ 本实例与数据库的配置，见 **server/config/release-mysql.ts / test-mysql.ts** 文件。本实例支持**Redis**，但实例未使用，具体也见此条提到的配置文件。
+ 本实例使用到的数据，见 **server/config/sql.sql** 文件，有已存档的创建表及插入初始数据的sql语句。
+ 本实例使用公共变量，见 **server/config/env.ts** 文件，包括鉴权使用到的token密钥、加密密码用的密钥，默认密码提示等。
+ 本实例默认帐号为 admin@bank.com / test@bank.com，默认密码为 bank@123 。
