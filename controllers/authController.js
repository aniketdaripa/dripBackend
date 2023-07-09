const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stock = require("../model/stock");
const Bill = require("../model/bill");
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      `898827028aac1abb363945c3ca8b1a032a759c5ba51d1fd435d950cd0d74e6965ec4a9964136e7ee985df18119a7fb58f62f88196f5b5f0f6229c25090e55d50`,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      `7508b480615f0e99c99e488bd1d4048304adc4e644b1779109663e9179a4a62ec2cc04b949ca9cd7db285234d1aa302480b7c35f5514d4187c45824de150a86f
      `,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};



module.exports = { handleLogin};
