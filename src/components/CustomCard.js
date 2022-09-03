import {Button, Card} from '@mui/material';
import {Edit, Trash} from 'iconsax-react';

const CustomCard = ({...props}) => {
  return (
    <Card>
      <div className="sm:flex gap-2">
        <div
          className="w-full sm:max-w-[150px]"
          // style={{backgroundImage: `url(https://picsum.photos/id/${props?.pictId}/150/150)`}}
        >
          <img
            src={`https://picsum.photos/id/${props?.pictId}/150/150`}
            alt="random pict"
            className="sm:w-[150px] w-full sm:h-[150px]"
          />
        </div>
        <div className="p-2 w-full flex flex-col justify-between">
          <div className="sm:mb-0 mb-4">
            <div className="text-[14px] font-bold mb-2 title-ellipsis">{props?.data?.title}</div>
            <div className="text-[12px] body-ellipsis">{props?.data?.body}</div>
          </div>
          <div className="flex gap-2">
            <Button
              size="small"
              variant="outlined"
              style={{fontSize: 10}}
              color="warning"
              onClick={() => props.onEdit()}
            >
              <span className="mr-1">Edit</span> <Edit size="15" color="#ed6c02" />
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              style={{fontSize: 10}}
              onClick={() => props.onDelete()}
            >
              <span className="mr-1">Delete</span>
              <Trash size="15" color="#d32f2f" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomCard;
