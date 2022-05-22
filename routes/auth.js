import Router from "express"
import User from "../models/User.js"
import {body, check, validationResult} from 'express-validator'
import bcrypt from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken'
import { env } from 'process';

const authRouter = new Router()

authRouter.post('/registration', 
[
    check('email', 'Несуществующий e-mail').isEmail(),
    check('password', 'Некорректная длина пароля (мин. 6 символов)').isLength({min: 6}),
    check('lastName', 'Некорректная фамилия').exists(),
    check('firstName', 'Некорректное имя').exists()
],
async (req, res) => {

    function isValidHttpUrl(string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
    }

    try {
        
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password, firstName, lastName, avatar} = req.body
        
        const isUsed = await User.findOne({email})

        if (isUsed) {
            return res.status(300).json({message: 'E-mail уже занят'})
        }

        const hashPass = await bcrypt.hash(password, 12)

        const user = isValidHttpUrl(avatar) 
            ? 
              new User({
                firstName: firstName, 
                lastName: lastName,
                email: email, 
                password: hashPass,
                avatar: avatar
            }) 
            :
            new User({
                firstName: firstName, 
                lastName: lastName,
                email: email, 
                password: hashPass
            })

        await user.save()

        const jwtSecret = env.JWTSECRET
        const token = jsonwebtoken.sign({userID: user.id}, jwtSecret, {expiresIn: '1h'})
        res.json({
            token: token,
            userId: user.id,
        })

    } catch (e) {
        res.status(500)
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

        const mail = req.body.email
        
        const user = await User.findOne({email: mail})

        if (!user) {
            return res.status(401).json({
                message: 'Пользователь с данным e-mail не найден'
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
              return res.status(401).json({success: false, message: 'Пароли не совпадают'});
            }
        })

    } catch (e) {
        res.status(500)
        console.error(e)
    }
})


export default authRouter