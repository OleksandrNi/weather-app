import './CityMenu.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import {CityCardMenu} from '../CityCardMenu';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

export const CityMenu = () => {

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

  return (
    <div>
      {historyCities.length && <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Badge badgeContent={historyCities.length} color="primary">
              <Button onClick={toggleDrawer(anchor, true)} sx={{color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                Saved cities
              </Button>
            </Badge>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>}
    </div>
  )
};
