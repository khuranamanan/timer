import { useState, useRef } from "react";
import { convertToMs, convertToTime } from "../Utils/timeConversionUtils";
import { toast } from "react-toastify";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTimeMs, setRemainingTimeMs] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  function stopTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemainingTimeMs(0);
    startTimeRef.current = 0;
  }

  function startTimer() {
    const totalMilliseconds = convertToMs(hours, minutes, seconds);

    if (totalMilliseconds <= 0) {
      toast.error("Enter valid time");
      return;
    }

    if (hours < 0 || minutes < 0 || seconds < 0) {
      toast.error("Enter valid time");
      return;
    }

    setIsRunning(true);
    // console.time("startTimer");
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const remainingTimeinMs = totalMilliseconds - elapsedTime;

      if (remainingTimeinMs <= 0) {
        stopTimer();
        toast.success("Timer Completed");
        // console.timeEnd("startTimer");
        return;
      }

      setRemainingTimeMs(remainingTimeinMs);
    }, 100);
  }

  function resetTimer() {
    if (isRunning) {
      stopTimer();
    }
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    toast.dismiss();
  }

  const remainingTime =
    remainingTimeMs === 0
      ? { hours, minutes, seconds }
      : convertToTime(remainingTimeMs);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="hours">Hours</label>
          <select
            id="hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-20 p-2 border border-gray-200 rounded appearance-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
            disabled={isRunning}
          >
            {Array.from({ length: 25 }, (_, i) => i).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="minutes">Minutes</label>
          <select
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            className="w-20 p-2 border border-gray-200 rounded appearance-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
            disabled={isRunning}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="seconds">Seconds</label>
          <select
            id="seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            className="w-20 p-2 border border-gray-200 rounded appearance-none focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
            disabled={isRunning}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((second) => (
              <option key={second} value={second}>
                {second}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Stop
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div>
        <p className="text-xl">
          {`${String(remainingTime?.hours).padStart(2, "0")}:${String(
            remainingTime?.minutes
          ).padStart(2, "0")}:${String(remainingTime?.seconds).padStart(
            2,
            "0"
          )}`}
        </p>
      </div>
    </div>
  );
}

export default Timer;
