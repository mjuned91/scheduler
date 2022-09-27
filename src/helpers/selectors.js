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
  console.log(interview);
  return result;
};