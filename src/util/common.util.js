const Common = function(){ };

Common.convertSQL = async (sqlString) => {
    return new Promise (function(resolve, reject){
        console.log(sqlString);
        result = sqlString.replace(/'/g,'"');
        resolve(result);
    })
}

module.exports = Common;