import './App.css';

import React from 'react';

import {
  gql,
  useQuery,
} from '@apollo/client';
import {
  Grid,
  Heading,
} from '@chakra-ui/react';

import Header from './components/Header';
import { Map } from './components/Map';
import { Search } from './components/Search';

const GET_SCHOOLS = gql`
  query SchoolQuery {
    allSchools(first:1) {
      URN
      LANAME
    }
  }
`;



function App() {
  const { loading, error, data } = useQuery(GET_SCHOOLS, {

    variables: { take: 10 },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  console.log('data', data);
  return (
    <div className="App">
      <Header />
      <Heading>Search properties</Heading>
      <Grid templateColumns="20rem 1fr 20rem" gap={6}>
        <div>
          <Search />
        </div>

        <div>
          <Map />
        </div>
        <div></div>
      </Grid>

    </div >
  );
}

export default App;