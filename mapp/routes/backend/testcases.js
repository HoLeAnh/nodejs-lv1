var express = require('express');
var router = express.Router();

const mysql = require('../../database/mysql.js')
const folderView = __path_views + 'pages/testcases/'
const currentMenu = 'testcases'
let currentSubMenu = ''

//List items
router.get('', async (req, res, next) => {
  let testcases = await mysql.queryDB('SELECT tc.id,tc.name,ac.type,tc.token,tc.amount,tc.tx,tc.tx_out_chain,tc.result,tc.create_at,tc.update_at,tc.err_count,tc.tx_is_In_Block,tc.tx_out_chain_success,tc.step FROM testcase as tc inner join action as ac where tc.action = ac.id')
  //console.log('testcases : ' +testcases)

  res.render(`${folderView}list`, {
    testcases,
    currentMenu,
    currentSubMenu: 'list'
    
  })
})

module.exports = router;
