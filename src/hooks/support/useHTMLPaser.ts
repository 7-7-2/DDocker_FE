import React, { useEffect, useState } from 'react';
export const useHTMLParser = (markdown: string | undefined) => {
  if (!markdown) return '';

  // 간단한 마크다운 구문을 HTML로 변환
  let html = markdown;

  //  하이라이트 변환
  html = html.replace(/==(.*?)==/g, '<h3>$1</h3>');
  // 강조 표시 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // 볼드체
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>'); // 볼드체

  // 이탤릭체 변환
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>'); // 이탤릭체
  html = html.replace(/_(.*?)_/g, '<em>$1</em>'); // 이탤릭체

  // 코드 블록 변환
  html = html.replace(/`(.*?)`/g, '<code>$1</code>'); // 인라인 코드

  // 링크 변환
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'); // 링크

  // 줄 바꿈 변환
  html = html.replace(/\n/g, '<br>'); // 줄 바꿈

  // - 변환
  html = html.replace(/\*\s\[(.*?)\]/g, '<li><strong>$1</strong></li>');

  return html;
};
