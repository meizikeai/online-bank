import Router from 'koa-router'
import { DefaultState, Context } from 'koa'

import common from '../controllers/common'
import login from '../controllers/login'

import adminWelcome from '../controllers/admin/welcome'
import adminUser from '../controllers/admin/user'
import adminBalance from '../controllers/admin/balance'
import adminTransfer from '../controllers/admin/transfer'
import adminTrading from '../controllers/admin/trading'
import adminPassword from '../controllers/admin/password'

import adminShare from '../controllers/admin/share'

const router = new Router<DefaultState, Context>()

router.get('/login', login.home)
router.post('/api/login', login.login)

router.get('/admin', adminWelcome.welcome)

router.get('/admin/user', adminUser.user)
router.get('/api/admin/user/getinfo', common.auth, adminUser.getInfo)
router.post('/api/admin/user/setinfo', common.auth, adminUser.setInfo)

router.get('/admin/balance', adminBalance.balance)
router.get('/api/admin/balance/getbalance', common.auth, adminBalance.getBalance)

router.get('/admin/transfer', adminTransfer.transfer)
router.post('/api/admin/transfer/settransfer', common.auth, adminTransfer.setTransfer)

router.get('/admin/trading', adminTrading.trading)
router.get('/api/admin/trading/gettrading', common.auth, adminTrading.getTrading)

router.get('/admin/password', adminPassword.password)
router.post('/api/admin/password/change', common.auth, adminPassword.change)

router.get('/api/admin/share/type', common.auth, adminShare.type)

export { router }
