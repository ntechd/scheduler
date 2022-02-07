import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = (day) => setState({ ...state, day });
  
  function updateInterviewSpotsRemaining(requestType) {
    const days = state.days.map(day => {
      if (day.name === state.day) {
        if (requestType === 'bookAppointment') {
          return { ...day, spots: day.spots - 1 }
        } else {
          return { ...day, spots: day.spots + 1 }
        }
      } else {
        return {...day}
      }
    })
    return days;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`api/appointments/${id}`, appointment).then((response) => {
        const days = updateInterviewSpotsRemaining('bookAppointment')

      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`api/appointments/${id}`, appointment).then((response) => {

      setState({
        ...state,
        appointments,
      });
    })
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`, )
    .then((response) => {
      const days = updateInterviewSpotsRemaining()
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState({
        ...state,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {setDay, bookInterview, cancelInterview, editInterview, state};
};
