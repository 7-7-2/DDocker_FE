import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';

import TextArea from '@/components/common/TextArea';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';

import { caffeineIntakeState } from '@/atoms/atoms';
import { LABEL_TEXTS, INPUT_TEXTS } from '@/constants/common';

import { RegisterContentsStyle } from '@/styles/styles';

const { description } = INPUT_TEXTS.type;

const PostInputDescription = ({
  descriptions,
  setDescriptions
}: {
  descriptions: string | null;
  setDescriptions: Dispatch<SetStateAction<string | null>>;
}) => {
  const { brand } = useRecoilValue(caffeineIntakeState);
  const myCafe = brand === 'private';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptions(e.target.value);
  };

  return (
    <div className={RegisterContentsStyle}>
      <RegisterLabel label={LABEL_TEXTS.description} />
      <TextArea
        placeholder={!myCafe ? description.placeholder : description.myCafe}
        inputValue={descriptions}
        handleChange={handleChange}
        inputLength={description.inputLength}
        type={description.typeName}
      />
    </div>
  );
};

export default PostInputDescription;
