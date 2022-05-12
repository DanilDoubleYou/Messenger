import Router from "express"
import UserLoginInfo from "../models/UserLoginInfo.js"
import {check, validationResult} from 'express-validator'
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

        const userLoginInfo = new UserLoginInfo({email, password})
        
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

export default router