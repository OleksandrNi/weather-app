import './CityList.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import {CityCard} from '../CityCard';
import {CityCardMenu} from '../CityCardMenu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

export const CityList = () => {

  const historyCities = useSelector(state => state.history.history);
  
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {historyCities.map(city => <div key={city.lat}>
          <CityCardMenu city={city} />
        </div>
        )}
      </List>
    </Box>
  );

  const historyCitiesLimit = historyCities.slice(0, 8);

  return (
    <div>
      <div className="list__map">
        {historyCities && 
          historyCitiesLimit.map(city => <div key={city.lat}>
            <CityCard city={city} />
          </div>
          )
        }
      </div>

      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} sx={{color: 'orange', fontWeight: 'bold', marginTop: '36px', fontSize: '20px' }}>Open history cities</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};
