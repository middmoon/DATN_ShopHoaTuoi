import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import EventProductCard from "./EventProductCard";
import apiv1 from "../../utils/axiosClient";

export default function EventDetail() {
  const { slug } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await apiv1.get(`/event/${slug}`);
        setEventDetail(response.data.data);
      } catch (err) {
        setError("Không thể tải dữ liệu sự kiện.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [slug]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Đang tải dữ liệu...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  // Hàm chuyển đổi link ảnh Google Drive sang dạng link trực tiếp
  const getDirectImageURL = (url) => {
    if (!url) return "https://via.placeholder.com/150?text=No+Image";
    const match = url.match(/(?:id=|\/d\/)([^/&?]+)/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}=s1000` : url;
  };

  const { name, discription, start_date, end_date, discount_type, discount_value, thumbnail, Products } = eventDetail;
  const eventThumbnail = getDirectImageURL(thumbnail);

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          bgcolor: "white",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Thumbnail nhỏ của sự kiện chiếm khoảng 3/12 */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardMedia component="img" image={eventThumbnail} alt={name} sx={{ width: "100%", height: 200, objectFit: "cover" }} />
            </Card>
          </Grid>
          {/* Thông tin chi tiết của sự kiện chiếm khoảng 9/12 */}
          <Grid item xs={12} md={9}>
            <Typography variant="h3" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {discription}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="subtitle1">
                  Thời gian: {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Giảm giá: {discount_value.toLocaleString("vi-VN")} {discount_type === "fixed" ? "VND" : "%"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Sản phẩm tham gia
          </Typography>
          <Grid container spacing={4}>
            {Products.map((product) => {
              const avatarImage = getDirectImageURL(
                product.ProductImages?.find((img) => img.is_avatar)?.img_url || product.ProductImages?.[0]?.img_url
              );

              return (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <EventProductCard
                    image={avatarImage}
                    name={product.name}
                    price={product.retail_price.toLocaleString() + " VND"}
                    sale_price={product.sale_price.toLocaleString() + " VND"}
                    isSale={!!product.sale_price}
                    link={`/productdetail/${product.slug}`}
                    category={null} // Cập nhật nếu có dữ liệu category
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
