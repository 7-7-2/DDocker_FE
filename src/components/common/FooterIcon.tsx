import { useRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';
import { activeState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Column, Center } from '@/styles/layout';

const routeMap = new Map();
routeMap.set('home', '/');
routeMap.set('feed', '/posts');
routeMap.set('coffee', '/coffee');
routeMap.set('mypage', '/mypage');

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
          <span className={active === icon ? Selected : Text}>
            {icon === 'mypage' ? 'MY' : icon.toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

const Text = css`
  font-weight: 500;
  font-size: var(--font-sizes-xxs);
`;

const Selected = css`
  font-size: var(--font-sizes-xxs);
  font-weight: 600;
  color: var(--colors-main);
`;

export default FooterIcon;
