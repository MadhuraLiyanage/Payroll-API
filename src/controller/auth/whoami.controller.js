const util = require("../../util/common.util")
const auth = require('../../middleware/authenticate.mw');

exports.jwtDetails = async (req, res, next) => {
    const userJwtToken = req.headers.authorization.split(' ')[1];
    const decodedJwt = util.decodeJWT(userJwtToken);
    var data = [];

    if (decodedJwt){
        data = [
            {
                "userId": decodedJwt.id,
                "userName": decodedJwt.userFullName,
                "userEmail":decodedJwt.userEmail,
                "userContactNo":decodedJwt.userContactNo
            }
        ]    
    }
    res.status(200).json({ status:'00', responseMessage:'Successfull', data: data});
}