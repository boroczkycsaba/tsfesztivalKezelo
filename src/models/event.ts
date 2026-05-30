import {Message} from "./messages";
import {User} from "./user";
import {UserType} from "./userType";

export class EventProgramme {

    private _messages: Message[] = new Array<Message>();
    private _participants: User[] = [];

    constructor(public eventId: string, public name: string, public startDate: Date,
                public endDate?: Date, public publicEvent :boolean = true, public description?: string) {
    }

    get participants(): User[] {
        return this._participants;
    }

    public addParticipant(participant: User) {
        this._participants.push(participant);
    }

    get messages(): Message[] {
        return this._messages;
    }

    public stopEvent() :void {
        this.endDate = new Date();
    }

    private printParticipantName(participant :User) {
        console.log("Résztvevő neve: : %s", participant.name)
    }

    public printEvent() :void {
        console.log('');
        console.log("Esemény neve: : %s", this.name)
        console.log("Esemény kezdete: : %s", this.startDate)
        if (this.endDate) {
            console.log("Esemény véget ért: : %s", this.endDate)
        } else {
            console.log('Esemény folyamatban');
        }
        if (this.description) {
            console.log("Esemény leírása: : %s", this.description)
        }
        for (const participant of this.participants) {
            this.printParticipantName(participant);
        }
    }

    public printParticipants() {
        let countedGuest :number = 0;
        let countedSpecial :number = 0;
        let countedOrganizer :number = 0;
        for (const participant of this.participants) {
            console.log('');
            this.printParticipantName(participant);
            console.log("Résztvevő email címe: : %s", participant.email)
            console.log("Résztvevő telefonszáma: : %s", participant.phoneNumber)
            console.log("Résztvevő milyen minőségben vesz részt: : %s", participant.userType)
            if (participant.userType === UserType.GUEST) {
                countedGuest++;
            } else if (participant.userType === UserType.SPECIAL) {
                countedSpecial++;
            } else if (participant.userType === UserType.ORGANIZER) {
                countedOrganizer++;
            }
        }
        console.log('');
        console.log('Összes vendég: %s', countedGuest);
        console.log('Összes különleges résztvevő: %s', countedSpecial);
        console.log('Összes szervező: %s', countedOrganizer);
    }
}