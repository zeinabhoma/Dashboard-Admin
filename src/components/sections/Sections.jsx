import React from 'react';
import { Box, Grid } from '@mui/material';
import Overview from './overview/Overview';
import TopBooks from './topBooks/TopBooks';
import './Sections.css';

export default function Sections() {
  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 0, sm: 1, md: 3 }, marginTop: { xs: 3, md: 0 } }}>
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12} sm={6} md={7} sx={{ display: "flex" }}>
        <TopBooks sx={{ flex: 1 }} />
      </Grid>
      <Grid item xs={12} sm={6} md={5} sx={{ display: "flex" }}>
        <Overview sx={{ flex: 1 }} />
      </Grid>
    </Grid>
  </Box>

  );
}
