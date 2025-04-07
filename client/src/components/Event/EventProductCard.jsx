import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

export default function EventProductCard({ image, name, price, isSale, link, category, sale_price }) {
  return (
    <Link to={link} style={{ textDecoration: "none", width: "100%" }}>
      {" "}
      <Card
        sx={{
          width: "100%",
          borderRadius: "16px",
          boxShadow: 3,
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "240px" }}>
          <CardMedia component="img" image={image} alt={name} sx={{ height: "100%", objectFit: "cover", borderRadius: "16px" }} />
          {isSale && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "red",
                color: "white",
                padding: "8px 12px",
                borderBottomRightRadius: "16px",
                fontSize: "14px",
              }}
            >
              Giảm Giá
            </Box>
          )}
        </div>

        <CardContent>
          <Typography
            variant="body2"
            align="center"
            sx={{ fontWeight: "600", color: "gray", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center" }}
          >
            {name}
          </Typography>

          <Typography variant="body2" align="center" sx={{ textDecoration: "line-through", color: "gray", marginTop: 1 }}>
            {price}
          </Typography>

          <Typography variant="body2" align="center" sx={{ fontWeight: "600", color: "gray", marginBottom: 2 }}>
            {sale_price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            Mua ngay
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
