import {
  getEditorDefaults,
  createDefaultImageWriter,
  PinturaEditorBaseOptions
} from '@pqina/pintura';
import locale_ko_KR from '@pqina/pintura/locale/ko_KR';

export const editorDefaults = getEditorDefaults({
  cropImageSelectionCornerStyle: 'hook',
  locale: {
    ...locale_ko_KR
  },
  imageWriter: createDefaultImageWriter({
    targetSize: {
      width: 100,
      height: 100,
      fit: 'contain',
      upscale: true
    }
  })
});

export const handleCanvas: PinturaEditorBaseOptions['willRenderCanvas'] = (
  shapes,
  state
) => {
  const { utilVisibility, selectionRect, lineColor } = state;

  if (utilVisibility.crop <= 0) return shapes;

  const { x, y, width, height } = selectionRect;

  return {
    ...shapes,

    interfaceShapes: [
      {
        x: x + width * 0.5,
        y: y + height * 0.5,
        rx: width * 0.5,
        ry: height * 0.5,
        opacity: utilVisibility.crop,
        inverted: true,
        backgroundColor: [0, 0, 0, 0.1],
        strokeWidth: 0.4,
        strokeColor: [...lineColor]
      },
      ...shapes.interfaceShapes
    ]
  };
};
