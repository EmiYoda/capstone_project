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
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./entities/Post");
const constants_1 = require("./constants");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init({
        migrations: {
            path: path_1.default.join(__dirname, "./migrations"),
            pattern: /^[\w-]+\d+\.[tj]s$/,
        },
        entities: [Post_1.Post],
        dbName: "photodb",
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        type: "postgresql",
        debug: !constants_1.__prod__,
    });
    yield orm.getMigrator().up();
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map