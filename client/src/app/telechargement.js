
import { createSlice } from '@reduxjs/toolkit';

const telechargementSlice = createSlice({
  name: 'nombreTelechargement', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setNombreTelechargement: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearNombreTelechargement: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setNombreTelechargement, clearNombreTelechargement } = telechargementSlice.actions;
export default telechargementSlice.reducer;
