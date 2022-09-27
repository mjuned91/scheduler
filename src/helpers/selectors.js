export default function getAppointmentsForDay(state, day) {
    const selectedDay = state.days.length ? state.days.find(item => item.name === day) : undefined;
    const days = selectedDay ? selectedDay.appointments : [];
    return days.map(day => state.appointments[day]);
};