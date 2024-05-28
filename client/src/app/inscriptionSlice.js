
import { createSlice } from '@reduxjs/toolkit';

const inscriptionSlice = createSlice({
  name: 'inscription', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setInscription: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearInscription: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setInscription, clearInscription } = inscriptionSlice.actions;
export default inscriptionSlice.reducer;
