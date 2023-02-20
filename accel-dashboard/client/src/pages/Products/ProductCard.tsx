import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { ProductType } from "../../state/types";

interface Props {
  data: ProductType;
}

const ProductCard: React.FC<Props> = ({ data }: Props) => {
  // Mongoose Document
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const product = data;

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary.dark}
          gutterBottom
        >
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary.main}>
          ${Number(product.price).toFixed(2)}
        </Typography>
        <Rating value={product.rating} readOnly />

        <Typography variant="body2">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.secondary.light,
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Read {isExpanded ? "Less" : "More"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.secondary.light,
        }}
      >
        <CardContent >
          <Typography>id: {product._id}</Typography>
          <Typography>Supply Left: {product.supply}</Typography>
          <Typography>
            Yearly Sales This Year: {product.stats.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {product.stats.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default ProductCard;
