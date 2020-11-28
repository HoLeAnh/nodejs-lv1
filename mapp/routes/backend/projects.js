var express = require('express');
var router = express.Router();

const itemsModel = require(__path_schemas + 'projects')
const folderView = __path_views + 'pages/projects/'
let currentMenu = 'projects'

//List items
router.get('', async (req, res, next) => {
  const projects = await itemsModel.find().lean()
  
  res.render(`${folderView}list`, {
    projects,
    currentMenu,
    currentSubMenu:'list',
  })
})

module.exports = router;
