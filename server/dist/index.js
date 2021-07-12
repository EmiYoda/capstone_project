"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./entities/Post");
const constants_1 = require("./constants");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const User_1 = require("./entities/User");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init({
        migrations: {
            path: path_1.default.join(__dirname, "./migrations"),
            pattern: /^[\w-]+\d+\.[tj]s$/,
        },
        entities: [Post_1.Post, User_1.User],
        dbName: "photodb",
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        type: "postgresql",
        debug: !constants_1.__prod__,
    });
    yield orm.getMigrator().up();
    const app = express_1.default();
    app.use(express_session_1.default({
        name: "uid",
        secret: `${process.env.SECRET}`,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO,
            ttl: 14 * 24 * 60 * 60,
        }),
        cookie: {
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: "lax",
            maxAge: 14 * 24 * 60 * 60,
        },
        saveUninitialized: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    apolloServer.applyMiddleware({ app });
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map