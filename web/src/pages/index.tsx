import React, { useEffect } from 'react';

import { useRouter } from 'next/dist/client/router';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return <></>;
};

export default Home;
