import Joi from "joi"
import { Prisma } from '@prisma/client'

import apiHandler from "../../../middleware/apiHandler";
import { prisma } from "../../../prisma/config";
import { CreateHashPassword } from "../auth/email";

// User Middleware and Handler
export default apiHandler({
    get: getUsers,
    post: postUser
});

// Schema to Validate User Object Input
const schema = Joi.object({
    firstName: Joi
        .string()
        .required(),
    lastName: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi
        .string()
});

// Get Users List
async function getUsers(req, res){
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
        }
    });

    return res.status(200).json({
        users
    })
}

// Post New User
async function postUser(req, res){
    try {
        // Validate Input Object
        const value = await schema.validateAsync({ ...req.body });

        // Create Hash and Overwrite Password
        value.password = CreateHashPassword(value.password);

        // Create User
        const user = await prisma.user.create({
            data: value,
        });

        // Remove Password
        delete user.password;

        // Return 
        res.status(200).json({
            message: "User Created",
            user
        });

    } catch (e) {
        userErrorHandler(e, { 
            code: 400, 
            message: 'User Creation error'
        }, res);
    }
}


// User Error Handler
const userErrorHandler = (e, a, res) => {

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
            a.message = 'There is a unique constraint violation, a new user cannot be created with this email';
    }

    return res.status(a.code).json({
        message: a.message,
        err: e
    })
}