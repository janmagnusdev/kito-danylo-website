import { createSignal, onCleanup, onMount } from "solid-js";
import { DateTime, IANAZone } from "luxon";
import { styled } from "solid-styled-components";

const weekDayCoachingMap = {
  1: 2,
  2: 3,
  3: 2,
  4: 5,
  5: 3,
  6: 5,
  7: 0,
} as const;

const CUTOFF_DATE = DateTime.fromObject({ day: 23, month: 11, year: 2024 });
const INITIAL_COUNT = 2547;
const WORKING_START = 19;
const WORKING_END = 9;

const getCoachingsForDay = (date: DateTime): number => {
  const scaleFactor = 0.7;
  const dateBased = date.get("weekday") as keyof typeof weekDayCoachingMap;
  const monthBased = Math.ceil(date.get("month") / 4);
  const dayInMonthBased = Math.ceil(date.get("daysInMonth") / 10);
  return Math.round((dateBased + monthBased + dayInMonthBased) * scaleFactor);
};

const getProportionalCoachingsForDay = (date: DateTime): number => {
  // proportional increment of last date (today)
  const wouldBe = getCoachingsForDay(date);
  // 9 is 0, and 19 is full
  const percentage = Math.max(
    Math.min(
      (date.get("hour") - WORKING_START) / (WORKING_END - WORKING_START),
      1,
    ),
    0,
  );
  return Math.round(percentage * wouldBe);
};

const simulateCoachings = (forDate: DateTime): number => {
  let counter = INITIAL_COUNT;

  const yesterday = forDate.minus({ day: 1 }).set({ hour: 9 });
  const countDaysBetween = Math.ceil(
    yesterday.diff(CUTOFF_DATE, ["days"])["days"],
  );
  for (let i = 0; i <= countDaysBetween; i++) {
    counter += getCoachingsForDay(CUTOFF_DATE.plus({ days: i }));
  }

  counter += getProportionalCoachingsForDay(forDate);

  return counter;
};

const StyledCounter = styled.span`
  --hue-start: 25;
  --hue-end: 98;
  --vp-c-brand-1: hsl(var(--hue-start) 67.6 51.6);
  --vp-c-brand-next: hsl(var(--hue-end) 50.2 41.8);
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    var(--vp-c-brand-1) 30%,
    var(--vp-c-brand-next)
  );
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  color: transparent;
`;

const CoachingCounterComponent = () => {
  const timeZone = IANAZone.create("Europe/Berlin");

  let now = DateTime.now().setZone(timeZone);

  const startCoachings = simulateCoachings(now);
  let [counter, _setCounter] = createSignal(startCoachings);
  let counterRef!: HTMLSpanElement;
  let interval: ReturnType<typeof setInterval>;
  let hueStart = 25;
  let hueEnd = 98;

  onMount(() => {
    interval = setInterval(() => {
      hueStart = hueStart + 3;
      hueEnd = hueEnd + 3;
      hueStart = hueStart < 360 ? hueStart : 0;
      hueEnd = hueEnd < 360 ? hueEnd : 0;

      counterRef.style.setProperty("--hue-start", `${hueStart}`);
      counterRef.style.setProperty("--hue-end", `${hueEnd}`);
    }, 75);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <div class="flex flex-col justify-center items-center w-full h-full">
      <div class="w-full tabular-nums">
        {now.setLocale("de").toFormat("ff")}
      </div>
      <div class="w-full">
        <StyledCounter class="font-bold" ref={counterRef}>
          {counter()}
        </StyledCounter>{" "}
        Coachings bis jetzt
      </div>
    </div>
  );
};

export default CoachingCounterComponent;
