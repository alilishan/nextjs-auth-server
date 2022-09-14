import { sign, verify } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { prisma } from '../../../prisma/config';
import { PrivateKey, PublicKey, KeyConfig } from '../../../artifacts';

export default function handler(req, res) {

    // Check For Method
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    // Auth Handler
    async function authenticate() {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            },
        });

        // Handle No User
        if (!user) {
            return res.status(401).json({
                message: 'Username or password is incorrect'
            });
        }

        try {
            // Validate Password
            const sanitized = await ValidateSanitizePassword(user, req.body.password);

            // Create a JWT token that is valid for 1 Hour
            const token = sign({ user }, PrivateKey, { ...KeyConfig, expiresIn: '1h' });

            // Decode and Test
            var decoded = verify(token, PublicKey, { ...KeyConfig });

            // return basic user details and token
            return res.status(200).json({
                token,
                // user: sanitized,
                ...decoded
            });

        } catch(e) {
            return res.status(401).json({
                // message: e.message
                message: 'Username or password is incorrect'
            });
        }
    }
}


// Validate and Sanitize Password
const ValidateSanitizePassword = (user, password) => {
    return new Promise((resolve, reject) => {
        if (bcrypt.compareSync(password, user.password)){
            delete user.password;
            resolve(user);
        } else {
            reject({ message: 'Password Error' });
        }
    })
}


export const CreateHashPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}