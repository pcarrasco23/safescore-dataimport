exports.validateIntParam = function(parameter, name) {
    if (parameter == undefined)
        return name + ' parameter is required';
        
    var regExp = /[^0-9]+/g
    if (parameter.match(regExp) != null) {
        return name + ' parameter must be an integer value';
    }

    return '';
} 

exports.validateNumberParam = function(parameter, name) {
    if (parameter == undefined)
        return name + ' parameter is required';
        
    if (typeof(parameter) != 'number') {
        return name + ' parameter must be a number';
    }

    return '';
} 