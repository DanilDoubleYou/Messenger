import Router from "express"
import User from "../models/User.js"
import {body, check, validationResult} from 'express-validator'
import bcrypt from "bcryptjs" ///dist/bcrypt
import jsonwebtoken from 'jsonwebtoken'
import { env } from 'process';

const authRouter = new Router()

authRouter.post('/registration', 
[
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 6}),
    check('lastName', 'Некорректная фамилия').isLength({min: 3}),
    check('firstName', 'Некорректное имя').isLength({min: 3})
], 
async (req, res) => {
    
    try {
        
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password, firstName, lastName} = req.body
        
        const isUsed = await User.findOne({email})

        if (isUsed) {
            return res.status(300).json({message: 'E-mail уже занят'})
        }

        const hashPass = await bcrypt.hash(password, 12)

        const user = new User({
            firstName: firstName, 
            lastName: lastName,
            email: email, 
            password: hashPass
        })
        
        console.log(`Trying to add user: ${user}`)

        await user.save()

        console.log(`User successfully added with unique id ${user._id}`)

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500)
        console.log("Status 500 returned")
        console.error(e)
    }
})

authRouter.post('/login',
[
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Некорректный пароль').exists()
],
async (req, res) => {
    
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при авторизации'
            })
        }
        console.log(req.body)

        const mail = req.body.email
        console.log(mail)
        const user = await User.findOne({email: mail})

        console.log(user)

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }
        
        bcrypt.compare(req.body.password, user.password, function(e, response) {
            if (e){
                console.error(e)
            }
            if (response) {
                const jwtSecret = env.JWTSECRET
                const token = jsonwebtoken.sign({userID: user.id}, jwtSecret, {expiresIn: '1h'})
                res.json({
                    token: token,
                    userId: user.id,
                })
            } else {
              return res.status(401).json({success: false, message: 'Password does not match'});
            }
        })

    } catch (e) {
        res.status(500)
        console.log("Status 500 returned")
        console.error(e)
    }
})


export default authRouter