const itemsModel = require(__path_schemas + 'items')

let createFilterStatus = async (currentStatus) => {

    let statusFilter = [
        { name: 'all', value: 'all', count: 1, link: '#', class: 'default' },
        { name: 'active', value: 'active', count: 2, link: '#', class: 'default' },
        { name: 'inactive', value: 'inactive', count: 3, link: '#', class: 'default' },
        { name: 'trash', value: 'trash', count: 4, link: '#', class: 'default' }
    ]


    for (let index = 0; index < statusFilter.length; index++) {
        const item = statusFilter[index];
        let condition = {}
        if (item.value != 'all') {
            condition = { status: item.value }
        }
        if (currentStatus == item.value) {
            statusFilter[index].class = 'success'
        }

        await itemsModel.count(condition).then((data) => {
            statusFilter[index].count = data
        })
    }

    return statusFilter
}

module.exports = {
    createFilterStatus: createFilterStatus
}


