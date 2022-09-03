import {Card, Skeleton} from '@mui/material';

const LoadingCard = () => {
  return (
    <Card>
      <div className="flex gap-2">
        <Skeleton variant="rectangular" animation="wave" width={190} height={150} />
        <div className="p-2 w-full flex flex-col justify-between">
          <div>
            <Skeleton animation="wave" width={300} height={20} />
            <Skeleton animation="wave" width={500} height={70} />
          </div>
          <div className="flex gap-2">
            <Skeleton animation="wave" width={200} height={20} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoadingCard;
