const mongoose = require('mongoose');
const util = require('util');
const notify = require(__path_configs + 'notify');

let option = {
    name: '',
    ordering: { min: 0, max: 100 },
    status: { value: 'novalue' }
}

var validator = (req) => {
    req.checkBody('name', notify.ERROR_NAME).notEmpty()
    req.checkBody('ordering', util.format(notify.ERROR_ORDERING, option.ordering.min, option.ordering.max)).isInt({ gt: option.ordering.min, lt: option.ordering.max })
    req.checkBody('status', notify.ERROR_STATUS).isNotEqual(option.status.value)
}

module.exports = { validator };