/* eslint-disable react/jsx-key */
import styled from 'styled-components';
import {useTable, usePagination} from 'react-table';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react';

const Styles = styled.div`
  table {
    width: 100%;
    text-align: left;
    font-size: 14px;

    th {
      background-color: #fafafa;
      padding: 10px;
      color: #101828;
      div {
        border-right: 2px solid #e8e8e8;
      }
      &:last-child {
        div {
          border-right: 0;
        }
      }
    }
    th,
    td {
      border-bottom: 1px solid #e8e8e8;
    }

    td {
      padding: 16px 10px;
      color: #344054;
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const ReactTable = ({columns, data, loading}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: {pageIndex},
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0},
    },
    usePagination,
  );

  return (
    <>
      {loading ? (
        <div className="w-full min-h-[200px] grid place-content-center">
          <svg
            className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#406AFF]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#8F98AA"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <>
          <Styles>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        <div>{column.render('Header')}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.length > 0 ? (
                  page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="text-[#8F98AA] text-[24px] text-center">Data not found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Styles>

          {/* Pagination */}
          <div className="pagination flex justify-end mt-6">
            <button
              className="w-6 h-6 bg-[#FAFAFA] flex justify-center items-center"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ArrowLeft2 size="14" color={canPreviousPage ? '#000' : '#D9D9D9'} />
            </button>{' '}
            <div className="bg-[#406AFF] w-[24px] h-[24px] flex justify-center items-center text-white">
              {pageIndex + 1}
            </div>{' '}
            <button
              className="w-6 h-6 bg-[#FAFAFA] flex justify-center items-center"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ArrowRight2 size="14" color={canNextPage ? '#000' : '#D9D9D9'} />
            </button>{' '}
          </div>
        </>
      )}
    </>
  );
};

export default ReactTable;
