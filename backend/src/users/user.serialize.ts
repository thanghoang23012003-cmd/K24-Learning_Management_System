// user serializer 
import { UserDocument } from './users.schema';

export class UserSerializer {
    private static PERMIT = ['_id', 'username', 'email', 'firstName', 'lastName', 'avatar', 'description', 'website', 'linkedIn', 'youtube', 'facebook', 'role'];
    private static CONVERT_STRING = ['_id'];

    static fromUser(user: UserDocument) {
        return this.PERMIT.reduce((obj, key) => {
            if (this.CONVERT_STRING.includes(key)) {
                obj[key] = String(user[key]);
            } else if (user[key] !== undefined) {
                obj[key] = user[key];
            }
            return obj;
        }, {});
    }
}