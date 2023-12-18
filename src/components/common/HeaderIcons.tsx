import HeaderIcon from '@/components/common/HeaderIcon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import React from 'react';

const routeMap = new Map();
routeMap.set('search', '/search');
routeMap.set('notification', '/notification');

const icons = ['search', 'notification'];

const HeaderIcons = () => {
  return (
    <>
      {icons.map(item => (
        <React.Fragment key={item}>
          <HeaderIcon
            {...iconPropsGenerator(item)}
            icon={item}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default HeaderIcons;
