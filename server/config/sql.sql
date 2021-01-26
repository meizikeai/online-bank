-- 存放使用到的数据表
-- 共四张表，分别users(用户信息表)、userinfo(用户资料信息表)、balance(帐户信息表)、trading(交易明细表)

-- 表4.2 users - 用户信息表
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `type` int NOT NULL DEFAULT '1' COMMENT '用户类型',
  `status` int NOT NULL DEFAULT '1' COMMENT '帐户状态',
  `cipher` int NOT NULL DEFAULT '1' COMMENT '密码修改提示',
  `salt` varchar(256) NOT NULL DEFAULT '' COMMENT '随机密钥的一半',
  `password` varchar(256) NOT NULL DEFAULT '' COMMENT '用户密码',
  `createtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 1000000 DEFAULT CHARSET = utf8;

-- 给 users 表入插入数据
insert into
  users (
    id,
    name,
    email,
    type,
    status,
    cipher,
    salt,
    password
  )
values
  (
    null,
    '孙悟空',
    'test@bank.com',
    2,
    1,
    1,
    'rhVcYewcGkSv1NbNLz0hrQ==',
    'GXi/3MkfiVxfpRN+zGf7yakS+hewvsq46B7UTIur9UldYxa6M4G78nUwOeS/TOUUVtZwKHgWa2gxLOecVvB46g=='
  );

-- 表4.3 userinfo - 用户资料信息表
CREATE TABLE `userinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `national` varchar(10) NOT NULL DEFAULT '' COMMENT '民族',
  `gender` varchar(10) NOT NULL DEFAULT '' COMMENT '性别',
  `idcard` varchar(18) NOT NULL DEFAULT '' COMMENT '身份证号',
  `phone` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '家庭地址',
  `postcode` varchar(6) NOT NULL DEFAULT '' COMMENT '邮编号',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 给 userinfo 表入插入数据
insert into
  userinfo (
    id,
    email,
    name,
    national,
    gender,
    idcard,
    phone,
    address,
    postcode
  )
values
  (
    null,
    'test@bank.com',
    '孙悟空',
    '汉族',
    '男',
    '11010199812187756',
    '13412345678',
    '北京市朝阳区百子湾路苹果社区B区',
    '100000'
  );

-- 表4.4 balance - 帐户信息表
CREATE TABLE `balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `card` varchar(50) NOT NULL DEFAULT '' COMMENT '银行卡号',
  `money` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '活期存款',
  `earning` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '朝盈宝',
  `financial` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '理财产品',
  `gold` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '黄金活期',
  `available` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '信用卡可用额度',
  `overdraft` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '信用卡透支额度',
  `repayment` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '信用卡应还额度',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 给 balance 表入插入数据
insert into
  balance (
    id,
    email,
    card,
    money,
    earning,
    financial,
    gold,
    available,
    overdraft,
    repayment
  )
values
  (
    null,
    'test@bank.com',
    '9999555599998888',
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00,
    0.00
  );

-- 表4.5 trading - 交易明细表
CREATE TABLE `trading` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `uses` varchar(100) NOT NULL DEFAULT '' COMMENT '产品/消费名称',
  `money` decimal(10, 2) NOT NULL DEFAULT '0.00' COMMENT '消费金额',
  `card` varchar(50) NOT NULL DEFAULT '' COMMENT '交易银行卡号',
  `channel` varchar(50) NOT NULL DEFAULT '' COMMENT '交易渠道',
  `type` varchar(50) NOT NULL DEFAULT '' COMMENT '交易类型',
  `note` varchar(100) NOT NULL DEFAULT '' COMMENT '备注信息',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;