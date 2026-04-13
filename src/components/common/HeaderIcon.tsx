import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useSharePage } from '@/hooks/useSharePage';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const routeMap = new Map();
routeMap.set('search', '/search');
routeMap.set('notification', '/notification');
routeMap.set('unread-notification', '/notification');

const HeaderIcon = ({ icon }: { icon: string }) => {
  const sharePrifile = icon === 'share';
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
          onClick={!sharePrifile ? handleTouch : sharePage}
        />
      )}
    </>
  );
};

export default HeaderIcon;
