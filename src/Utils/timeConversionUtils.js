function convertToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return { hours, minutes, seconds };
}

// function convertToTime(totalMilliseconds) {
//   const totalSeconds = Math.floor(totalMilliseconds / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return {
//     hours: hours,
//     minutes: minutes,
//     seconds: seconds,
//   };
// }

function convertToMs(hours, minutes, seconds) {
  const hoursInMilliseconds = hours * 3600000;
  const minutesInMilliseconds = minutes * 60000;
  const secondsInMilliseconds = seconds * 1000;

  return hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
}

export { convertToMs, convertToTime };
