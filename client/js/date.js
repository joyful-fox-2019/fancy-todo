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
      mm = 'January';
      break;
    case 'Feb':
      mm = 'February'
      break;
    case 'Mar':
      mm = 'March'
      break;
    case 'Apr':
      mm = 'April';
      break;
    case 'May':
      mm = 'May'
      break;
    case 'Jun':
      mm = 'June'
      break;
    case 'Jul':
      mm = 'July';
      break;
    case 'Aug':
      mm = 'August'
      break;
    case 'Sep':
      mm = 'September'
      break;
    case 'Oct':
      mm = 'October'
      break;
    case 'Nov':
      mm = 'November'
      break;
    case 'Dec':
      mm = 'December'
      break;
  }
  return `${day}, ${dd} ${mm} ${yy}`
}

