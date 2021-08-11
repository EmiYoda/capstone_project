import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;

        if (!(email && password && name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email, name },
            "c4b7a440-65a2-4ac4-a835-64131ac5f095",
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req: any, res: any) => {
    try {
        const { email, password, name } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email, name },
                "c4b7a440-65a2-4ac4-a835-64131ac5f095",
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
};
