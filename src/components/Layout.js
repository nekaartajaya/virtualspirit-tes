import CustomCard from '../components/CustomCard';
import CustomModal from '../components/CustomModal';
import {DELETE_POST_REQUESTED, GET_POST_REQUESTED, SET_LOADING_REQUESTED} from '../redux/action';
import {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {Button} from '@mui/material';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import LoadingCard from './LoadingCard';

const Layout = ({setLoading, getPostSaga, deletePostSaga}) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingCUD, setLoadingCUD] = useState(false);
  const {loading, posts} = useSelector((state) => state.postReducer);

  useEffect(() => {
    getPostSaga(page);
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handleChangePage = () => {
    setLoading();
    setPage(page + 1);
    if (page <= 20 && page !== 1) getPostSaga(page);
  };

  useBottomScrollListener(handleChangePage);

  const handleDelete = () => {
    setLoadingCUD(true);
    setTimeout(() => {
      deletePostSaga(data?.id);
      setLoadingCUD(false);
      setIsOpenModalDelete(false);
      // updateDelete();
    }, 2000);
  };

  // const updateDelete = () => {
  //   posts.splice(
  //     posts.findIndex((obj) => obj.id == data?.id),
  //     1,
  //   );
  // };

  const loadingPost = [];
  for (let i = 0; i < 4; i++) {
    loadingPost.push(<LoadingCard key={i} />);
  }

  return (
    <div className="max-w-[768px] mx-auto">
      <div className="w-full text-right mb-5">
        <Button size="small" variant="contained">
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

      {/* MODAL EDIT */}
      <CustomModal
        isOpen={isOpenModalEdit}
        title={'Approve Confirmation'}
        type={'small'}
        onClose={() => setIsOpenModalEdit(false)}
      >
        <div className="text-[14px] text-[#344054] my-6">{data}</div>
        <div className="flex justify-end gap-4">
          <button
            className="w-[100px] p-3 text-center text-[14px] text-white text-[#436CFF] border border-[#436CFF] rounded-[4px]"
            onClick={() => setIsOpenModalEdit(false)}
          >
            Cancel
          </button>
          <button
            className="w-[100px] p-3 text-center text-[14px] text-white bg-[#436CFF] border-[#436CFF] rounded-[4px]"
            onClick={() => {
              setIsOpenModalEdit(false);
            }}
          >
            Approve
          </button>
        </div>
      </CustomModal>

      {/* MODAL DELETE */}
      <CustomModal
        isOpen={isOpenModalDelete}
        title={'Delete Confirmation'}
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
  setLoading: () => dispatch({type: SET_LOADING_REQUESTED}),
  getPostSaga: (page) => dispatch({type: GET_POST_REQUESTED, payload: page}),
  deletePostSaga: (id) => dispatch({type: DELETE_POST_REQUESTED, payload: id}),
});

export default connect(null, mapDispatchToProps)(Layout);
