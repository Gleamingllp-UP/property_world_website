import moment from 'moment';

const Dformat = [
  'date',
  'dateTablet',
  'dateHiphonYearStart',
  'dateHiphonDateStart',
  'time',
  'dateSlash',
  'timedate',
  'dateTime',
  'day',
  'string',
  'utcToLocalTimedate',
  'dateSlashMonthDate',
  'other',
  'dateSlashMonth',
  'timeWithDate',
  'googleEvent',
  'monthYear',
  'dateTimeWithMeridiem',
  'year',
  'monthYearWithSpace'
];

const formatDate = (date, format) => {
  try {
    if (format === 'date') return moment(date).format('DD MMM YYYY');
    else if (format === 'dateTablet') return moment(date).format('DD/MM/YYYY');
    else if (format === 'monthYearWithSpace') return moment(date).format('MMM YYYY');
    else if (format === 'monthYear') return moment(date).format('MMM YYYY');
    else if (format === 'year') return moment(date).format('YYYY');
    else if (format === 'dateHiphonYearStart') return moment(date).format('YYYY-MM-DD');
    else if (format === 'dateHiphonDateStart') return moment(date).format('DD-MM-YYYY');
    else if (format === 'time') return moment(date).format('hh:mmA');
    else if (format === 'dateSlash') return moment(date).format('DD/MM/YYYY');
    else if (format === 'timedate') return moment(date).format('LT, DD MMM YYYY');
    else if (format === 'dateTime') return moment(date).format('DD MMM YYYY HH:mm:ss');
    else if (format === 'day') return moment(date).format('dddd');
    else if (format === 'string') return moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
    else if (format === 'utcToLocalTimedate') return moment.utc(date).local().format('hh:mm A, DD MMM YYYY');
    else if (format === 'dateSlashMonthDate') return moment(date).format('MM/DD/YYYY');
    else if (format === 'dateSlashMonth') return moment(date).format('DD/MMM/YYYY');
    else if (format === 'timeWithDate') return moment(date).format('hh:mm A, DD MMM YYYY');
    else if (format === 'googleEvent') {
      return moment(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    } else if (format === 'dateTimeWithMeridiem') {
      return moment(date).format('DD MMM YYYY HH:mmA');
    } else return moment(date).format();
  } catch (err) {
    console.error(
      'formatDate in src/common/utils/formatDate.js failed with error -> ',
      err,
    );
  }
};

export { Dformat, formatDate };