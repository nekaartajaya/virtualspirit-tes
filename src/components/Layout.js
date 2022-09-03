import CustomCard from '../components/CustomCard';
import {GET_POST_REQUESTED} from '../redux/action';
import {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {Button} from '@mui/material';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import LoadingCard from './LoadingCard';
import {ToastContainer, toast} from 'react-toastify';
import FormAdd from './form/FormAdd';
import FormEdit from './form/FormEdit';
import FormDelete from './form/FormDelete';
import {Helmet} from 'react-helmet';

const Layout = ({getPostSaga}) => {
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
    if (!loadingCUD) {
      if (isOpenModalAdd) {
        setIsOpenModalAdd(false);
        toast.success('New post created', {position: 'top-center'});
      }
      if (isOpenModalEdit) {
        setIsOpenModalEdit(false);
        toast.success('Post updated', {position: 'top-center'});
      }
      if (isOpenModalDelete) {
        setIsOpenModalDelete(false);
        toast.success('Post deleted', {position: 'top-center'});
      }
    }
  }, [loadingCUD]);

  const handleChangePage = () => {
    setPage(page + 1);
    if (page <= 20 && page !== 1) getPostSaga(page);
  };

  const handleOpenModalAdd = () => {
    setData(null);
    setIsOpenModalAdd(true);
  };

  useBottomScrollListener(handleChangePage);

  const loadingPost = [];
  for (let i = 0; i < 4; i++) {
    loadingPost.push(<LoadingCard key={i} />);
  }

  return (
    <div className="max-w-[768px] mx-auto py-10 px-4">
      <Helmet>
        <title>Virtual Spirit | POST</title>
        <meta name="keywords" content="HTML,CSS,JavaScript,React" />
        <meta name="description" content="Small project test for recruitment" />
      </Helmet>

      <ToastContainer />

      <div className="text-center text-2xl font-bold mb-10 tracking-wide">
        VIRTUAL SPIRIT
        <br />
        LIST POST
      </div>
      <div className="text-center italic">*note : scroll to load more post</div>

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

      {/* FORM ADD */}
      <FormAdd isOpenModalAdd={isOpenModalAdd} onClose={() => setIsOpenModalAdd(false)} />

      {/* FORM EDIT */}
      <FormEdit
        isOpenModalEdit={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        data={data}
      />

      {/* FORM DELETE */}
      <FormDelete
        isOpenModalDelete={isOpenModalDelete}
        onClose={() => setIsOpenModalDelete(false)}
        data={data}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getPostSaga: (page) => dispatch({type: GET_POST_REQUESTED, payload: page}),
});

export default connect(null, mapDispatchToProps)(Layout);
