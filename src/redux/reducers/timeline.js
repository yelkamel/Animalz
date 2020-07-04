import { TIME_LINE, TIME_STATUS } from 'data';
import { getTimeStatus, getColorFromStatus } from 'utils';
import moment from 'moment/moment';
import store from 'react-native-simple-store';

const BEFORE_MD_START = moment('12:00:00', 'HH:mm');
const BEFORE_MD_END = moment('23:59:59 ', 'HH:mm');

function setNotif(state, eventKey) {
  const dataTmp = state.data;
  const eventObject = dataTmp.find((item) => item.key === eventKey);
  let notifListTmp = [];

  if (state.notifList.includes(eventKey)) {
    const index = state.notifList.indexOf(eventKey);
    if (index > -1) {
      state.notifList.splice(index, 1);
      notifListTmp = state.notifList;
    }
  } else {
    notifListTmp = state.notifList.concat(eventObject.key);
  }

  eventObject.hasNotif = !eventObject.hasNotif;
  store.save('notifList', notifListTmp);
  return {
    ...state,
    data: dataTmp,
    notifList: notifListTmp,
  };
}

function loadTimeLine(state, payload) {
  const { notifList } = payload;
  const dataTmp = state.data.reduce((results, event) => {
    // const currentTime = moment();
    const currentTime = moment('23:30', 'HH:mm');

    const startTime = moment(event.time, 'HH:mm');
    let hasNotif = false;

    if (notifList.includes(event.key)) {
      hasNotif = true;
    }
    if (!startTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
      startTime.add(1, 'day');
    }
    if (!currentTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
      startTime.subtract(1, 'day');
    }

    results.push({
      ...event,
      hasNotif,
      momentTime: startTime,
    });
    return results;
  }, []);

  return {
    ...state,
    data: dataTmp,
    isLoading: false,
    notifList,
  };
}

function updateTimeLine(state) {
  let currentEvent = TIME_LINE[TIME_LINE.length - 1];

  const data = state.data.reduce((results, item) => {
    const status = getTimeStatus(item.momentTime);

    if (status === TIME_STATUS[1]) {
      currentEvent = item;
    }
    results.push({
      ...item,
      status,
      lineColor: getColorFromStatus(status),
    });
    return results;
  }, []);

  return {
    ...state,
    data,
    currentEvent,
    isUpdated: true,
    isLoading: false,
  };
}

const defaultState = {
  data: TIME_LINE,
  currentEvent: TIME_LINE[TIME_LINE.length - 1],
  isUpdated: false,
  isLoading: true,
  nextEventIn: 0,
  notifList: [],
};

export default function timeline(state = defaultState, action) {
  const { payload, type } = action;

  switch (type) {
    case 'LOAD':
      return loadTimeLine(state, payload);
    case 'UPDATE':
      return updateTimeLine(state);
    case 'SET_NOTIF':
      return setNotif(state, payload.eventKey);
    case 'SET_NEXT_HOUR_TIME':
      return {
        ...state,
        nextEventIn: payload.inSecond,
      };
    default:
      return state;
  }
}
