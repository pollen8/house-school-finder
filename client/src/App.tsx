import './App.css';

import React from 'react';
import useMeasure from 'react-use-measure';

import {
  gql,
  useQuery,
} from '@apollo/client';

import Header from './components/Header';
import { Map } from './components/Map';

const GET_SCHOOLS = gql`
  query SchoolQuery($first: Int $skip: Int) {
    allSchools(first: $first, skip: $skip) {
      URN
      LANAME
      COORDINATES
      SCHNAME
    }
  }
`;

function App() {
  const [ref, { width, height }] = useMeasure({ polyfill: ResizeObserver });

  const { loading, error, data } = useQuery(GET_SCHOOLS, {
    variables: { first: 100000, skip: 0 },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div>
        <Map markers={data.allSchools}
          width={width}
          height={height - 75} />
      </div>

    </div >
  );
}

export default App;
