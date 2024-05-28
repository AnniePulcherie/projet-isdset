
import { createSlice } from '@reduxjs/toolkit';

const formationsSlice = createSlice({
  name: 'formations', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setFormations: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearFormations: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setFormations, clearFormations } = formationsSlice.actions;
export default formationsSlice.reducer;
