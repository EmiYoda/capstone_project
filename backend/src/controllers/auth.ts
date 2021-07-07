import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { create, verify } from "https://deno.land/x/djwt/mod.ts"
import {JWTPRIVATEKEY} from "../../config.ts"

import {db} from "../db.ts";

import UserSchema from "../schemas/user.ts";

const users = db.collection<UserSchema>("users");


export const Register = async ({request, response}: RouterContext) => {
try {
    const {name, email, password} = await request.body().value;

    const insertId =  await users.insertOne({
         name, 
         email,
         password: await bcrypt.hash(password)
     })
     const user = await users.findOne({ _id: insertId }, {noCursorTimeout: false} as any);

     delete user.password;
 
     response.body = await user

} catch (error) {
    console.log(error)
}
}

export const Login = async ({request, response, cookies}: RouterContext) => {
    try {
        const { email, password} = await request.body().value;

        const user = await users.findOne({email}, {noCursorTimeout: false} as any);

        if (!user ){
            response.body = 404;
            response.body = {message: "User not found!"}
            return ;
        }

        if (!await bcrypt.compare(password, user.password)) {
            response.body = 404;
            response.body = {message: "Incorrect Password"}
            return ;
        }

        const jwt = await create({alg: "HS512", typ: "JWT"}, {_id: user._id}, JWTPRIVATEKEY);

        cookies.set('jwt', jwt, {httpOnly: true});

        response.body = {message: 'success'};

    } catch (error) {
        console.log(error);
    }
}

export const Logout = async ({response, cookies}: RouterContext) => {
    cookies.delete('jwt');

    response.body = {message: 'succes'}
}

export const getUser = async ({ response, cookies}: RouterContext) => {
try {
    const jwt =  cookies.get("jwt") || "";
    if (!jwt) {
        response.body = 401;
        response.body = {message: "Unauthenticated"}
        return ;
    }

    const payload = await verify(jwt, JWTPRIVATEKEY, "HS512")
    if (!payload) {
        response.body = 401;
        response.body = {message: "Unauthenticated"}
        return ;
    }
    const {password, ...userData} = await users.findOne({_id: new Bson.ObjectId(payload._id)}, {noCursorTimeout: false} as any)

    response.body = userData
    
} catch (error) {
    console.log(error)
}
}