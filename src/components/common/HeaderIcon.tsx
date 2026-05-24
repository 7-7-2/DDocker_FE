import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useSharePage } from '@/hooks/useSharePage';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const routeMap = new Map();
routeMap.set('home', '/');
routeMap.set('search', '/search');
routeMap.set('notification', '/notification');
routeMap.set('unread-notification', '/notification');

const HeaderIcon = ({ icon }: { icon: string }) => {
  const shareProfile = icon === 'share';
  const navigateTo = useNavigateTo(routeMap.get(icon));
  const handleShare = useSharePage();

  const handleTouch = () => {
    navigateTo();
  };

  const sharePage = () => {
    handleShare();
  };

  return (
    <>
      {icon && (
        <Icon
          {...iconPropsGenerator(icon)}
          onClick={!shareProfile ? handleTouch : sharePage}
        />
      )}
    </>
  );
};

export default HeaderIcon;
