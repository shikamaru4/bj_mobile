require.config({
  baseUrl: '../src/scripts/',
  map: {
    '*': {
      'css': 'require-css/css'
    }
  },
  shim : {
    'swiper'      : ["jquery","css!../styles/swiper-3.3.1.min.css"],
    'select'      : ["jquery"],
    'calendar'    : ["jquery","css!./calendar.css"],
    'datepicker'  : ["jquery","css!../styles/calendar.css","css!../styles/datepicker3.css"],
    'calendar-r'  : ["jquery","css!./calendar-r.css"]
  },
  paths: {
    'jquery'      : 'jquery/1.7.2/jquery-1.7.2.min',
    'swiper'      : 'swiper/swiper-3.3.1.jquery.min',
    'calendar'    : 'calendar/calendar',
    'datepicker'  : 'datepicker/bootstrap-datepicker',
    'calendar-r'  : 'calendar-range/calendar-r'
  }
});
