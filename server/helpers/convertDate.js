function convertDate(date){
    return date.split('/').reverse().join('/');
}

module.exports = convertDate