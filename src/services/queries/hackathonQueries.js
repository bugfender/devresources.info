import { gql } from "graphql-request";
const dataLimit = process.env.NEXT_PUBLIC_CAISY_DATA_LIMIT || 10;

const pastDate =
  `"${process.env.NEXT_PUBLIC_PAST_DATE_DATA}"` || `"2023-01-01"`;

const commonQueries = `edges {
      node {
         _meta {
          publishedAt
        }
        city {
          ... on City {
            id
            name
          }
        }
        continent {
          ... on Continent {
            id
            name
          }
        }
        country {
          ... on Country {
            id
            name
          }
        }
        endDate
        id
        name
        startDate
        technology {
          ... on Technology {
            id
            name
            filledIcon {
              id
              src
            }
            unfilledIcon {
              id
              src
            }
          }
        }
        url
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount`;

export const allHackathonFilterQuery = ({
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate,
  endCursor,
  startCursor,
}) => {
  let filtersSelected = `${
    techSelected
      ? `technology: { findOne: { Technology: { name: { contains: ${techSelected} } } } }`
      : ""
  },
  ${
    citySelected
      ? `city: { findOne: { City: { name: { contains: ${citySelected} } } } }`
      : ""
  }, 
  ${
    countrySelected
      ? `country: { findOne: { Country: { name: { contains: ${countrySelected} } } } }`
      : ""
  },
  ${
    continentSelected
      ? `continent: { findOne: { Continent: { name: { contains: ${continentSelected} } } } }`
      : ""
  }`;

  if (convertedDate) {
    return gql`
      query allHackathon {
        allHackathon(
         sort: {startDate: ASC}
         ${startCursor ? `last:  ${dataLimit}` : `first:  ${dataLimit}`}
         ${endCursor ? `after:  ${endCursor}` : ""},
         ${startCursor ? `before:  ${startCursor}` : ""},
          where: {
            startDate: {gte: ${convertedDate}},
              ${filtersSelected}
         }
       ) {
           ${commonQueries}
       }
     }
    `;
  } else {
    return gql`
  query allHackathon {
    allHackathon(
      sort: {startDate: ASC}
      ${startCursor ? `last:  ${dataLimit}` : `first:  ${dataLimit}`}
      ${endCursor ? `after:  ${endCursor}` : ""},
      ${startCursor ? `before:  ${startCursor}` : ""},
      where: {
         startDate: {gte: ${pastDate}},
          ${filtersSelected}
      }
    ) {
        ${commonQueries}
    }
  }
`;
  }
};
