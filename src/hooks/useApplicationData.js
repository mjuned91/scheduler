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

    // Function to calculate spots remaining for a day
    function spotsRemaining (state) {
      // What is the current day?
      const currentDay = state.day;
  
      // What is the current day object?
      const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay);
      const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === currentDay);
  
      // What are appointment for the current day object?
      const listOfAppts = currentDayObj.appointments;
  
      // Are these appointments free? Only return if null!
      const listOfFreeAppts = listOfAppts.filter(apptId => !state.appointments[apptId].interview);
  
      // What are the new number of spots?
      const newSpots = listOfFreeAppts.length;
  
      // // Make sure not to impact state directly! Insert changes into a copy.
      const stateCopy = { ...state }; // Makea copy of current state
      stateCopy.days = [ ...state.days]; // Make a copy of current state days
      const updatedDay = {...currentDayObj}; // Make a copy of the currentDayObj. Why? .filter and .find create a new array but with reference to the orignal.
  
      // Insert changes
      updatedDay.spots = newSpots;
      stateCopy.days[currentDayObjIndex] = updatedDay;
  
      return stateCopy;
    }

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

      setState(spotsRemaining({
        ...state, 
        appointments      
      }))
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

      setState(spotsRemaining({
        ...state, 
        appointments      
      }))
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
};