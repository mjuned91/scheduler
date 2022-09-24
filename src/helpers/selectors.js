export function getAppointmentsForDay(state, day) {
    const filteredDays = state.users.filter(user => user.day === day);
    return filteredDays;
};