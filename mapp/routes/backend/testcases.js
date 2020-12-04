var express = require('express');
var router = express.Router();
const mysql = require('../../database/mysql.js')

const folderView = __path_views + 'pages/testcases/'
const currentMenu = 'testcases'
let currentSubMenu = ''

//List items
router.get('', async(req, res, next) => {
    //let querryString = 'SELECT tc.id,tc.name,ac.type,tc.token,tc.amount,tc.tx,tc.tx_out_chain,tc.result,tc.create_at,tc.update_at,tc.err_count,tc.tx_is_In_Block,tc.tx_out_chain_success,tc.step FROM testcase as tc inner join action as ac where tc.action = ac.id'
    let querryString = `select tc.id,tc.name,act.type,tc.token,tc.amount,tc.tx,tc.tx_out_chain,tc.result,tc.create_at,tc.update_at,tc.err_count,tc.tx_is_In_Block,tc.tx_out_chain_success,tc.step,
    tc.send_PRV_balance,tc.send_token_balance,tc.receive_PRV_balance,tc.receive_token_balance,tc.after_send_PRV_balance,tc.after_send_token_balance,tc.after_receive_PRV_balance,tc.after_receive_token_balance,
  ac1.name as ac1_name,ac1.private_key as ac1_private_key, ac1.address as ac1_address,
  ac2.name as ac2_name,ac2.private_key as ac2_private_key, ac2.address as ac2_address
  from testcase as tc join account as ac1 on tc.send_account = ac1.id 
  join account as ac2 on tc.receive_account = ac2.id
  join action as act on tc.action = act.id`

    let testcases = await mysql.queryDB(querryString)
        //console.log('testcases : ' +testcases)



    res.render(`${folderView}list`, {
        testcases,
        currentMenu,
        currentSubMenu: 'list'

    })
})

module.exports = router;