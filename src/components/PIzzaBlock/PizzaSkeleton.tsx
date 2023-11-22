import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="142" cy="129" r="125" />
      <rect x="0" y="260" rx="10" ry="10" width="280" height="24" />
      <rect x="1" y="313" rx="10" ry="10" width="280" height="84" />
      <rect x="2" y="416" rx="5" ry="5" width="87" height="27" />
      <rect x="130" y="413" rx="30" ry="30" width="150" height="44" />
    </ContentLoader>
  </div>
);

export default Skeleton;
