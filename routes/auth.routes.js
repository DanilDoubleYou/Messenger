import Router from "express"
import User from "../models/User.js"
import {check, validationResult} from 'express-validator'
const router = new Router()

router.post('/registration', 
[
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 6})
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
        
        const isUsed = await User.findOne({email})

        if (isUsed) {
            return res.status(300).json({message: 'E-mail уже занят'})
        }

        const user = new User({email, password})
        
        console.log(`Trying to add user: ${user}`)

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500)
        console.error(e)
    }
})

export default router