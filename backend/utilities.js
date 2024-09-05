const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.sendStatus(401);

   let {user} =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   req.user = user;
   next();
}

module.exports = {
    authenticateToken,
}