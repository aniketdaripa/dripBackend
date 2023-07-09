const User = require('../model/User');
const jwt = require('jsonwebtoken');
const accT="898827028aac1abb363945c3ca8b1a032a759c5ba51d1fd435d950cd0d74e6965ec4a9964136e7ee985df18119a7fb58f62f88196f5b5f0f6229c25090e55d50"
const refT="7508b480615f0e99c99e488bd1d4048304adc4e644b1779109663e9179a4a62ec2cc04b949ca9cd7db285234d1aa302480b7c35f5514d4187c45824de150a86f"
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        refT,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                accT,
                { expiresIn: '10s' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }