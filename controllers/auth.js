import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { createError } from '../error.js'

export const signup = async (req, res, next) => {
    console.log(req.body)
    console.log(typeof req);
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})

        await newUser.save()

        res.status(200).json({
            success: false,
            status : 200,
            message : 'User has been created!'
        })
    } catch (error) {
        // next(error)
        next(createError(404, error.message))
    }
}

export const signin = async (req, res, next) => {
    console.log(req.body)
    console.log(typeof req);
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) return next(createError(404, ' User not found'))

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) return next(createError(400, 'Wrong Credentials!'))
        
        const token = jwt.sign({ id: user._id}, process.env.JWT)
        const { password, ...others} = user._doc

        res.cookie('access_token', token, {
            httpOnly:true
        })
        .status(200)
        .json({
            token,
            user: others
        })

    } catch (error) {
        // next(error)
        next(createError(404, error.message))
    }
}