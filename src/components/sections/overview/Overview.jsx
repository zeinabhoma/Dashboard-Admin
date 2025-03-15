import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import "./Overview.css";

const iconMap = {
  shopping_cart: (
    <ShoppingCartIcon fontSize="small" sx={{ color: "#FF5733" }} />
  ),
  payment: <PaymentIcon fontSize="small" sx={{ color: "#4CAF50" }} />,
  inventory_2: <Inventory2Icon fontSize="small" sx={{ color: "#2196F3" }} />,
  design_services: (
    <DesignServicesIcon fontSize="small" sx={{ color: "#FFC107" }} />
  ),
};

export default function Overview() {
  const [overviewData, setOverviewData] = useState([]);

  const fetchOverviewData = async () => {
    const querySnapshot = await getDocs(collection(db, "Overviews"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOverviewData(data);
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);
  return (
    <Card elevation={1} className="cardContainer">
      <CardContent>
        <Box>
          <Typography variant="h6">Orders Overview</Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            {/* <ArrowUpwardIcon color="success" /> */}
            <Typography variant="button" color="primary" sx={{ marginLeft: 1 }}>
              24%
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginLeft: 1 }}
            >
              this month
            </Typography>
          </Box>
          <Divider />
          {overviewData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                padding: 1,
              }}
            >
              <Box>
                {iconMap[item.icon] || (
                  <ShoppingCartIcon fontSize="small" color="primary" />
                )}
              </Box>

              <Box ml={2}>
                <Typography variant="button">{item.title}</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {item.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
