import { Box, Typography } from "@mui/material";

const PageTitle = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" align="center" color="text.primary" gutterBottom>
        {pageTitle}
      </Typography>
    </Box>
  );
};

export default PageTitle;
