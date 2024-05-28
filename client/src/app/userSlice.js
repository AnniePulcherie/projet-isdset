// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearUser: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
