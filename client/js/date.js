// Date
function formatDate(date) {
  let dates = date.split(' ');
  let dd = Number(dates[2]);
  let yy = Number(dates[3]);
  let day = null;
  switch (dates[0]) {
    case 'Mon':
      day = 'Monday';
      break;
    case 'Tue':
      day = 'Tuesday'
      break;
    case 'Wed':
      day = 'Wednesday'
      break;
    case 'Thu':
      day = 'Thursday'
      break;
    case 'Fri':
      day = 'Friday'
      break;
    case 'Sat':
      day = 'Saturday'
      break;
    case 'Sun':
      day = 'Sunday'
      break;
  }
  let mm = null;
  switch (dates[1]) {
    case 'Jan':
      mm = 'Jan';
      break;
    case 'Feb':
      mm = 'Feb'
      break;
    case 'Mar':
      mm = 'Mar'
      break;
    case 'Apr':
      mm = 'Apr';
      break;
    case 'May':
      mm = 'May'
      break;
    case 'Jun':
      mm = 'Jun'
      break;
    case 'Jul':
      mm = 'Jul';
      break;
    case 'Aug':
      mm = 'Aug'
      break;
    case 'Sep':
      mm = 'Sep'
      break;
    case 'Oct':
      mm = 'Oct'
      break;
    case 'Nov':
      mm = 'Nov'
      break;
    case 'Dec':
      mm = 'Dec'
      break;
  }
  return `${day}, ${dd} ${mm} ${yy}`
}

