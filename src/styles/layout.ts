import { css, cx } from 'styled-system/css';

export const Flex = css`
  display: flex;
`;

export const Justify = cx(
  Flex,
  css`
    justify-content: center;
  `
);
export const Align = cx(
  Flex,
  css`
    align-items: center;
  `
);

export const Between = css`
  justify-content: space-between;
`;

export const Evenly = css`
  justify-content: space-evenly;
`;

export const Center = css`
  justify-content: center;
  align-items: center;
`;

export const FlexCenter = cx(Flex, Center);

export const Column = cx(
  Flex,
  css`
    flex-direction: column;
  `
);

export const MarginAuto = css`
  margin: auto;
`;

export const Grid = css`
  display: grid;
`;
