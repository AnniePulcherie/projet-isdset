
import { createSlice } from '@reduxjs/toolkit';

const modulaireSlice = createSlice({
  name: 'modulaire', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setModulaire: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearModulaire: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setModulaire, clearModulaire } = modulaireSlice.actions;
export default modulaireSlice.reducer;
