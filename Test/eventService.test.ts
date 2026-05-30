import {describe, expect, test} from '@jest/globals';
import {EventService} from "../src/service/eventService";


describe('event test 1', () => {
    const eventService: EventService = new EventService();
    const date = new Date();
    test('Event date test', () => {
        expect(eventService.startEvent('Esemény')).toBe('Esemény 1');
    });
});