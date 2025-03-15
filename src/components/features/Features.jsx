import React, {useState}  from 'react';
import "./Features.css";
import {Box, Grid, Card, Typography, Divider} from '@mui/material';
import WeekendIcon from '@mui/icons-material/Weekend';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Features() {

  const [features, setFeatures] = useState([
    {
      icon: <WeekendIcon style={{ color: "#fff" }} />,
      title: "Total Books",
      value: "1,500",
      description1: "+10%",
      description2: "added this month",
      bgColor: "linear-gradient(195deg, #42424a, #191919)",
    },
    {
      icon: <LeaderboardIcon style={{ color: "#fff" }} />,
      title: "Revenue Today",
      value: "$2,300",
      description1: "+15%",
      description2: "than yesterday",
      bgColor: "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
    },
    {
      icon: <StoreIcon style={{ color: "#fff" }} />,
      title: "Active Users",
      value: "34k",
      description1: "+12%",
      description2: "new users today",
      bgColor: "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
    },
    {
      icon: <PersonAddIcon style={{ color: "#fff" }} />,
      title: "Orders This Week",
      value: "91",
      description1: "+20%",
      description2: "this week",
      bgColor: "linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))",
    },
  ]);
    
  return (
    <Box sx={{flexGrow:1,  padding: { xs: 0, sm: 1, md: 3 }}}>
        <Grid container spacing={3}>
            {features.map((feature, index) =>{
                return(
                 <Grid item style={{marginTop:'1rem'}} xs={12} sm={6} md={3} key={index}>
                    <Card className='cardItem'>
                        <Box className='boxItem'>
                            <Box className='featureTop'>
                             <span className='featureIconSpan' style={{
                                background:feature.bgColor
                             }}>
                              {feature.icon}
                             </span>
                             <Box className='featureDir'>
                              <Typography 
                                // variant="button" 
                                className="featureTitle"
                                >
                                  {feature.title}
                                </Typography>
                              <Typography variant="h4" className="featureNum">{feature.value}</Typography>
                             </Box>
                            </Box>
                            <Divider/>
                            <Box p={2}>
                            <Typography className="featureBottom">
                                <span style={{ color: "green" }}>{feature.description1} </span> {feature.description2}
                            </Typography>
                            </Box>
                        </Box>
                    </Card>
                 </Grid>
                )
            })}
        </Grid>
    </Box>
  )
}
