import theme from 'theme';
import moment from 'moment';

import borgore from 'assets/dj/borgore.jpg';
import camokrooked from 'assets/dj/camo&krooked.jpg';
import downlink from 'assets/dj/downlink.jpg';
import edrushoptical from 'assets/dj/edrushoptical.jpg';
import megamidnight from 'assets/dj/megamidnight.jpg';
import AMCTurno from 'assets/dj/AMCTurno.jpg';
import agressorbunxpythius from 'assets/dj/agressorbunxpythius.jpg';
import soltan from 'assets/dj/soltan.jpg';
import cookerzcrew from 'assets/dj/cookerzcrew.jpg';
import fourhorsement from 'assets/dj/fourhorsement.jpg';

export const TIME_LINE = [
  {
    time: '21:00',
    key: 'BGR',
    title: 'BORGORE',
    description: 'Event 1 Description',
    picture: borgore,
    lineColor: 'white',
  },
  {
    time: '22:00',
    key: 'CAK',
    title: 'CAMO & KROOKED',
    description: 'Event 2 Description',
    picture: camokrooked,
    lineColor: theme.colors.accent,
  },
  {
    time: '23:00',
    key: 'DLK',
    title: 'DOWNLINK',
    description: 'Event 3 Description',
    picture: downlink,
    circleColor: theme.colors.primaryLight,
  },
  {
    time: '00:00',
    key: 'EDO',
    title: 'ED RUSH x OPTICAL',
    description: 'Event 4 Description',
    picture: edrushoptical,
  },
  {
    time: '01:00',
    key: 'MMT',
    title: 'MEGALODON x M.TYRANNOSAURUS',
    description: 'Event 5 Description',
    picture: megamidnight,
  },
  {
    time: '02:00',
    key: 'AAT',
    title: 'A.M.C & TURNO',
    description: 'Event 4 Description',
    picture: AMCTurno,
  },
  {
    time: '03:00',
    key: 'FHT',
    title: 'Four Horsemen Tour World',
    description: 'IVORY x ECRAZE x GRAPHYT x SAMPLIFIRE',
    picture: fourhorsement,
  },
  {
    time: '04:00',
    key: 'ABP',
    title: 'AGRESSOR BUNX x PYTHIUS',
    description: 'Event 4 Description',
    picture: agressorbunxpythius,
  },
  {
    time: '05:00',
    key: 'SLN',
    title: 'SOLTAN',
    description: 'Event 5 Description',
    picture: soltan,
  },
  {
    time: '06:00',
    key: 'CCW',
    title: 'COOKERZ CREW',
    description: 'ANSWERD x JIQZY x NACHA x PLAYFULL',
    picture: cookerzcrew,
  },
  {
    time: '07:00',
    key: 'END',
  },
];
export const TIME_UNTIL_PARTY = moment('2018-04-21 21:00:00', 'YYYY-MM-DD').diff(
  moment(),
  'seconds',
);
export const TIME_STATUS = ['before', 'now', 'after'];
export const GOOGLE_MAP_API_KEY = 'AIzaSyAR0yOHihuJLQhfAYhH8C4uuoC6VvAiYOU';
