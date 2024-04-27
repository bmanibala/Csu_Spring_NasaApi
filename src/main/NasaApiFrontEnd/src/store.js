
import axios from 'axios';
import dayjs from 'dayjs';
import { create } from 'zustand';

export const useStore = create((set, get) => ({
  selectedDate: '',
  apod: null,
  count: '',
  startDate: null,
  endDate: null,
  results: [],

  setSelectedDate: (newValue) => set({ selectedDate: newValue }),
  setApod: (newValue) => set({ apod: newValue }),
  setCount: (newValue) => set({ count: newValue }),
  setStartDate: (newValue) => set({ startDate: newValue }),
  setEndDate: (newValue) => set({ endDate: newValue }),
  setResults: (newValue) => set({ results: newValue }),

  //   fetchAPOD: async (date) => {
  fetchAPOD: async () => {
    const date = get().selectedDate;
    if (!date) set({selectedDate: dayjs()});
    
    console.log("running fetchAPOD with date", date);
    const dateformat = date.format('YYYY-MM-DD');
    //  calling log `/apod?$date=${date}`
    console.log(`/apod?$date=${dateformat}`);
    try {
      const data = await axios.get(`/apod?date=${dateformat}`);
      console.log(data.data[0]);
      set({ apod: data.data[0] });
      console.log(data.data[0]);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    }
  },

  iHandleSubmitForm2: async () => {

    const count = get().count;
    console.log("running ihandlesubmitform2 with count", count);
    const apiUrl = `/apod?count=${count}`;

    try {
      const response = await axios.get(apiUrl);
      set({ results: response.data });
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      set({ results: [] });
    }
  },

  iHandleSubmitForm3: async () => {
    const startDate = get().startDate;
    const endDate = get().endDate;
    console.log("running ihandlesubmitform3 with startdate and enddate", startDate, endDate);
    if (!startDate || !endDate || startDate.isAfter(endDate)) {
      alert("Please select a valid date range where start date is not after end date.");
      return;
    }

    const startDateFormat = startDate.format('YYYY-MM-DD');
    const endDateFormat = endDate.format('YYYY-MM-DD');
    const apiUrl = `/apod?start_date=${startDateFormat}&end_date=${endDateFormat}`;

    try {
      const response = await axios.get(apiUrl);
      set({ results: response.data });
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      set({ results: [] });
    }
  },
}
));
