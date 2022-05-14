import Router from "express"
import UserLoginInfo from "../models/UserLoginInfo.js"
import {check, validationResult} from 'express-validator'
import bcrypt from "bcryptjs" ///dist/bcrypt
import jsonwebtoken from 'jsonwebtoken'
import { env } from 'process';
const router = new Router()

router.post('/registration', 
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

        const {email, password} = req.body
        
        const isUsed = await UserLoginInfo.findOne({email})

        if (isUsed) {
            return res.status(300).json({message: 'E-mail уже занят'})
        }

        const hashPass = await bcrypt.hash(password, 12)

        const userLoginInfo = new UserLoginInfo({
            email, password: hashPass
        })
        
        console.log(`Trying to add user: ${userLoginInfo}`)

        await userLoginInfo.save()

        console.log(`User successfully added with unique id ${userLoginInfo._id}`)

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500)
        console.log("Status 500 returned")
        console.error(e)
    }
})

router.post('/login',
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

        const {email, password} = req.body

        const user = await UserLoginInfo.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        
        bcrypt.compare(req.body.password, user.password, function(e, response) {
            if (e){
                console.error(e)
            }
            if (response) {
                const jwtSecret = env.JWTSECRET
                console.log(jwtSecret)
                const token = jsonwebtoken.sign({userID: user.id}, jwtSecret, {expiresIn: '1h'})
                res.json({
                    token: token,
                    userId: user.id,
                })
            } else {
              // response is OutgoingMessage object that server response http request
              return res.status(400).json({success: false, message: 'Password does not match'});
            }
        });

    } catch (e) {
        res.status(500)
        console.log("Status 500 returned")
        console.error(e)
    }
})


export default router