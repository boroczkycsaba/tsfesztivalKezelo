import {describe, expect, test} from '@jest/globals';
import {EventService} from "../src/service/eventService";
import {EventProgramme} from "../src/models/event";
import {User} from "../src/models/user";


describe('event test 1', () => {
    const eventService: EventService = new EventService();
    const eventId :string =eventService.startEvent('Esemény');
    const participiantName :string = 'Résztvevő 1';
    eventService.registerParticipant(eventId, participiantName, 'resztvevo@resztevevo.com', '00-Résztvevő-1');
    const findedEvent: EventProgramme = eventService.findEvent(eventId);
    const findedParticipant :User = eventService.findParticipant(findedEvent, participiantName);
    test('Résztvevő név test', () => {
        expect(findedParticipant.name).toBe(participiantName);
    });
    test('Résztvevő nem található', () => {
        expect(() => {
            eventService.findParticipant(findedEvent, "Ilyen nincs")
        }).toThrow('Résztvevő sajnos nem található');
    })

});
