import { FaPlay, FaPause, FaGear, FaXmark } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { stop, play, clear, selectIsPlaying } from '../../features/simulation/simulationSlice';

const Menu = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectIsPlaying);

  const handlePlayClick = () => {
    if (isPlaying) {
      dispatch(stop());
    } else {
      dispatch(play());
    }
  };

  const handleClearClick = () => {
    dispatch(clear());
  };

  return (
    <div data-testid="menu">
      <button
        className="bg-nord-polar-night-2 hover:bg-nord-frost-3 hover:shadow-md shadow-sm p-2 text-2xl m-2 rounded"
        onClick={handlePlayClick}
      >
        {isPlaying ? <FaPause data-testid="pause-icon" /> : <FaPlay data-testid="play-icon" />}
      </button>
      <button
        className="bg-nord-polar-night-2 hover:bg-nord-frost-3 hover:shadow-md shadow-sm p-2 text-2xl m-2 rounded"
        onClick={handleClearClick}
      >
        <FaXmark />
      </button>
      <button className="bg-nord-polar-night-2 hover:bg-nord-frost-3 hover:shadow-md shadow-sm p-2 text-2xl m-2 rounded">
        <FaGear />
      </button>
    </div>
  );
};

export default Menu;
