import axios from "axios";
import { useState } from "react";

export const ChargerFormations = async (formation) => {
    const [formations, setFormations] = useState([]);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    try {
      const response = await axios.get(`${apiURL}formation`);
      setFormations(response.data);
      formation(response.data);
      console.log(formations);
    } catch (erreur) {
      console.error('Erreur lors du chargement des formations :', erreur);
    }
  };