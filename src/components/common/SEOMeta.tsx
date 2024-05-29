import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  pageData: {
    title: string;
    pageUrl: string;
    description: string;
  };
};

const SEOMeta = ({ pageData }: Props) => {
  const { title, pageUrl, description } = pageData;
  const baseTitle = 'DDocker - ';
  const keywords = 'ddocker'; // 페이지에 적용할 모든 키워드를 입력합니다.
  const siteUrl = 'ddocker.kro.kr/'; // 사이트의 주소를 넣어줍니다.
  const ogImage = ''; // og로 표시할 이미지를 넣어줍니다.

  return (
    <Helmet>
      <title>
        {baseTitle}
        {title}
      </title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:image"
        content={ogImage}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:url"
        content={siteUrl + pageUrl}
      />
      <meta
        property="og:image:width"
        content="1200"
      />
      <meta
        property="og:image:height"
        content="630"
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={ogImage}
      />
    </Helmet>
  );
};

export default SEOMeta;
