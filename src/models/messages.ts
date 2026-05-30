import {User} from "./user";

export class Message {
    constructor(public messageId:string,
                public user: User, public messsageText: string, public publicMessage:boolean = true, public archived:boolean = false) {
    }

}