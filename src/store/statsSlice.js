import { createSlice } from "@reduxjs/toolkit";
import { FaUserGraduate, FaBookOpen, FaChalkboardTeacher, FaAward } from "react-icons/fa";

const initialState = {
  stats: [
    { id: 1, icon: FaUserGraduate, value: 5000, label: "Students" },
    { id: 2, icon: FaBookOpen, value: 120, label: "Courses" },
    { id: 3, icon: FaChalkboardTeacher, value: 20, label: "Teachers" },
    { id: 4, icon: FaAward, value: 1000, label: "Graduates" },
  ],
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
});

export default statsSlice.reducer;
