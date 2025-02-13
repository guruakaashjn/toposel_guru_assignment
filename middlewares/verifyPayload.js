import Joi from "joi";

const dataRegex = /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/

// register user schema for payload field-level validation
const registerUserSchema = Joi.object(
    {
        username: Joi.string().required(),
        password: Joi.string().required(),
        fullName: Joi.string().required(),
        dob: Joi.string().pattern(dataRegex).required(),
        country: Joi.string().required(),
    }
);

export const validateRegisterUserPaylaod = (req, res, next) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ "error": error.details[ 0 ].message });
    }
    next();
}

// login user schema for payload field-level validation
const loginUserSchema = Joi.object(
    {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
);
export const validateLoginUserPayload = (req, res, next) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ "error": error.details[ 0 ].message });
    }
    next();
}
