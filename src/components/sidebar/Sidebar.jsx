import React from 'react';
import './Sidebar.css';
import { Drawer, List, ListItemText, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Sidebar({open, onClose}) {

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      // sx={{
      //   width: 240,
      //   flexShrink: 0,
      //   '& .MuiDrawer-paper': {
      //     width: 240,  
      //     flexShrink:0
      //   },
      // }}
      className='dashboard'
    >
      <Toolbar />
      <List>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Dashboard" />
        </NavLink>
        <NavLink 
          to="/users" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Users" />
        </NavLink>
        <NavLink 
          to="/books" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Books" />
        </NavLink>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Orders" />
        </NavLink>
        <NavLink 
          to="/inventory" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Inventory" />
        </NavLink>
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => isActive ? 'active sidebarItem' : 'sidebarItem'}
          // onClick={onClose}
        >
          <ListItemText primary="Analytics" />
        </NavLink>
      </List>
    </Drawer>
  );
};


