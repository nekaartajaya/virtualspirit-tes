import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {connect, useSelector} from 'react-redux';
import {CREATE_POST_REQUESTED} from '../../redux/action';
import CustomModal from '../CustomModal';

const FormAdd = ({createPostSaga, ...props}) => {
  const {loadingCUD} = useSelector((state) => state.postReducer);

  const formikAdd = useFormik({
    initialValues: {
      userId: 1,
      title: '',
      body: '',
    },
    onSubmit: (values) => {
      createPostSaga(values);
    },
  });

  return (
    <CustomModal
      isOpen={props.isOpenModalAdd}
      title={'Add New Post'}
      type={'medium'}
      onClose={() => props.onClose()}
    >
      <div className="text-[14px] text-[#344054] my-6">
        <div className="mb-6">
          <TextField
            value={formikAdd?.values?.title}
            label="Title"
            variant="outlined"
            fullWidth
            onChange={(e) => formikAdd.setFieldValue('title', e.target.value)}
          />
        </div>
        <div>
          <TextField
            value={formikAdd?.values?.body}
            label="Body"
            variant="outlined"
            fullWidth
            minRows={4}
            multiline
            onChange={(e) => formikAdd.setFieldValue('body', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        {!loadingCUD && (
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => {
              props.onClose();
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => formikAdd.handleSubmit()}
          disabled={loadingCUD}
        >
          {loadingCUD ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </CustomModal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createPostSaga: (body) => dispatch({type: CREATE_POST_REQUESTED, payload: body}),
});

export default connect(null, mapDispatchToProps)(FormAdd);
