import clsx from 'clsx';
import React, {FC} from 'react';

type Props = {
  className?: string;
  categories: {id: string; title: string}[];
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
};

const CategoriesFilter: FC<Props> = ({
  className = '',
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const handleSelect = (id: string) => () => {
    if (id !== selectedCategoryId) {
      setSelectedCategoryId(id);
    } else {
      setSelectedCategoryId('');
    }
  };

  return (
    <div
      className={clsx(
        'w-full flex md:justify-center overflow-x-auto',
        className,
      )}>
      <div className='md:w-fit flex items-center gap-3 md:gap-2 pl-6 pr-22 md:px-0'>
        {categories.map((category) => (
          <button
            key={category.id}
            className={clsx(
              'w-fit h-8 md:h-10 flex items-center px-4 md:px-5 rem:rounded-[50px] bg-gray-100 shrink-0',
              'transition-all duration-300 hover:bg-opacity-100 group',
              {
                'bg-opacity-10': selectedCategoryId !== category.id,
              },
            )}
            onClick={handleSelect(category.id)}>
            <span
              className={clsx(
                'text-xs md:text-s font-medium group-hover:text-tone-700 transition-all duration-300',
                {
                  'text-tone-700': selectedCategoryId === category.id,
                  'text-gray-100': selectedCategoryId !== category.id,
                },
              )}>
              {category.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
