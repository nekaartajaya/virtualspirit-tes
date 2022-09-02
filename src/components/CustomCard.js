import {Card} from '@mui/material';
import {Edit, Trash} from 'iconsax-react';

const CustomCard = ({...props}) => {
  return (
    <div>
      <Card sx className="flex w-full justify-between gap">
        <div>
          <div>Title</div>
          <div>Body</div>
        </div>
        <div>
          <button onClick={() => props.onEdit('tes')}>
            <Trash size="32" color="#FF8A65" />
          </button>
          <button>
            <Edit size="32" color="#FF8A65" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CustomCard;
