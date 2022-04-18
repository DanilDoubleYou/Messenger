const {Router} = require('express')
const router = new Router()
const getAll = require('../controller/servers.js')

router.get('/api/server', getAll)
module.exports = router