import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";

// Komponen untuk fetching data
async function fetchData() {

    return [];
  }

const Artikel = async () => {
  const data = await fetchData();

  const renderSkeleton = () => (
    <Card sx={{ width: 300, m: 1 }}>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );

  const renderCard = (artikel) => (
    <Card sx={{ width: 300, m: 1 }} key={artikel.id}>
      <CardMedia
        component="img"
        height="140"
        image={artikel.image}
        alt={artikel.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {artikel.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artikel.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {data.length > 0
        ? data.map((artikel) => renderCard(artikel))
        : Array.from({ length: 3 }).map((_, index) => (
            <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
          ))}
    </Box>
  );
};

export default Artikel;
