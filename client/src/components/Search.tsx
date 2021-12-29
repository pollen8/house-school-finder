import React from 'react';

import {
  gql,
  useQuery,
} from '@apollo/client';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { SearchHouses } from './SearchHouses';

const GET_LOCAL_AUTHORITIES = gql`
query LocalAuthorityQuery {
  allLocalAuthorities(first: 10) {
    LEA
    LANAME
    REGION
    REGIONNAME
  }
}
`

export const Search = () => {
  const { loading, error, data } = useQuery(GET_LOCAL_AUTHORITIES, {

    variables: { take: 10 },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>error</p>;
  }
  console.log('loacal authorities', data);
  return (
    <Box m={2}>
      <Tabs variant="enclosed"
        isFitted
      >
        <TabList>
          <Tab>House</Tab>
          <Tab>Schools</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SearchHouses />
          </TabPanel>
          <TabPanel>

          </TabPanel>

        </TabPanels>
      </Tabs>

    </Box>
  )
}
