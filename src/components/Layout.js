import CustomCard from '../components/CustomCard';
import CustomModal from '../components/CustomModal';
import {
  CREATE_POST_REQUESTED,
  DELETE_POST_REQUESTED,
  GET_POST_REQUESTED,
  UPDATE_POST_REQUESTED,
} from '../redux/action';
import {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {Button, TextField} from '@mui/material';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import LoadingCard from './LoadingCard';
import {useFormik} from 'formik';
import {ToastContainer, toast} from 'react-toastify';

const Layout = ({getPostSaga, createPostSaga, updatePostSaga, deletePostSaga}) => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const {loading, loadingCUD, posts} = useSelector((state) => state.postReducer);

  useEffect(() => {
    getPostSaga(page);
  }, []);

  useEffect(() => {
    formikEdit.setFieldValue('id', data?.id ?? '');
    formikEdit.setFieldValue('userId', data?.userId ?? '');
    formikEdit.setFieldValue('title', data?.title ?? '');
    formikEdit.setFieldValue('body', data?.body ?? '');
  }, [data]);

  const handleChangePage = () => {
    setPage(page + 1);
    if (page <= 20 && page !== 1) getPostSaga(page);
  };

  useBottomScrollListener(handleChangePage);

  const handleDelete = () => {
    deletePostSaga(data?.id);
  };

  const handleOpenModalAdd = () => {
    setData(null);
    setIsOpenModalAdd(true);
  };

  const formikEdit = useFormik({
    initialValues: {
      id: data?.id ?? '',
      userId: data?.userId ?? '',
      title: data?.title ?? '',
      body: data?.body ?? '',
    },
    onSubmit: (values) => {
      updatePostSaga(values.id, values);
    },
  });

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

  useEffect(() => {
    if (!loadingCUD) {
      if (isOpenModalAdd) {
        setIsOpenModalAdd(false);
        toast.success('New post created');
      }
      if (isOpenModalEdit) {
        setIsOpenModalEdit(false);
        toast.success('Post updated');
      }
      if (isOpenModalDelete) {
        setIsOpenModalDelete(false);
        toast.success('Post deleted');
      }
    }
  }, [loadingCUD]);

  const loadingPost = [];
  for (let i = 0; i < 4; i++) {
    loadingPost.push(<LoadingCard key={i} />);
  }

  return (
    <div className="max-w-[768px] mx-auto py-10 px-4">
      <ToastContainer />

      <div className="text-center text-2xl font-bold mb-10 tracking-wide">
        VIRTUAL SPIRIT
        <br />
        LIST POST
      </div>
      <div className="text-center italic">*note : scroll to load more data</div>

      <div className="w-full text-right mb-5">
        <Button size="small" variant="contained" onClick={() => handleOpenModalAdd()}>
          Add New Post
        </Button>
      </div>

      <div className="flex flex-col gap-6 pb-10">
        {posts?.map((post, i) => {
          return (
            <CustomCard
              key={i}
              pictId={i}
              data={post}
              onEdit={() => {
                setIsOpenModalEdit(true);
                setData(post);
              }}
              onDelete={() => {
                setIsOpenModalDelete(true);
                setData(post);
              }}
            />
          );
        })}
        {loading && loadingPost}
      </div>

      {/* MODAL ADD */}
      <CustomModal
        isOpen={isOpenModalAdd}
        title={'Add New Post'}
        type={'medium'}
        onClose={() => setIsOpenModalAdd(false)}
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
                setIsOpenModalAdd(false);
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

      {/* MODAL EDIT */}
      <CustomModal
        isOpen={isOpenModalEdit}
        title={'Edit'}
        type={'medium'}
        onClose={() => setIsOpenModalEdit(false)}
      >
        <div className="text-[14px] text-[#344054] my-6">
          <div className="mb-6">
            <TextField
              value={formikEdit?.values?.title}
              label="Title"
              variant="outlined"
              fullWidth
              onChange={(e) => formikEdit.setFieldValue('title', e.target.value)}
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
                setIsOpenModalEdit(false);
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
            disabled={loadingCUD}
          >
            {loadingCUD ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </CustomModal>

      {/* MODAL DELETE */}
      <CustomModal
        isOpen={isOpenModalDelete}
        title={'Delete'}
        type={'small'}
        onClose={() => setIsOpenModalDelete(false)}
      >
        <div className="text-[14px] text-[#344054] my-6">Are you sure to delete this post ?</div>
        <div className="flex justify-end gap-4">
          {!loadingCUD && (
            <Button
              size="small"
              variant="contained"
              color="info"
              onClick={() => {
                setIsOpenModalDelete(false);
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getPostSaga: (page) => dispatch({type: GET_POST_REQUESTED, payload: page}),
  deletePostSaga: (id) => dispatch({type: DELETE_POST_REQUESTED, payload: id}),
  updatePostSaga: (id, body) => dispatch({type: UPDATE_POST_REQUESTED, payload: {id, body}}),
  createPostSaga: (body) => dispatch({type: CREATE_POST_REQUESTED, payload: body}),
});

export default connect(null, mapDispatchToProps)(Layout);
