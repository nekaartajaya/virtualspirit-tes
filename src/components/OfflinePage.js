import {Wifi} from 'iconsax-react';

const OfflinePage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <Wifi size="50" color="#000" className="mx-auto" />
        <div>Please check your connection or try again later.</div>
      </div>
    </div>
  );
};

export default OfflinePage;
