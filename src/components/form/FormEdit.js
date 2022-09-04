import {Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {UPDATE_POST_REQUESTED} from '../../redux/action';
import CustomModal from '../CustomModal';

const FormEdit = ({updatePostSaga, ...props}) => {
  const {loadingCUD} = useSelector((state) => state.postReducer);

  const formikEdit = useFormik({
    initialValues: {
      id: props?.data?.id ?? '',
      userId: props?.data?.userId ?? '',
      title: props?.data?.title ?? '',
      body: props?.data?.body ?? '',
    },
    onSubmit: (values) => {
      updatePostSaga(values.id, values);
    },
  });

  const resetFormValue = () => {
    formikEdit.setFieldValue('id', props?.data?.id ?? '');
    formikEdit.setFieldValue('userId', props?.data?.userId ?? '');
    formikEdit.setFieldValue('title', props?.data?.title ?? '');
    formikEdit.setFieldValue('body', props?.data?.body ?? '');
  };

  useEffect(() => {
    resetFormValue();
  }, [props?.data]);

  return (
    <CustomModal
      isOpen={props.isOpenModalEdit}
      title={'Edit Post'}
      type={'medium'}
      onClose={() => {
        props.onClose();
        resetFormValue();
      }}
    >
      <div className="text-[14px] text-[#344054] my-6">
        <div className="mb-6">
          <TextField
            value={formikEdit?.values?.title}
            label="Title"
            variant="outlined"
            fullWidth
            onChange={(e) => formikEdit.setFieldValue('title', e.target.value)}
            error={!formikEdit.values.title}
          />
        </div>
        <div>
          <TextField
            value={formikEdit?.values?.body}
            label="Body"
            variant="outlined"
            fullWidth
            minRows={4}
            multiline
            onChange={(e) => formikEdit.setFieldValue('body', e.target.value)}
            error={!formikEdit.values.body}
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
              resetFormValue();
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          color="warning"
          onClick={() => formikEdit.handleSubmit()}
          disabled={loadingCUD || !formikEdit.values.title || !formikEdit.values.body}
        >
          {loadingCUD ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </CustomModal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePostSaga: (id, body) => dispatch({type: UPDATE_POST_REQUESTED, payload: {id, body}}),
});

export default connect(null, mapDispatchToProps)(FormEdit);
