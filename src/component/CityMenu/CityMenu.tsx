import "./CityMenu.scss";

import React from "react";
import { useAppSelector } from "@hook";

import { CityCardMenu } from "@component/CityCardMenu";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

type Anchor = string;

export const CityMenu: React.FC = () => {
  const historyCities = useAppSelector((state) => state.history.history);

  const [state, setState] = React.useState({
    right: false,
  });

  const anchor = "right";

  const toggleDrawer = (open: boolean) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {historyCities.map((city) => (
          <div key={city.lat}>
            <CityCardMenu city={city} />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {historyCities.length && (
        <div>
          <React.Fragment>
            <Badge badgeContent={historyCities.length} color="primary">
              <Button
                onClick={toggleDrawer(true)}
                sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                Saved cities
              </Button>
            </Badge>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        </div>
      )}
    </div>
  );
};
