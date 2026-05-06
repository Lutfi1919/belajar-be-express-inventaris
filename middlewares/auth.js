const jwt = require('jsonwebtoken')
const { response } = require('../helpers/response.formatter')
const { auth_secret } = require('../config/base.config')

module.exports = {
    // next : parameter, untuk melanjutkan req. klo udah di cek middlewarenya melanjutkan ke controller pake next
    checkToken: async (req, res, next) => {
        const token = req.header("Authorization");
        if (!token) {
            // 401 : err untuk pengguna yg belum login (unauthorized)
            return res.status(401).json(response(401, "Unauthorized", "Please login and try again!"));
        }

        try {
            // cek token (udah expired atau belum)
            const check = jwt.verify(token, auth_secret);
            // karena nanti penguna perlu data identitas pengguna, panggil payload yang dikirim jwt.sign() di loginController dan simpan di req. data payload tersimpan di const check (hasil verify), ada { userId, name, email }
            req.user = check;
            next(); // lanjutkan proses routing yg diminta
        } catch (error) {
            return res.status(401).json(response(401, "unauthorized", "Please login and try again!"));
        }
    }
}