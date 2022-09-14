import { verify } from "jsonwebtoken";
import { KeyConfig, PublicKey } from "../artifacts";


export default function jwtHandler(req){
    return new Promise((resolve, reject) => {
        const bearerHeader = req.headers['authorization'];

        // Check if Undefined
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];

            verify(bearerToken, PublicKey, { ...KeyConfig }, function (err, auth) {
                if (err) {
                    reject({
                        code: 403,
                        message: 'Unauthorized Access!',
                        err
                    })
                } else {
                    // Append Token to Request obj and send 
                    req.token = bearerToken;
                    req.auth = auth;
                    resolve(req);
                }
            });

        } else {
            reject({
                code: 403,
                message: 'Authorization token not found!'
            })
        }
    })
}