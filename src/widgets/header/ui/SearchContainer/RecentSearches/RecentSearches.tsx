import clsx from 'clsx';
import React, {FC} from 'react';

import {useHeaderActions} from '@base/store';

type Props = {
  className?: string;
  recentSearchesTitle: string | null | undefined;
  recentSearchesKeys: string | null | undefined;
};

const RecentSearches: FC<Props> = ({
  className = '',
  recentSearchesTitle,
  recentSearchesKeys,
}) => {
  const {setSearchQuery} = useHeaderActions();

  const recentSearches = (
    (recentSearchesKeys as string)?.split('\n') || []
  ).map((item: string) => item.trim().replace(/^- /, ''));

  return (
    <div
      className={clsx(
        'pt-3 px-6 md:p-0 text-xs md:text-l w-full md:max-w-[20%] 2xl:max-w-[30%]',
        'flex gap-3 md:rem:gap-[62px] flex-col md:rem:pt-[38px]',
        className,
      )}>
      {recentSearchesTitle || 'This heading will be added soon'}
      <div className='w-full flex gap-2.5 md:gap-1 flex-wrap text-xs md:text-s'>
        {recentSearches.map((recent, index) => (
          <button
            className='px-3.5 md:px-4 bg-tone-100 py-1.5 md:rem:py-[13px]'
            key={index}
            onClick={() => setSearchQuery(recent)}>
            {recent}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
