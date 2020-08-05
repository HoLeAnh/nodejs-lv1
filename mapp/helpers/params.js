let getParam = (params, property, defaultvalue) => {
    if (params.hasOwnProperty(property) && params[property] !== undefined) {
        return params[property]
    }   
    return defaultvalue
}

module.exports = {
    getParam: getParam
}


