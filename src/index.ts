import {EventService} from "./service/eventService";
import {User} from "./models/user";
import {UserType} from "./models/userType";


console.log('Fesztivál bulizás indul!!!');
console.log('');

const eventService: EventService = new EventService();

let today = new Date();

const eventId1 :string = eventService.startEvent('Buli indul');
const eventId2 :string = eventService.startEvent('Privát party indul', false);
const eventId3 :string = eventService.startEvent('Buli indul de iziben');

const newEvent4Date :Date = eventService.addDays(today, 100);
const eventId4 :string = eventService.startEvent('Buli van de indul mindjárt', true, newEvent4Date);

const newEvent5Date :Date = eventService.addDays(today, 30);
const eventId5 :string = eventService.startEvent('Itt a nyár indul az eskövő', true, newEvent5Date);

console.debug(eventId1);
console.debug(eventId2);
console.debug(eventId3);
console.debug(eventId4);
console.debug(eventId5);

let partyArc :User = eventService.registerParticipant(eventId3, 'Party Arc', 'party.arc@party.vilag', '00-Világ-2');
let aniPartyArc :User = eventService.registerParticipant(eventId3, 'Anti Party Arc', 'anti.party.arc@party.vilag', '00-Világ-43');
let gonoszPartyArc :User = eventService.registerParticipant(eventId3, 'Gonosz Party Arc', 'gonosz.party.arc@party.vilag', '00-Világ-11');

eventService.stopEvent(eventId2);

eventService.addMessageText('Király a buli', eventId3, partyArc);
eventService.addMessageText('Minden szar és még szarabb is', eventId3, aniPartyArc);
eventService.addMessageText('Kalap fos ez a buli és még fos is', eventId3, gonoszPartyArc);

eventService.printEvent(eventId1);
eventService.printEvent(eventId2);
eventService.printEventWithMessages(eventId3);
eventService.printEvent(eventId4);

eventService.messageDelete('Minden szar és még szarabb is', eventId3, aniPartyArc);

eventService.softMessageDelete(' fos ', eventId3);
eventService.stopEvent(eventId3);
eventService.printEventWithMessages(eventId3);

eventService.privateEvent(eventId5);
let eskuvoSzervezo :User = eventService.registerParticipant(eventId5, 'Eskövő szervező', 'eskuvo@eskuvo.com', '00-Esküvő-01', UserType.ORGANIZER);
let eskuvoFeleseg :User = eventService.registerParticipant(eventId5, 'Eskövő feleség', 'szuper.feleseg@szuper.com', '00-Szuper-01', UserType.SPECIAL);
let eskuvoFerj :User = eventService.registerParticipant(eventId5, 'Eskövő férj', 'szuper.ferj@szuper.com', '00-Szuper-02', UserType.SPECIAL);

let eskuvoVendeg1 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 1', 'szuper.vendeg@szuper.com', '00-Vendég-01');
let eskuvoVendeg2 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 2', 'szuper.vendeg@szuper.com', '00-Vendég-02');
let eskuvoVendeg3 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 3', 'szuper.vendeg@szuper.com', '00-Vendég-03');
let eskuvoVendeg4 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 4', 'szuper.vendeg@szuper.com', '00-Vendég-04');
let eskuvoVendeg5 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 5', 'szuper.vendeg@szuper.com', '00-Vendég-05');
let eskuvoVendeg6 :User = eventService.registerParticipant(eventId5, 'Eskövő vendég 6', 'szuper.vendeg@szuper.com', '00-Vendég-06');

eventService.printEvent(eventId5);
eventService.printParticipant(eventId5);
