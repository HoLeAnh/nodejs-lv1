var express = require('express');
var router = express.Router();

const paramsHelpers = require(__path_helpers + 'params');
const testcasesModel = require(__path_schemas + 'testcases')
const mysql = require('../../database/mysql.js')
const featuresModel = require(__path_schemas + 'features')
const projectsModel = require(__path_schemas + 'projects')
const folderView = __path_views + 'pages/accounts/'
const currentMenu = 'accounts'
let currentSubMenu = ''

//List items
router.get('', async (req, res, next) => {
  let accounts = await mysql.queryDB('SELECT * FROM account')
 // console.log({ accounts })

  res.render(`${folderView}list`, {
    accounts,
    currentMenu,
    currentSubMenu: 'list',

  })
})

module.exports = router;
