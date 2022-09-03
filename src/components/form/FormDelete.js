import {Button} from '@mui/material';
import {connect, useSelector} from 'react-redux';
import {DELETE_POST_REQUESTED} from '../../redux/action';
import CustomModal from '../CustomModal';

const FormDelete = ({deletePostSaga, ...props}) => {
  const {loadingCUD} = useSelector((state) => state.postReducer);

  const handleDelete = () => {
    deletePostSaga(props?.data?.id);
  };

  return (
    <CustomModal
      isOpen={props.isOpenModalDelete}
      title={'Delete Post'}
      type={'small'}
      onClose={() => props.onClose()}
    >
      <div className="text-[14px] text-[#344054] my-6">
        Are you sure you want to delete this post?
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
          color="error"
          onClick={() => handleDelete()}
          disabled={loadingCUD}
        >
          {loadingCUD ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </CustomModal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deletePostSaga: (id) => dispatch({type: DELETE_POST_REQUESTED, payload: id}),
});

export default connect(null, mapDispatchToProps)(FormDelete);
