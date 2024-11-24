import { createSignal } from "solid-js";
import { DateTime, IANAZone } from "luxon";

const weekDayCoachingMap = {
  1: 2,
  2: 3,
  3: 2,
  4: 5,
  5: 3,
  6: 5,
  7: 0,
};

const getCoachingsForDay = (date: DateTime): number => {
  const scaleFactor = 0.7;
  const dateBased = date.get("weekday") as keyof typeof weekDayCoachingMap;
  const monthBased = Math.ceil(date.get("month") / 4);
  const dayInMonthBased = Math.ceil(date.get("daysInMonth") / 10);
  return Math.round((dateBased + monthBased + dayInMonthBased) * scaleFactor);
};

const simulateCoachings = (startDate: DateTime, endDate: DateTime): number => {
  let counter = 0;

  const yesterday = endDate.minus({ day: 1 }).set({ hour: 9 });
  const countDaysBetween = Math.round(
    yesterday.diff(startDate, ["days"])["days"],
  );
  for (let i = 0; i <= countDaysBetween; i++) {
    counter += getCoachingsForDay(startDate.plus({ days: i }));
  }

  // proportional increment of last date (today)
  const wouldBe = getCoachingsForDay(endDate);
  // 9 is 0, and 19 is full
  const percentage = Math.max(
    Math.min((endDate.get("hour") - 9) / (19 - 9), 1),
    0,
  );
  const increment = Math.round(percentage * wouldBe);
  counter += increment;

  return counter;
};

const CoachingCounterComponent = () => {
  const timeZone = IANAZone.create("Europe/Berlin");
  let startDate = DateTime.fromObject(
    { day: 1, month: 1, year: 2024 },
    { zone: timeZone },
  );

  let now = DateTime.now().setZone(timeZone);

  const startCoachings = simulateCoachings(startDate, now);
  let [counter, _setCounter] = createSignal(startCoachings);

  return (
    <div class="flex flex-col text-white justify-center items-center w-full h-full">
      <div class="w-full font-mono">{now.setLocale("de").toFormat("ff")}</div>
      <div class="w-full">
        <span>{counter()}</span> Coachings bis jetzt
      </div>
    </div>
  );
};

export default CoachingCounterComponent;
