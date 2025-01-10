export const courseStatusOptions = [
  {
    label: "Upcoming",
    value: "UPCOMING",
  },
  {
    label: "Ongoing",
    value: "ONGOING",
  },
  {
    label: "Ended",
    value: "ENDED",
  },
];
const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));