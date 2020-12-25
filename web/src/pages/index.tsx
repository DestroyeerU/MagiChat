import React from 'react';

import Head from 'next/head';

import { Container } from '@styles/pages/Home';

import RocketseatLogo from '../assets/rocketseat.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <RocketseatLogo />
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by Rocketseat.</p>
    </Container>
  );
};

export default Home;
