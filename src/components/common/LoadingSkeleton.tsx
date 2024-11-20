/**
 *
 */
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 mb-4 rounded-md w-full h-40"></div>
            <div className="bg-gray-300 dark:bg-gray-700 mb-2 rounded w-3/4 h-4"></div>
            <div className="bg-gray-300 dark:bg-gray-700 rounded w-1/2 h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
