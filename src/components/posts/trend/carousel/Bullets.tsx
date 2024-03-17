import Bullet from '@/components/posts/trend/carousel/Bullet';
import { Justify } from '@/styles/layout';
import { Gap6 } from '@/styles/styles';
import { cx } from 'styled-system/css';

const Bullets = ({
  cur,
  pages,
  setCurPage
}: {
  cur: number;
  pages: number;
  setCurPage: (page: number) => void;
}) => {
  const arr = Array.from({ length: pages }).map((_, i) => i);
  return (
    <div className={cx(Justify, Gap6)}>
      {arr.map(i => (
        <Bullet
          key={i}
          cur={cur}
          bulletPage={i}
          setCurPage={setCurPage}
        />
      ))}
    </div>
  );
};

export default Bullets;
