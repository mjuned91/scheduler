export function getAppointmentsForDay(state, day) {
    const selectedDay = state.days.length ? state.days.find(item => item.name === day) : undefined;
    const appointments = selectedDay ? selectedDay.appointments : [];
    return appointments.map(appointment => state.appointments[appointment]);
};

export function getInterview(state, interview) {
  if (!interview) {
    return null
  };

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result;
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.length ? state.days.find(item => item.name === day) : undefined;
  const interviewers = selectedDay ? selectedDay.interviewers : [];
  return interviewers.map(interviewer => state.interviewers[interviewer]);
};