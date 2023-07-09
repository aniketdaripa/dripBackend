const jwt = require('jsonwebtoken');
const accT="898827028aac1abb363945c3ca8b1a032a759c5ba51d1fd435d950cd0d74e6965ec4a9964136e7ee985df18119a7fb58f62f88196f5b5f0f6229c25090e55d50"
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        accT,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT