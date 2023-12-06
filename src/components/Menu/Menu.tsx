import { FaPlay, FaPause, FaXmark } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { pause, play, stop, selectIsPlaying, selectIsStopped } from '../../features/simulation/simulationSlice';

const Menu = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectIsPlaying);
  const isStopped = useAppSelector(selectIsStopped);

  const handlePlayClick = () => {
    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  const handleClearClick = () => {
    dispatch(stop());
  };

  return (
    <div data-testid="menu">
      <button
        className="bg-nord-polar-night-2 hover:bg-nord-frost-3 hover:shadow-md shadow-sm p-2 text-2xl m-2 rounded disabled:opacity-25 disabled:pointer-events-none"
        onClick={handlePlayClick}
        disabled={isStopped}
        data-testid="play-button"
      >
        {isPlaying ? <FaPause data-testid="pause-icon" /> : <FaPlay data-testid="play-icon" />}
      </button>
      <button
        className="bg-nord-polar-night-2 hover:bg-nord-frost-3 hover:shadow-md shadow-sm p-2 text-2xl m-2 rounded disabled:opacity-25 disabled:pointer-events-none"
        onClick={handleClearClick}
        disabled={isStopped}
        data-testid="stop-button"
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default Menu;
