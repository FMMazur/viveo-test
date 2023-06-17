import { Skeleton } from '../ui/skeleton';
import { Loading } from '../ui/loading';

export const RandomUserSkeleton = () => {
  return (
    <div className="w-full max-w-xxs md:max-w-md h-full bg-white border-2 border-black rounded-lg shadow px-4 py-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center gap-4 h-full">
        <div className="flex flex-col items-center px-2 gap-3">
          <Skeleton className="h-12 w-12 rounded-full bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-30" />

          <Skeleton className="h-4 w-48 md:w-[250px] bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-30" />
          <Skeleton className="h-4 w-40 md:w-[200px] bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-30" />
        </div>

        <div id="contato" className="w-full flex items-center justify-center h-full">
          <Loading />
        </div>
      </div>
    </div>
  );
};
