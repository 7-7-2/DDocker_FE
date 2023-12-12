import Icon from '@/components/common/Icon';
import { ICON_NOTIFICATION, ICON_SEARCH } from '@/constants/icons';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const HeaderIcons = () => {
  const toSearch = useNavigateTo('/search');
  const toNotification = useNavigateTo('/notification');

  return (
    <>
      <Icon
        {...ICON_SEARCH}
        onTouchEnd={toSearch}
      />
      <Icon
        {...ICON_NOTIFICATION}
        onTouchEnd={toNotification}
      />
    </>
  );
};

export default HeaderIcons;
