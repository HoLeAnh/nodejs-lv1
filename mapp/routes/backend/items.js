var express = require('express');
var router = express.Router();
const util = require('util');

const notify = require(__path_configs + 'notify');
const systemConfig = require(__path_configs + 'system');
const itemsModel = require(__path_schemas + 'features')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers + 'params');
const validatorItems = require(__path_validates + 'items');
const { Mongoose } = require('mongoose');
const linkIndex = '/' + systemConfig.prefixAdmin + '/items';
const folderView = __path_views + 'pages/items/'

//List items
router.get('(/status/:status)?', async (req, res, next) => {
  let objWhere = {}
  let keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  let statusFilter = await utilsHelpers.createFilterStatus(currentStatus)
  let currentPage = paramsHelpers.getParam(req.query, 'page', 1)

  let pagination = {
    totalItems: 0,
    totalItemsPerPage: 4,
    currentPage: 1,
    pageRanges: 3
  }
  pagination.currentPage = parseInt(currentPage)

  if (currentStatus !== 'all') objWhere.status = currentStatus
  if (keyword !== '') objWhere.name = new RegExp(keyword, 'i')

  itemsModel.count(objWhere).then((data) => {
    pagination.totalItems = data
  })

  await itemsModel.find(objWhere)
    .skip((pagination.currentPage - 1) * pagination.totalItemsPerPage)
    .limit(pagination.totalItemsPerPage)
    .sort({ ordering: 'asc' })
    .then((items) => {
      console.log({items})
      res.render(`${folderView}list`, {
        pageTitle: 'Item List Page',
        items,
        pagination,
        statusFilter,
        currentStatus,
        keyword
      })
    })
})

//change status
router.get('/change-status/:status/:id', (req, res, next) => {
  let id = paramsHelpers.getParam(req.params, 'id', '')
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
  let status = (currentStatus == 'active') ? 'inactive' : 'active'

  itemsModel.updateOne({ _id: id }, { status: status }, (err, result) => {
    req.flash('success', notify.UPDATE_STATUS_ITEM_SUCCESS, false);
    res.redirect(linkIndex)
  })
})

//change status - multi
router.post('/change-status/:status', (req, res, next) => {
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
  itemsModel.updateMany({ _id: { $in: req.body.cid } }, { status: currentStatus }, (err, result) => {
    req.flash('success', util.format(notify.UPDATE_STATUS_MULTI_ITEM_SUCCESS, result.n), false);
    res.redirect(linkIndex)
  })
})

//change ordering
router.post('/change-ordering/', (req, res, next) => {
  let cids = req.body.cid
  let orderings = req.body.ordering

  if (Array.isArray(cids)) {
    cids.forEach((item, index) => {
      itemsModel.updateOne({ _id: item }, { ordering: parseInt(orderings[index]) }, (err, result) => {
      })
    });
  } else {
    itemsModel.updateOne({ _id: cids }, { ordering: parseInt(orderings) }, (err, result) => {
    })
  }
  req.flash('success', notify.UPDATE_ORDERING_ITEM_SUCCESS, false)
  res.redirect(linkIndex)
})

//delete
router.get('/delete/:id', (req, res, next) => {
  let id = paramsHelpers.getParam(req.params, 'id', '')

  itemsModel.deleteOne({ _id: id }, (err, result) => {
    console.log('delete')
    req.flash('success', 'Xóa ' + result.n + ' item thành công', false);
    res.redirect(linkIndex)
  })
})

//delete - multi
router.post('/delete', (req, res, next) => {
  itemsModel.deleteMany({ _id: { $in: req.body.cid } }, (err, result) => {
    req.flash('success', util.format(notify.REMOVE_MULTI_ITEM_SUCCESS, result.n), false);
    res.redirect(linkIndex)
  })
})

//form
router.get('/form(/:id)?', function (req, res, next) {
  let item = { name: '', ordering: 0, status: 'novalue' };
  let id = paramsHelpers.getParam(req.params, 'id', '')
  let errors = null

  if (id != '') {
    itemsModel.findById({ _id: id }, (err, item) => {
      res.render(`${folderView}form`, { pageTitle: 'Edit Page', item, errors });
    })
  }
  else {
    res.render(`${folderView}form`, { pageTitle: 'Add Page', item, errors });
  }
});

//Save
router.post('/save', function (req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  validatorItems.validator(req)
  let item = Object.assign(req.body)

  let errors = req.validationErrors()


  if (item.id != '') {
    if (errors !== false) {
      res.render(`${folderView}fomr`, { pageTitle: 'Item Add Page', errors, item });
    }
    else {
      itemsModel.updateOne({ _id: item.id }, {
        name: item.name,
        status: item.status,
        ordering: item.ordering
      }, (err, result) => {
        req.flash('success', notify.ADD_ITEM_SUCCESS, false)
        res.redirect(linkIndex)
      })
    }
  }
  else {
    if (errors !== false) {
      res.render(`${folderView}form`, { pageTitle: 'Item Edit Page', errors, item });
    }
    else {
      new itemsModel(item).save().then(() => {
        req.flash('success', notify.EDIT_ITEM_SUCCESS, false)
        res.redirect(linkIndex)
      })
    }
  }
});

module.exports = router;
