import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getIndividualRegistration = /* GraphQL */ `query GetIndividualRegistration($id: ID!) {
  getIndividualRegistration(id: $id) {
    createdAt
    eventId
    id
    playerClearId
    updatedAt
    user {
      christGmail
      clearId
      createdAt
      deptShort
      educationLevel
      fullName
      phoneNumber
      regNumber
      schoolShort
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetIndividualRegistrationQueryVariables,
  APITypes.GetIndividualRegistrationQuery
>;
export const getNewssection = /* GraphQL */ `query GetNewssection($id: ID!) {
  getNewssection(id: $id) {
    createdAt
    description
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNewssectionQueryVariables,
  APITypes.GetNewssectionQuery
>;
export const getSchool = /* GraphQL */ `query GetSchool($schoolShort: ID!) {
  getSchool(schoolShort: $schoolShort) {
    color
    createdAt
    fullName
    schoolShort
    scores {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSchoolQueryVariables, APITypes.GetSchoolQuery>;
export const getScore = /* GraphQL */ `query GetScore($id: ID!) {
  getScore(id: $id) {
    createdAt
    eventId
    id
    playerOrTeamName
    points
    school {
      color
      createdAt
      fullName
      schoolShort
      updatedAt
      __typename
    }
    schoolShort
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetScoreQueryVariables, APITypes.GetScoreQuery>;
export const getTeam = /* GraphQL */ `query GetTeam($teamName: String!) {
  getTeam(teamName: $teamName) {
    captain {
      christGmail
      clearId
      createdAt
      deptShort
      educationLevel
      fullName
      phoneNumber
      regNumber
      schoolShort
      updatedAt
      __typename
    }
    captainClearId
    createdAt
    eventId
    teamMemberClearIds
    teamName
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamQueryVariables, APITypes.GetTeamQuery>;
export const getUser = /* GraphQL */ `query GetUser($clearId: ID!) {
  getUser(clearId: $clearId) {
    christGmail
    clearId
    createdAt
    deptShort
    educationLevel
    fullName
    individualRegistrations {
      nextToken
      __typename
    }
    phoneNumber
    regNumber
    schoolShort
    teamCaptained {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listIndividualRegistrations = /* GraphQL */ `query ListIndividualRegistrations(
  $filter: ModelIndividualRegistrationFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listIndividualRegistrations(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      eventId
      id
      playerClearId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIndividualRegistrationsQueryVariables,
  APITypes.ListIndividualRegistrationsQuery
>;
export const listNewssections = /* GraphQL */ `query ListNewssections(
  $filter: ModelNewssectionFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listNewssections(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      description
      id
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNewssectionsQueryVariables,
  APITypes.ListNewssectionsQuery
>;
export const listSchools = /* GraphQL */ `query ListSchools(
  $filter: ModelSchoolFilterInput
  $limit: Int
  $nextToken: String
  $schoolShort: ID
  $sortDirection: ModelSortDirection
) {
  listSchools(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    schoolShort: $schoolShort
    sortDirection: $sortDirection
  ) {
    items {
      color
      createdAt
      fullName
      schoolShort
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchoolsQueryVariables,
  APITypes.ListSchoolsQuery
>;
export const listScores = /* GraphQL */ `query ListScores(
  $filter: ModelScoreFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listScores(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      eventId
      id
      playerOrTeamName
      points
      schoolShort
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScoresQueryVariables,
  APITypes.ListScoresQuery
>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $teamName: String
) {
  listTeams(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    teamName: $teamName
  ) {
    items {
      captainClearId
      createdAt
      eventId
      teamMemberClearIds
      teamName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $clearId: ID
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    clearId: $clearId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      christGmail
      clearId
      createdAt
      deptShort
      educationLevel
      fullName
      phoneNumber
      regNumber
      schoolShort
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
