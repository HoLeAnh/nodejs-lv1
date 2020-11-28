var express = require('express');
var router = express.Router();

const paramsHelpers = require(__path_helpers + 'params');
const featuresModel = require(__path_schemas + 'features')
const projectsModel = require(__path_schemas + 'projects')
const folderView = __path_views + 'pages/features/'
let currentMenu = 'features'

//List items
router.get('', async (req, res, next) => {
  let projectQuery = ''

  //get project query, if not exist get fist project item 
  const projects = await projectsModel.find().lean()
  projectQuery = paramsHelpers.getParam(req.query, 'project', projects[0].name)

  //get project ID querry for condition select list feature by project
  const projectQueryList = await projectsModel.find({ name: projectQuery }).lean()
  let projectIDQuery = projectQueryList[0]._id

  //get list feature by projectID and join with list project
  const features = await featuresModel.find({ project_id: projectIDQuery }).populate('project_id').lean()
  res.render(`${folderView}list`, {
    features,
    currentMenu,
    currentSubMenu:'list',
    projects,
    projectQuery
  })
})

module.exports = router;
