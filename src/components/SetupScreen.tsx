import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../hooks';
import {
  play,
  resume,
  randomise,
  setCellDensity,
  selectCellDensity,
  setBoardState,
  setInitialCellsNum,
  selectInitialCellsNum,
} from '../features/simulation/simulationSlice';

const RandomStateSchema = z.object({
  cellsDensity: z.number().min(1),
  randomState: z.literal(true),
  cellsNum: z.number().min(1),
  autoplay: z.boolean(),
});

const ManualStateSchema = z.object({
  cellsDensity: z.number().min(1),
  randomState: z.literal(false),
  cellsNum: z.number().optional(),
  autoplay: z.boolean(),
});

const InitialStateSchema = z.discriminatedUnion('randomState', [RandomStateSchema, ManualStateSchema]);
type InitialState = z.infer<typeof InitialStateSchema>;

const SetupScreen = () => {
  const dispatch = useAppDispatch();
  const cellsDensity = useAppSelector(selectCellDensity);
  const initialCellsNum = useAppSelector(selectInitialCellsNum);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InitialState>({
    resolver: zodResolver(InitialStateSchema),
    defaultValues: {
      cellsDensity,
      cellsNum: initialCellsNum,
      randomState: true,
      autoplay: true,
    },
  });

  const onSubmit: SubmitHandler<InitialState> = (data) => {
    dispatch(setCellDensity(data.cellsDensity));

    if (data.randomState) {
      dispatch(setInitialCellsNum(data.cellsNum));
      dispatch(
        randomise({
          cellsNum: data.cellsNum,
        }),
      );

      if (data.autoplay) {
        dispatch(play());
      } else {
        dispatch(resume());
      }
    } else {
      dispatch(setBoardState({}));
      dispatch(resume());
    }
  };

  return (
    <div className="flex w-full place-content-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="cellsDensity" className="block mb-2">
            Cells density
          </label>
          <input
            type="number"
            id="cellsDensity"
            {...register('cellsDensity', { valueAsNumber: true })}
            className={`w-full p-2 rounded bg-nord-polar-night-2 border-2 ${
              errors.cellsDensity?.message ? 'border-nord-aurora-0' : 'border-nord-polar-night-0'
            }`}
          />
          {errors.cellsDensity?.message && (
            <div className="text-nord-aurora-0 text-sm">{errors.cellsDensity?.message}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            id="randomState"
            {...register('randomState')}
            className="inline-block align-middle cursor-pointer"
          />
          <label htmlFor="randomState" className="ml-2 inline-block align-middle cursor-pointer">
            Start with random state
          </label>
        </div>

        {watch('randomState') && (
          <>
            <div className={`mb-4 ${!watch('randomState') ? 'opacity-50' : ''}`}>
              <label htmlFor="cellsNum" className="block mb-2">
                Initial number of alive cells
              </label>
              <input
                type="number"
                id="cellsNum"
                {...register('cellsNum', { valueAsNumber: true })}
                className={`w-full p-2 rounded bg-nord-polar-night-2 border-2 ${
                  errors.cellsNum?.message ? 'border-nord-aurora-0' : 'border-nord-polar-night-0'
                }`}
                disabled={!watch('randomState')}
              />
              {errors.cellsNum?.message && <div className="text-nord-aurora-0 text-sm">{errors.cellsNum?.message}</div>}
            </div>
            <div className="mb-8">
              <input
                type="checkbox"
                id="autoplay"
                {...register('autoplay')}
                className="inline-block align-middle cursor-pointer"
              />
              <label htmlFor="autoplay" className="ml-2 inline-block align-middle cursor-pointer">
                Autoplay
              </label>
            </div>
          </>
        )}

        <button type="submit" className="bg-nord-frost-3 rounded px-8 py-2 font-bold shadow-md hover:bg-nord-frost-2">
          Start
        </button>
      </form>
    </div>
  );
};

export default SetupScreen;
