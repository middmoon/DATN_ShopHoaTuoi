import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  Box,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function EventPopup({ thumbnail, slug, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${slug}`);
  };

  return (
    <Backdrop
      open
      sx={{
        zIndex: 1300,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Card
        sx={{
          width: 600,
          maxWidth: "95%",
          boxShadow: 12,
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <CardMedia
          component="img"
          image={thumbnail}
          alt="Event Thumbnail"
          sx={{
            height: 360, // to hơn nữa
            objectFit: "cover",
          }}
        />

        <CardActions sx={{ justifyContent: "center", p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Xem khuyến mãi
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
