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
  const keywords = 'ddocker, coffee, caffeine, 똑커, 커피, 카페인, 커피사진';
  const siteUrl = 'https://ddocker.kro.kr/';
  const ogImage = '';

  return (
    <Helmet>
      <title>
        {baseTitle}
        {title}
      </title>
      <meta
        name="theme-color"
        content="#FF701E"
      />
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
