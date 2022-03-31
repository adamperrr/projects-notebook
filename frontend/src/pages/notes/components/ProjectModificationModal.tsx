import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import CalendarDay from "../types/CalendarDay.type";
import { getIsoDateString } from "../../../utils/dateHelpers";

const ProjectModificationModal = ({
  isModalOpen,
  modalCalendarDay,
  handleCloseModal,
}: {
  isModalOpen: boolean;
  modalCalendarDay: CalendarDay;
  handleCloseModal: () => void;
}) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { isSaved, day, name, description, uuid } = modalCalendarDay;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>{isSaved ? "Edit" : "Create"}</b>: {getIsoDateString(day)}
        </Typography>
        <Typography id="modal-modal-title" variant="subtitle2" component="h6">
          <b>UUID:</b> {uuid ? uuid : "No UUID"}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Project name"
          id="projectName"
          defaultValue={isSaved ? name : null}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Work description"
          id="projectName"
          defaultValue={isSaved ? description : null}
        />
        <Box m={0} pt={1}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} textAlign="right">
              {isSaved ? (
                <Button
                  onClick={() => {
                    handleCloseModal();
                    setShowSuccessAlert(true);
                  }}
                  variant="outlined"
                >
                  Create
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleCloseModal();
                    setShowSuccessAlert(true);
                  }}
                  variant="outlined"
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        {showErrorAlert && (
          <Box mt={2} mb={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>There was a problem!</strong> Check the log.
            </Alert>
          </Box>
        )}
        {showSuccessAlert && (
          <Box mt={2} mb={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Project item saved <strong>correctly!</strong>
            </Alert>
          </Box>
        )}
        <Typography id="modal-modal-title" variant="subtitle2" component="h6">
          <b>Created at:</b> {modalCalendarDay.createdAt} <b>Updated at:</b>{" "}
          {modalCalendarDay.updatedAt}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ProjectModificationModal;
