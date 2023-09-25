import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'absolute', display: 'inline-flex', right: 120, top: 40 }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="#1976d2" fontSize="2em">
          {`${Math.round(props.value / 10)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function TimerComponent({ time, handleTime, handleTimeIsUp }) {
  const [progress, setProgress] = useState(time);
  useEffect(() => {
    if (progress === 0) {
      handleTimeIsUp();
      setTimeout(() => {
        handleTimeIsUp();
        handleTime();
        setProgress(time);
      }, 3000)
    };
    const timer = progress > 0 && setInterval(() => setProgress(progress - 1), 1000);
    return () => clearInterval(timer);
  }, [progress, time, handleTime, handleTimeIsUp]);

  return <CircularProgressWithLabel value={progress * 100 / 10} size="4em" />;
}