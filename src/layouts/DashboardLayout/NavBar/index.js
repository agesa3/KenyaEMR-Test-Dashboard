import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  DollarSign as DollarSignIcon
} from 'react-feather';
import NavItem from './NavItem';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { GiPill } from "react-icons/gi";
import { GrDocumentStore } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { FaBaby,FaWarehouse } from "react-icons/fa";
import { BiClinic } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";

const user = {
  name: 'MEDITECH GROUP 5'
};

const items = [
  {
    href: '/dashboard',
    icon: AiFillDashboard,
    title: 'Dashboard'
  },
  {
    href: '/visits',
    icon: IoIosPeople,
    title: 'Visits'
  },
  {
    href: '/pharmacy',
    icon: GiPill,
    title: 'Pharmacy'
  },
  {
    href: '/accounts',
    icon: MonetizationOnIcon,
    title: 'Accounts'
  },
  {
    href: '/inventory',
    icon: GrDocumentStore,
    title: 'Inventory'
  },
  {
    href: '/laboratory',
    icon: ImLab,
    title: 'Laboratory'
  },
  {
    href: '/maternity',
    icon: FaBaby,
    title: 'Maternity'
  },
  {
    href: '/mchclinic',
    icon: BiClinic,
    title: 'MCH Clinic'
  },
  {
    href: '/mchstores',
    icon: FaWarehouse,
    title: 'MCH Stores'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2"></Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
