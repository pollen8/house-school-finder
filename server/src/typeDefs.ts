import { gql } from 'apollo-server';

export const typeDefs = gql`
  type School {
    URN:String   
    LANAME: String
    LA: Int
    ESTAB: Int
    LAESTAB: Int
    SCHNAME: String
    STREET: String
    LOCALITY: String
    ADDRESS3: String
    TOWN: String
    POSTCODE: String
    SCHSTATUS: String
    OPENDATE: String
    CLOSEDATE: String
    MINORGROUP: String
    SCHOOLTYPE: String
    ISPRIMARY: Int
    ISSECONDARY: Int
    ISPOST16: Int
    AGELOW: Int
    AGEHIGH: Int
    GENDER: String
    RELCHAR: String
    ADMPOL: String
    COORDINATES: String
  }

  type LocalAuthority {
    LEA: Int
    LANAME: String
    REGION: Int
    REGIONNAME: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    allSchools(first: Int, skip: Int, POSTCODE: String): [School]
    allLocalAuthorities(first: Int, skip: Int): [LocalAuthority]
  }
`;
