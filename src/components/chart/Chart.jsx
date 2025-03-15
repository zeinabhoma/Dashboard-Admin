import React from 'react';
import './Chart.css';
import {Grid, Box, Divider, Typography} from '@mui/material';
import {ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip, LineChart, Line} from 'recharts';
import { websiteViews } from '../../datas';
import { dailySales } from '../../datas';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Chart() {
  return (
   <Box 
    sx={{flexGrow:1, padding: { xs: 0, sm: 1, md: 3 }, marginTop: {xs:4,md:1}}} 
   >
    <Grid container spacing={3}>
      
      <Grid item xs={12} md={7}>
         <Box className='chartBox'>
            <div className='lineChart'>
              <ResponsiveContainer>  
                <LineChart data={dailySales}>  
                  <CartesianGrid strokeDasharray="1 1" stroke="rgba(255, 255, 255, 0.5)" />  
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "#fff" , fontSize:"small"}} 
                    tickFormatter={(tick) => tick.substring(0, 3)}  
                    angle={-45}  
                    textAnchor="end"  />  
                  <YAxis 
                    dataKey="sales" 
                    tick={{ fill: "#fff", fontSize:"small" }}
                    // domain={[0, 'dataMax']}
                    />  
                  <Tooltip contentStyle={{ backgroundColor: "rgb(136, 138, 146)", border: "none", borderRadius:"8px" }} itemStyle={{ color: "#fff" }} />  
                  <Line type="monotone" dataKey='sales' stroke="#fff" />  
                </LineChart>  
              </ResponsiveContainer>
            </div>
            <div className='bottomChart'>
            <Typography className='titleChart'>
              daily sales
            </Typography>
            <Typography className='mainTextTop'>
              (+15%) increase in today sales.
            </Typography>
            <Divider className='hrChart'/>
            <div className='mainTextBottom'>
              <AccessTimeIcon className='timeIcon'/>
              <Typography className='timeIconText'>
                updated 4 min ago
              </Typography>
            </div>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={5}>
         <Box className='chartBox'>
          <div className='barChart'>
           <ResponsiveContainer>
              <BarChart
              data={websiteViews}
              >
                <CartesianGrid strokeDasharray="1 1" stroke="rgba(250, 250, 250, 0.5)"  />
                <XAxis dataKey="day" tick={{ fill: "#fff" , fontSize:"small"}}  tickFormatter={(tick) => tick.charAt(0)} />
                <YAxis dataKey="views" tick={{ fill: "#fff", fontSize:"small" }} />
                <Tooltip contentStyle={{ backgroundColor: "rgb(136, 138, 146)", border: "none", borderRadius:"8px" }} itemStyle={{ color: "#fff" }}/>
                <Bar dataKey="views" fill="#fff" radius={[10, 10, 0, 0]} barSize={10}/>
              </BarChart>
           </ResponsiveContainer>
          </div>
          <div className='bottomChart'>
            <Typography className='titleChart'>
              website views
            </Typography>
            <Typography className='mainTextTop'>
              Last Campaign Performance
            </Typography>
            <Divider className='hrChart'/>
            <div className='mainTextBottom'>
              <AccessTimeIcon className='timeIcon'/>
              <Typography className='timeIconText'>
                campaign sent 2 days ago
              </Typography>
            </div>
          </div>
        </Box>
    </Grid>
    </Grid>
  </Box>
  )
}
