import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              Z
            </Avatar>
          </Box>
        </Grid>

        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Mark</p>
              <p className="opacity-70">2025-03-12</p>
            </div>
          </div>
          <Rating readOnly value={4.5} precision={0.5} />
          <p>Value for money product, great product!</p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="https://images.unsplash.com/photo-1614495039149-51a3f60bfd2d?q=80&w=1537&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </Grid>
      </Grid>

      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
