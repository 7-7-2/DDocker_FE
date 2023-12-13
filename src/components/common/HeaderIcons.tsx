import HeaderIcon from '@/components/common/HeaderIcon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const routeMap = new Map();
routeMap.set('search', '/search');
routeMap.set('notification', '/notification');

const icons = ['search', 'notification'];

const HeaderIcons = () => {
  return (
    <>
      {icons.map(item => (
        <HeaderIcon
          {...iconPropsGenerator(item)}
          icon={item}
        />
      ))}
    </>
  );
};

export default HeaderIcons;
