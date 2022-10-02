import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const dayURL = `http://localhost:8001/api/days`;
  const appURL = `http://localhost:8001/api/appointments`;
  const intURL = `http://localhost:8001/api/interviewers`;

  useEffect(() => {
    Promise.all([
      axios.get(dayURL),
      axios.get(appURL),
      axios.get(intURL)
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    });
  }, [appURL, dayURL, intURL]);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview: {...interview}})
    .then(() =>  {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state, 
        appointments: appointments      
      })
    })
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() =>  {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state, 
        appointments: appointments      
      })
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
};