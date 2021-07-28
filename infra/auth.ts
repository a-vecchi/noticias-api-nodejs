import * as jwt from 'jsonwebtoken';
import configs from './configs';

class Auth {
    validate(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, configs.secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: '403 - Token Inválido'
                    })
                } else {
                    next();
                }
            })
        }
        else {
            return res.status(401).send({
                success: false,
                message: '401 - Não Autorizado'
            })
        }
    }
}

export default new Auth();