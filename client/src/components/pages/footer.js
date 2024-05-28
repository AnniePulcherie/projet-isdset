import { faEnvelope, faLink, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="  styleFooter">
        
            <div className="mycontainer">
            <div className="contact">
              <h5 className="text-center">SIEGE :</h5>
              <p className="text-center">Villa Les Fleuron,</p>
              <p className="text-center"> <FontAwesomeIcon icon={faMapMarkerAlt} />Lot A0313A Plle 11/47 Carreau N°03 B</p>
              <p className="text-center">Mangarano Tamatave (En face du Coiffeur Fivarotankazo REGION)</p>
              <div className="col-12 text-center">
                <p>Partenaire : HapinessSchool, Université UPI TANA (habilité, FOP)</p>
              </div>
            </div>
            <div className="contact">
              <div className="item">
                <FontAwesomeIcon icon={faPhone} />
                <p className="text-center"> 0346813448 – 0340373907</p>
              </div>
              <div className="item">
                <FontAwesomeIcon icon={faEnvelope} />
                <p className="text-center"> isdsetuniversity@gmail.com</p>
              </div>
              <div className="item">
              <FontAwesomeIcon icon={faLink} />
              </div>
            
            </div>
            </div>
            
        
      </footer>
    </div>
  );
};

export default Footer;
