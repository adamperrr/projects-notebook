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
import { createDay, editDay } from "../utils/promises";
import useProjectModal from "../contexts/ProjectModalContext";

const ProjectModal = () => {
  const {
    isModalOpen,
    handleCloseModal,
    modalCalendarDay,
    setModalCalendarDay,
    showSuccessModalAlert,
    setShowSuccessModalAlert,
    showErrorModalAlert,
    setShowErrorModalAlert,
  } = useProjectModal();

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

  const { isSaved, day, name, description, workTime, uuid } = modalCalendarDay;

  const handelFieldChange = (element: any) => {
    setModalCalendarDay({
      ...modalCalendarDay,
      [element.target.name]: element.target.value,
    });
  };

  const handleCreateSave = async () => {
    try {
      const response: any = await createDay(modalCalendarDay);

      if (response.statusCode && response.statusCode > 299) {
        console.log(
          `[ProjectModal - handleCreateSave - 1]`,
          response?.message.join("; ")
        );
        return setShowErrorModalAlert(true);
      } else {
        setModalCalendarDay({
          ...modalCalendarDay,
          ...response,
          day: new Date(response.day),
          owner: { uuid: response.owner.uuid },
        });
      }
    } catch (error: any) {
      console.log(
        `[ProjectModal - handleCreateSave - 2]`,
        error?.message || JSON.stringify(error)
      );
      return setShowErrorModalAlert(true);
    }

    return setShowSuccessModalAlert(true);
  };

  const handleEditSave = async () => {
    try {
      const response: any = await editDay(
        modalCalendarDay["uuid"] || "",
        modalCalendarDay
      );

      if (response.statusCode && response.statusCode > 299) {
        console.log(
          `[ProjectModal - handleEditSave - 1]`,
          response?.message.join("; ")
        );
        return setShowErrorModalAlert(true);
      } else {
        setModalCalendarDay({
          ...modalCalendarDay,
          ...response,
          day: new Date(response.day),
        });
      }
    } catch (error: any) {
      console.log(
        `[ProjectModal - handleEditSave - 2]`,
        error?.message || JSON.stringify(error)
      );
      return setShowErrorModalAlert(true);
    }

    return setShowSuccessModalAlert(true);
  };

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
          name="name"
          fullWidth
          margin="normal"
          label="Project name"
          defaultValue={isSaved ? name : null}
          onChange={(element) => handelFieldChange(element)}
        />
        <TextField
          name="description"
          fullWidth
          margin="normal"
          label="Work description"
          defaultValue={isSaved ? description : null}
          onChange={(element) => handelFieldChange(element)}
        />
        <TextField
          name="workTime"
          fullWidth
          margin="normal"
          label="Work time"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { inputMode: "numeric", min: 0, max: 24 } }}
          defaultValue={isSaved ? workTime : null}
          onChange={(element) => handelFieldChange(element)}
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
                  type="submit"
                  onClick={handleEditSave}
                  variant="outlined"
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleCreateSave}
                  variant="outlined"
                >
                  Create
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        {showErrorModalAlert && (
          <Box mt={2} mb={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>There was a problem!</strong> Check the log.
            </Alert>
          </Box>
        )}
        {showSuccessModalAlert && (
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

export default ProjectModal;
