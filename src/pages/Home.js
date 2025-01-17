import '../styles/App.css';
import { Map } from '../components/Map';
import { Layout } from '../containers/Layout';
import { MapIslands } from '../components/MapIslands';
import { CountryList } from '../containers/CountryDetails';
import { ComparativeTool } from '../containers/ComparativeTool';
import { useState } from 'react';
import { MapStyled } from '../styles/MapStyled';

// import userQueries from './queries.php';

export const Home = () => {
  const [modal, setModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  return (
    <Layout>
      <div className="banner-container">
        <h2 className="banner-title">
          LA DIPLOMACIA DIGITAL DE LA REPÚBLICA POPULAR DE CHINA RPCh EN AMÉRICA
          LATINA Y EL CARIBE
        </h2>
        <p className="banner-desc">
          En esta investigación se recopilaron los resultados obtenidos a partir
          de la revisión de las dinámicas en el uso de las cuentas de Twitter
          pertenecientes a las representaciones y los representantes
          diplomáticos de la RPCh en ALC.
        </p>
      </div>
      <div className="row">
        <MapStyled className="map-container col-7">
      
          <Map setAccounts={setAccounts} />
          
        </MapStyled>
        <div className="col-5">
          <CountryList accounts={accounts} />
          <ComparativeTool />
          
        </div>
      </div>
    </Layout>
  );
};
