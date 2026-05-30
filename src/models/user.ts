import {UserType} from "./userType";

export class User {
    constructor(public userId: string,
                public name: string, public email: string, public phoneNumber: string,
                public userType: UserType = UserType.GUEST,
                public active: boolean = true) {

    }
}