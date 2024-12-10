import Router from 'koa-router'

import common from '../controllers/common.js'
import login from '../controllers/login.js'

import adminWelcome from '../controllers/admin/welcome.js'
import adminUser from '../controllers/admin/user.js'
import adminBalance from '../controllers/admin/balance.js'
import adminTransfer from '../controllers/admin/transfer.js'
import adminTrading from '../controllers/admin/trading.js'
import adminPassword from '../controllers/admin/password.js'

import adminShare from '../controllers/admin/share.js'

const router = new Router()

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

export default router
