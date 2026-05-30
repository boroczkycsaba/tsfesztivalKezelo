import {Message} from "../models/messages";
import {EventProgramme} from "../models/event";
import {User} from "../models/user";
import {UserService} from "./userService";
import {MessageService} from "./messageService";
import {UserType} from "../models/userType";

export class EventService {

    private _eventNotFoundHU: string = 'Esemény sajnos nem található';

    private _events: EventProgramme[] = new Array<EventProgramme>();
    private eventCounter :number = 0;

    private _userService :UserService = new UserService();
    private _messageService :MessageService = new MessageService();

    public addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public startEvent(eventName: string, publicEvent: boolean = true, startDate? :Date) : string {
        const eventId :string = "Esemény " + ++this.eventCounter;
        if (!startDate) {
            startDate = new Date();
        }
        const event = new EventProgramme(eventId, eventName, startDate);
        if (publicEvent) {
           event.publicEvent = publicEvent;
        }
        this._events.push(event);
        return eventId;
    }

    public findEvent(eventId: string): EventProgramme {
        if (this._events.length === 0) throw this._eventNotFoundHU;
        let findedEventIndex : number = this._events.findIndex(eventFind => eventFind.eventId === eventId);
        if (findedEventIndex > -1) {
            return this._events[findedEventIndex];
        }
        throw this._eventNotFoundHU;
    }

    public privateEvent(eventId: string) : boolean {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.publicEvent = false;
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public stopEvent(eventId: string):boolean {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.stopEvent();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public addMessageText(messageTex: string, eventId: string, user: User):void {
        const findedEvent: EventProgramme = this.findEvent(eventId);
        this._messageService.addMessageText(messageTex, findedEvent.messages, user);
    }


    public messageDelete(deleteMessageWithText:string, eventId: string, user: User):void {
        const findedEvent: EventProgramme = this.findEvent(eventId);
        this._messageService.hardDelete(deleteMessageWithText, findedEvent.messages, user);
    }

    public softMessageDelete(deleteMessageWithText:string, eventId: string):void {
        const findedEvent: EventProgramme = this.findEvent(eventId);
        this._messageService.softDelete(deleteMessageWithText, findedEvent.messages, true);
    }

    public registerParticipant(eventId: string, name: string, email: string, phoneNumber: string, userType? :UserType) :User {
        const participant = this._userService.createUser(name, email, phoneNumber, userType);
        this.addParticipant(eventId, participant);
        return participant;
    }

    private addParticipant(eventId: string, participant: User) :boolean {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.addParticipant(participant);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public findParticipant(findedEvent: EventProgramme, participantName?: string, participantEmail?: string ): User {
        return this._userService.findParticipant(findedEvent.participants);
    }

    public removeParticipant(eventId: string, participantName?: string, participantEmail?: string) :boolean {
        if (!(participantName || participantEmail)) {
            return false;
        }
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            this._userService.removeParticipant(findedEvent.participants, participantName, participantEmail);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public printEvent(eventId: string) {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.printEvent()
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    public printEventWithMessages(eventId: string) {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.printEvent()
            this._messageService.printMessage(findedEvent.messages);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }


    public printParticipant(eventId: string) {
        try {
            const findedEvent: EventProgramme = this.findEvent(eventId);
            findedEvent.printParticipants()
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}