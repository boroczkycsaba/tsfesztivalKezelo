import {User} from "../models/user";
import {UserType} from "../models/userType";

export class UserService {

    private _participantNotFoundHU: string = 'Résztvevő sajnos nem található';

    private userCounter :number = 0;

    public createUser(name: string, email: string, phoneNumber :string, userType :UserType = UserType.GUEST): User {
        const userId :string = "Felhasználó " + ++this.userCounter;
        return new User(userId,name, email, phoneNumber, userType);
    }

    private findParticipantIndex(_participants: User[],
                                 participantName?: string, participantEmail?: string): number {
        let findedParticipantsIndex: number = -1;
        if (participantName) {
            findedParticipantsIndex = _participants.findIndex(participantFind => participantFind.name === participantName);
        }
        if (participantEmail) {
            findedParticipantsIndex = _participants.findIndex(participantFind => participantFind.email === participantEmail);
        }
        return findedParticipantsIndex;
    }

    public findParticipant(_participants: User[], participantName?: string, participantEmail?: string): User {
        if (_participants.length !== 0) {
            const findedParticipantsIndex = this.findParticipantIndex(_participants, participantName, participantEmail);
            if (findedParticipantsIndex > -1) {
                return _participants[findedParticipantsIndex];
            }
            throw this._participantNotFoundHU;
        } else {
            throw this._participantNotFoundHU;
        }
    }

    public removeParticipant(_participants: User[], participantName?: string, participantEmail?: string): User {
        if (_participants.length !== 0) {
            const findedParticipantsIndex = this.findParticipantIndex(_participants, participantName, participantEmail);
            if (findedParticipantsIndex > -1) {
                _participants.splice(findedParticipantsIndex, 1);
            }
            throw this._participantNotFoundHU;
        } else {
            throw this._participantNotFoundHU;
        }
    }

}