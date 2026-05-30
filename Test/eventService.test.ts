import {describe, expect, test} from '@jest/globals';
import {EventService} from "../src/service/eventService";


describe('event test 1', () => {
    const eventService: EventService = new EventService();
    const event1Id :string =eventService.startEvent('Esemény 1');
    test('Event id test', () => {
        expect(event1Id).toBe('Esemény 1');
    });
    const event2Id :string =eventService.startEvent('Esemény 2');
    test('Event id test', () => {
        expect(event2Id).toBe('Esemény 2');
    });
    const event3Id :string =eventService.startEvent('Esemény 3');
    test('Event id test', () => {
        expect(event3Id).toBe('Esemény 3');
    });
});

describe('event test 2', () => {
    const eventService: EventService = new EventService();
    let today = new Date();
    const testDay :Date = eventService.addDays(today, 50);
    const eventId = eventService.startEvent('Esemény', true, testDay);
    test('Event start date test', () => {
        expect(eventService.findEventStartedDate(eventId)).toBe(testDay);
    });
});

describe('event test 3', () => {
    const eventService: EventService = new EventService();
    const eventId = eventService.startEvent('Esemény', true);
    eventService.privateEvent(eventId);
    test('Event private test', () => {
        expect(eventService.isEventPublic(eventId)).toBe(false);
    });
});

describe('event test 4', () => {
    const eventService: EventService = new EventService();
    const eventId = eventService.startEvent('Esemény');
    eventService.stopEvent(eventId);
    test('Event closed test', () => {
        expect(eventService.isEventOnGoing(eventId)).toBe(false);
    });
});