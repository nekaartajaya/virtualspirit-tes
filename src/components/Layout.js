import CustomCard from '../components/CustomCard';
import CustomModal from '../components/CustomModal';
import {GET_POST_REQUESTED} from '../redux/action';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';

const Layout = ({getPostSaga}) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getPostSaga(2);
  }, []);

  return (
    <>
      <CustomCard
        onEdit={(a) => {
          setIsOpenModalEdit(true);
          setData(a);
        }}
      />
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
    </>
  );
};

// Get state to props
const mapStateToProps = (state) => ({
  todo: state.todo,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
  getPostSaga: (page) => dispatch({type: GET_POST_REQUESTED, payload: page}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
