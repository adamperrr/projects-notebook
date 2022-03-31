import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ m: 5 }}>
      <Typography
        variant="overline"
        display="block"
        align="center"
        gutterBottom
      >
        Copyright &copy; Adam Pertek 2022
      </Typography>
    </Box>
  );
};

export default Footer;
