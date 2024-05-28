
import { createSlice } from '@reduxjs/toolkit';

const modulesReducer = createSlice({
  name: 'modules', // Nom du "slice"
  initialState: null, // État initial de l'utilisateur
  reducers: {
    setModuleSemestre: (state, action) => {
      return action.payload; // Met à jour l'état de l'utilisateur
    },
    clearModules: (state) => {
      return null; // Réinitialise l'état de l'utilisateur
    },
  },
});

export const { setModuleSemestre, clearModules } = modulesReducer.actions;
export default modulesReducer.reducer;
