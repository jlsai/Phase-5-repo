import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Rating from '@mui/material/Rating';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WatchedButton({ isMovieWatched, onToggleWatched }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (!isMovieWatched) {
        setOpen(true); // Open the dialog only if the movie is not watched
      }
    onToggleWatched(); // Invoke onToggleWatched only if the movie is not watched

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {isMovieWatched ? "Remove from Watched" : "Add to Watched"}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Give this movie a rating!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Rating
              onClick={handleClose}
              name="size-large"
              defaultValue={0}
              size="large"
              max={10}
              precision={0.5}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default WatchedButton;
