import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const routeMap = new Map();
routeMap.set('search', '/search');
routeMap.set('notification', '/notification');
routeMap.set('unread-notification', '/notification');

const HeaderIcon = ({ icon }: { icon: string }) => {
  const navigateTo = useNavigateTo(routeMap.get(icon));
  const handleTouch = () => {
    navigateTo();
  };

  return (
    <>
      {icon && (
        <Icon
          {...iconPropsGenerator(icon)}
          onClick={handleTouch}
        />
      )}
    </>
  );
};

export default HeaderIcon;
