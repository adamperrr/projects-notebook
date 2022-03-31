import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  getNextPageYearAndMonth,
  getPrevPageYearAndMonth,
} from "../../../utils/dateHelpers";

const FooterButtons = ({ pageDate }: { pageDate: Date }) => {
  const [prevPageYear, prevPageMonth] = getPrevPageYearAndMonth(pageDate);
  const [nextPageYear, nextPageMonth] = getNextPageYearAndMonth(pageDate);

  return (
    <Container maxWidth="xl" component="main">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Button
            component={Link}
            to={`/${prevPageYear}/${prevPageMonth}`}
            variant="outlined"
          >
            &lt; Previous month
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Button variant="contained">Generate report</Button>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Button
            component={Link}
            to={`/${nextPageYear}/${nextPageMonth}`}
            variant="outlined"
          >
            Next month &gt;
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FooterButtons;
