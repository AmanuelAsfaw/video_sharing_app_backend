import { createError } from "../error.js"
import User from '../models/User.js'

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
                {
                    $set:req.body
                },
                { new: true}
            )
            res.status(200).json({
                success: true,
                status: 200,
                user : updatedUser
            })
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, 'You can update only your account'))
    }
}

export const delete_user = (req, res, next) => {
    res.json('Its Succesfull')
}

export const getUser = (req, res, next) => {
    res.json('Its Succesfull')
}

export const subscribe = (req, res, next) => {
    res.json('Its Succesfull')
}

export const unsubscribe = (req, res, next) => {
    res.json('Its Succesfull')
}

export const like = (req, res, next) => {
    res.json('Its Succesfull')
}

export const dislike = (req, res, next) => {
    res.json('Its Succesfull')
}