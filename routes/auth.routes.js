import Router from "express"
import User from "../models/User"

const router = new Router()

router.post('/registration', async (req, res) => {
    try {
        const {email, password} = req.body
        
        const isUsed = await User.findOne({email})
        if (isUsed) {
            return res.status(300).json({message: 'E-mail уже занят'})
        }

        const user = new User({email, password})

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        console.error(e)
    }
})

export default router