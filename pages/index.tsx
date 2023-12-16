import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const apiPath = '/api/[mac address]';

  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <p>The API path to look up a MAC address is {apiPath}</p>
    </div>
  );
};

export default IndexPage;
