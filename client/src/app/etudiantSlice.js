// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const etudiantSlice = createSlice({
  name: 'etudiant', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setEtudiant: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearEtudiant: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setEtudiant, clearEtudiant } = etudiantSlice.actions;
export default etudiantSlice.reducer;
