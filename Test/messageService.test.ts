import {describe, expect, test} from '@jest/globals';
import {EventService} from "../src/service/eventService";
import {User} from "../src/models/user";
import {EventProgramme} from "../src/models/event";
import {MessageService} from "../src/service/messageService";

describe('message test 1', () => {
    const eventService: EventService = new EventService();
    const messageService: MessageService = new MessageService();
    const eventId :string = eventService.startEvent('Esemény');
    let partyArc :User = eventService.registerParticipant(eventId, 'Party Arc', 'party.arc@party.vilag', '00-Világ-2');
    const partySzoveg :string = 'Jó a buli, mindeki jó fej';
    eventService.addMessageText(partySzoveg, eventId, partyArc);
    const findedEvent: EventProgramme = eventService.findEvent(eventId);
    const findedMessageIndex :number = messageService.findMessageIndex(partySzoveg, findedEvent.messages, false, partyArc);
    test('Üzenet index', () => {
        expect(findedMessageIndex).toBe(0);
    });
    eventService.softMessageDelete(partySzoveg, eventId);
    test('Üzenet nem található', () => {
        expect(() => {
            messageService.findMessageIndex(partySzoveg, findedEvent.messages, false, partyArc)
        }).toThrow('Üzenet sajnos nem található');
    })

});
