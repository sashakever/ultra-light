import React, {FC} from 'react';

import MenuContainer from '../MenuContainer';

import {useAppSelector, useHeaderActions} from '@base/store';

import {StrapiHeaderType} from '@shared/types';
import {Drawer} from '@shared/ui';

type Props = {
  header?: StrapiHeaderType;
};

const MenuDrawer: FC<Props> = ({header}) => {
  const isMenuOpen = useAppSelector((state) => state.header.isMenuOpen);
  const {closeMenu} = useHeaderActions();

  return (
    <Drawer
      className='w-screen h-full md:rem:h-[440px]'
      isFreeMenu
      isOpen={isMenuOpen}
      isCloseButton={false}
      onClose={closeMenu}>
      <MenuContainer header={header} />
    </Drawer>
  );
};

export default MenuDrawer;
