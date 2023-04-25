import {
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { useAuth } from 'src/contexts/AuthContext';
import { useState } from 'react';
import { Course } from 'src/models/course';
import { useNavigate, useParams } from 'react-router';
import AddEditLesson from './AddEditLesson';
import CustomModal from 'src/components/CustomModal';
import AddEditAssignment from './AddEditAssignment';

type PageHeaderProps = {
  course: Course;
  tab: number;
};

function PageHeader(props: PageHeaderProps) {
  const { course, tab } = props;
  const navigate = useNavigate();
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isAddAsgModalOpen, setIsAddAsgModalOpen] = useState(false);

  const { id } = useParams();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Box display="flex">
          <Tooltip arrow placement="top" title="Go back">
            <IconButton
              color="primary"
              sx={{ p: 2, mr: 2 }}
              onClick={() => navigate('/app/management/courses')}
            >
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="subtitle2">
              Lecturer: {course.lecturer.name}
            </Typography>
            {/* <Typography variant="subtitle2">Description:</Typography> */}
          </Box>
        </Box>
      </Grid>

      <Grid item>
        {tab === 0 ? (
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            color="primary"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setIsAddLessonModalOpen(true)}
          >
            Add Lesson
          </Button>
        ) : (
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            color="primary"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setIsAddAsgModalOpen(true)}
          >
            Add Assignment
          </Button>
        )}

        <label> </label>
      </Grid>
      <CustomModal open={isAddLessonModalOpen}>
        <AddEditLesson setOpen={setIsAddLessonModalOpen} courseId={id} />
      </CustomModal>
      <CustomModal open={isAddAsgModalOpen}>
        <AddEditAssignment setOpen={setIsAddAsgModalOpen} courseId={id} />
      </CustomModal>
    </Grid>
  );
}

export default PageHeader;
