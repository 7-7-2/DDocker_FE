import { useRecoilState } from 'recoil';
import { activeState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetCacheData from '@/hooks/useGetCacheData';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Column, Center } from '@/styles/layout';
import { FooterTextMedium, FooterTextSelected } from '@/styles/styles';
import { cx } from 'styled-system/css';

const userId = useGetCacheData('user', '/userId');

const routeMap = new Map();
routeMap.set('home', '/');
routeMap.set('feed', '/posts');
routeMap.set('coffee', '/coffee');
routeMap.set('my', `/profile/${userId}`);

const FooterIcon = ({ icon }: { icon: string }) => {
  const [active, setActive] = useRecoilState(activeState);
  const navigateTo = useNavigateTo(routeMap.get(icon));

  const handleTouch = () => {
    setActive(icon);
    navigateTo();
  };

  return (
    <>
      {icon && (
        <div
          className={cx(Column, Center)}
          onTouchEnd={handleTouch}>
          <Icon
            {...iconPropsGenerator(active === icon ? `${icon}-active` : icon)}
          />
          <span
            className={active === icon ? FooterTextSelected : FooterTextMedium}>
            {icon.toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

export default FooterIcon;
