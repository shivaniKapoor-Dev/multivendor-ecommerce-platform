import {TailSpin} from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin height="70" width="70" color="#374151"
  ariaLabel="loading" />
    </div>
  );
}