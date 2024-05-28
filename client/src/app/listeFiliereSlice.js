
import { createSlice } from '@reduxjs/toolkit';

const listeFilieresSlice = createSlice({
  name: 'listeFilieres', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setListeFilieres: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearListeFilieres: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setListeFilieres, clearListeFilieres } = listeFilieresSlice.actions;
export default listeFilieresSlice.reducer;
