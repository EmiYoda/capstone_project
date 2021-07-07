interface UserSchema {
    _id: {$oid: string};
    username: string;
    email: string;
    password: string;
}