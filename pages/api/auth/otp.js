import otpGenerator from 'otp-generator'
import { sign, verify } from 'jsonwebtoken'

import { prisma } from "../../../prisma/config";
import { PrivateKey, PublicKey, KeyConfig } from '../../../artifacts';

export default function handler(req, res) {

    // Check For Method
    switch (req.method) {
        case 'GET':
            return generateOTP(req, res);
        case 'POST':
            return verifyOTP(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}

async function generateOTP(req, res){

    const { email } = req.query;

    if(!email){
        return res.status(400).json({
            message: 'Email is required'
        })
    }
    
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    });

    // Handle No User
    if (!user) {
        return res.status(400).json({
            message: 'Username or password is incorrect'
        });
    }
    
    const otp = otpGenerator.generate(6, { 
        digits: true,
        upperCaseAlphabets: false, 
        lowerCaseAlphabets: false, 
        specialChars: false 
    });

    try {
        await prisma.oTP.create({
            data: {
                email,
                otp,
                updatedAt: new Date()
            }
        })

        return res.status(200).json({
            email,
            otp
        });

    } catch (error) {
        return res.status(400).json({
            error
        });
    }
    
}


async function verifyOTP(req, res){
    const { email, otp } = req.body;

    if (!(email && otp)) {
        return res.status(401).json({
            message: 'Missing Params'
        })
    }

    // Find OTP 
    const _otp = await prisma.oTP.findUnique({
        where: {
            activeOTP: {
                otp,
                email,
                used: false
            }
        },
    });

    if (!_otp){
        return res.status(401).json({
            message: 'OTP Not Found'
        })
    }

    // Check for User
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    });

    // Handle No User
    if (!user) {
        return res.status(400).json({
            message: 'Email is incorrect'
        });
    }

    try {

        // Mark the OTP as used
        await prisma.oTP.update({
            where: { id: _otp.id },
            data: { 
                used: true,
                updatedAt: new Date() 
            },
        })

        // Create a JWT token that is valid for 1 Hour
        const token = sign({ user }, PrivateKey, { ...KeyConfig, expiresIn: '5m' });

        // Decode and Test
        var decoded = verify(token, PublicKey, { ...KeyConfig });

        // return basic user details and token
        return res.status(200).json({
            token,
            ...decoded
        });

    } catch (e) {
        return res.status(401).json({
            // message: e.message
            message: 'Email or OTP is incorrect'
        });
    }
}