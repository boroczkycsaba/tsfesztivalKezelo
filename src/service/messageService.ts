import {Message} from "../models/messages";
import {User} from "../models/user";
import {MessageLogger} from "../decorator/LoggerHelper";

export class MessageService {

    private _messagNotFoundHU: string = 'Üzenet sajnos nem található';

    private messageCounter :number = 0;

    public addMessageText(messsageText: string,
                   messages: Message[], user: User, publicMessage:boolean = true) {
        const messageId :string = "Üzenet " + ++this.messageCounter;
        const message = new Message(messageId, user, messsageText, publicMessage);
        messages.push(message);
    }

    public findMessageIndex(messsageText: string, messages: Message[], likeSearch:boolean = false, user?: User): number {
        if (messages.length > 0) {
            let findedMessageIndex = -1;
            if (user) {
                findedMessageIndex = messages.findIndex(
                    messageFind => (!messageFind.archived && messageFind.messsageText === messsageText && messageFind.user.userId === user.userId));
            } else if (likeSearch) {
                findedMessageIndex = messages.findIndex(
                    messageFind => (!messageFind.archived && messageFind.messsageText.indexOf(messsageText) > -1));
            } else {
                findedMessageIndex = messages.findIndex(
                    messageFind => (!messageFind.archived && messageFind.messsageText === messsageText));
            }
            if (findedMessageIndex > -1) {
                return findedMessageIndex;
            }
        }
        throw this._messagNotFoundHU;
    }


    @MessageLogger
    hardDelete(messsageText: string, messages: Message[], user?: User) {
        try {
            let messageIndex :number = this.findMessageIndex(messsageText, messages, false, user);
            messages.splice(messageIndex, 1);
        } catch (e) {
            console.error(e)
        }
    }

    @MessageLogger
    softDelete(messsageText: string, messages: Message[], likeSearch:boolean = false, user?: User) {
        try {
            let messageIndex :number = this.findMessageIndex(messsageText, messages, likeSearch, user);
            let message = messages[messageIndex];
            message.archived = true;
            this.softDelete(messsageText, messages, likeSearch, user);
        } catch (e) {

        }
    }

    public printMessage(_messages:Message[]): void {
        for (const message of _messages) {
            console.log('');
            if (message.publicMessage) {
                console.log("Résztvevőtől: : %s", message.user.name)
            } else {
                console.log('Titkos a küldő');
            }
            console.log("Következő üzenetet küldete: : %s", message.messsageText)

            if (message.archived) {
                console.log("Üzenet az üzenő falon nem jelenik meg")
            }
        }

    }
}