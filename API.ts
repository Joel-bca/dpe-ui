/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type IndividualRegistration = {
  __typename: "IndividualRegistration",
  createdAt: string,
  eventId: string,
  id: string,
  playerClearId: string,
  updatedAt: string,
  user?: User | null,
};

export type User = {
  __typename: "User",
  christGmail: string,
  classSection: string,
  clearId: string,
  createdAt: string,
  deptShort: string,
  educationLevel: string,
  fullName: string,
  individualRegistrations?: ModelIndividualRegistrationConnection | null,
  phoneNumber: string,
  regNumber: string,
  schoolShort: string,
  teamCaptained?: ModelTeamConnection | null,
  updatedAt: string,
};

export type ModelIndividualRegistrationConnection = {
  __typename: "ModelIndividualRegistrationConnection",
  items:  Array<IndividualRegistration | null >,
  nextToken?: string | null,
};

export type ModelTeamConnection = {
  __typename: "ModelTeamConnection",
  items:  Array<Team | null >,
  nextToken?: string | null,
};

export type Team = {
  __typename: "Team",
  captain?: User | null,
  captainClearId: string,
  createdAt: string,
  eventId: string,
  teamMemberClearIds?: Array< string | null > | null,
  teamName: string,
  updatedAt: string,
};

export type newssection = {
  __typename: "newssection",
  createdAt: string,
  description: string,
  id: string,
  title: string,
  updatedAt: string,
};

export type School = {
  __typename: "School",
  color: string,
  createdAt: string,
  fullName: string,
  schoolShort: string,
  scores?: ModelScoreConnection | null,
  updatedAt: string,
};

export type ModelScoreConnection = {
  __typename: "ModelScoreConnection",
  items:  Array<Score | null >,
  nextToken?: string | null,
};

export type Score = {
  __typename: "Score",
  createdAt: string,
  eventId: string,
  id: string,
  playerOrTeamName: string,
  points: number,
  school?: School | null,
  schoolShort: string,
  updatedAt: string,
};

export type ModelIndividualRegistrationFilterInput = {
  and?: Array< ModelIndividualRegistrationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelIndividualRegistrationFilterInput | null,
  or?: Array< ModelIndividualRegistrationFilterInput | null > | null,
  playerClearId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelNewssectionFilterInput = {
  and?: Array< ModelNewssectionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelNewssectionFilterInput | null,
  or?: Array< ModelNewssectionFilterInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelNewssectionConnection = {
  __typename: "ModelNewssectionConnection",
  items:  Array<newssection | null >,
  nextToken?: string | null,
};

export type ModelSchoolFilterInput = {
  and?: Array< ModelSchoolFilterInput | null > | null,
  color?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelSchoolFilterInput | null,
  or?: Array< ModelSchoolFilterInput | null > | null,
  schoolShort?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSchoolConnection = {
  __typename: "ModelSchoolConnection",
  items:  Array<School | null >,
  nextToken?: string | null,
};

export type ModelScoreFilterInput = {
  and?: Array< ModelScoreFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelScoreFilterInput | null,
  or?: Array< ModelScoreFilterInput | null > | null,
  playerOrTeamName?: ModelStringInput | null,
  points?: ModelIntInput | null,
  schoolShort?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelTeamFilterInput = {
  and?: Array< ModelTeamFilterInput | null > | null,
  captainClearId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelTeamFilterInput | null,
  or?: Array< ModelTeamFilterInput | null > | null,
  teamMemberClearIds?: ModelStringInput | null,
  teamName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  christGmail?: ModelStringInput | null,
  classSection?: ModelStringInput | null,
  clearId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  deptShort?: ModelStringInput | null,
  educationLevel?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  regNumber?: ModelStringInput | null,
  schoolShort?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelIndividualRegistrationConditionInput = {
  and?: Array< ModelIndividualRegistrationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  not?: ModelIndividualRegistrationConditionInput | null,
  or?: Array< ModelIndividualRegistrationConditionInput | null > | null,
  playerClearId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateIndividualRegistrationInput = {
  eventId: string,
  id?: string | null,
  playerClearId: string,
};

export type ModelNewssectionConditionInput = {
  and?: Array< ModelNewssectionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  not?: ModelNewssectionConditionInput | null,
  or?: Array< ModelNewssectionConditionInput | null > | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateNewssectionInput = {
  description: string,
  id?: string | null,
  title: string,
};

export type ModelSchoolConditionInput = {
  and?: Array< ModelSchoolConditionInput | null > | null,
  color?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  not?: ModelSchoolConditionInput | null,
  or?: Array< ModelSchoolConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSchoolInput = {
  color: string,
  fullName: string,
  schoolShort: string,
};

export type ModelScoreConditionInput = {
  and?: Array< ModelScoreConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  not?: ModelScoreConditionInput | null,
  or?: Array< ModelScoreConditionInput | null > | null,
  playerOrTeamName?: ModelStringInput | null,
  points?: ModelIntInput | null,
  schoolShort?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateScoreInput = {
  eventId: string,
  id?: string | null,
  playerOrTeamName: string,
  points: number,
  schoolShort: string,
};

export type ModelTeamConditionInput = {
  and?: Array< ModelTeamConditionInput | null > | null,
  captainClearId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  eventId?: ModelStringInput | null,
  not?: ModelTeamConditionInput | null,
  or?: Array< ModelTeamConditionInput | null > | null,
  teamMemberClearIds?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTeamInput = {
  captainClearId: string,
  eventId: string,
  teamMemberClearIds?: Array< string | null > | null,
  teamName: string,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  christGmail?: ModelStringInput | null,
  classSection?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deptShort?: ModelStringInput | null,
  educationLevel?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  phoneNumber?: ModelStringInput | null,
  regNumber?: ModelStringInput | null,
  schoolShort?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  christGmail: string,
  classSection: string,
  clearId: string,
  deptShort: string,
  educationLevel: string,
  fullName: string,
  phoneNumber: string,
  regNumber: string,
  schoolShort: string,
};

export type DeleteIndividualRegistrationInput = {
  id: string,
};

export type DeleteNewssectionInput = {
  id: string,
};

export type DeleteSchoolInput = {
  schoolShort: string,
};

export type DeleteScoreInput = {
  id: string,
};

export type DeleteTeamInput = {
  teamName: string,
};

export type DeleteUserInput = {
  clearId: string,
};

export type UpdateIndividualRegistrationInput = {
  eventId?: string | null,
  id: string,
  playerClearId?: string | null,
};

export type UpdateNewssectionInput = {
  description?: string | null,
  id: string,
  title?: string | null,
};

export type UpdateSchoolInput = {
  color?: string | null,
  fullName?: string | null,
  schoolShort: string,
};

export type UpdateScoreInput = {
  eventId?: string | null,
  id: string,
  playerOrTeamName?: string | null,
  points?: number | null,
  schoolShort?: string | null,
};

export type UpdateTeamInput = {
  captainClearId?: string | null,
  eventId?: string | null,
  teamMemberClearIds?: Array< string | null > | null,
  teamName: string,
};

export type UpdateUserInput = {
  christGmail?: string | null,
  classSection?: string | null,
  clearId: string,
  deptShort?: string | null,
  educationLevel?: string | null,
  fullName?: string | null,
  phoneNumber?: string | null,
  regNumber?: string | null,
  schoolShort?: string | null,
};

export type ModelSubscriptionIndividualRegistrationFilterInput = {
  and?: Array< ModelSubscriptionIndividualRegistrationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionIndividualRegistrationFilterInput | null > | null,
  playerClearId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionNewssectionFilterInput = {
  and?: Array< ModelSubscriptionNewssectionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionNewssectionFilterInput | null > | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSchoolFilterInput = {
  and?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  color?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  schoolShort?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionScoreFilterInput = {
  and?: Array< ModelSubscriptionScoreFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionScoreFilterInput | null > | null,
  playerOrTeamName?: ModelSubscriptionStringInput | null,
  points?: ModelSubscriptionIntInput | null,
  schoolShort?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionTeamFilterInput = {
  and?: Array< ModelSubscriptionTeamFilterInput | null > | null,
  captainClearId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionTeamFilterInput | null > | null,
  teamMemberClearIds?: ModelSubscriptionStringInput | null,
  teamName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  christGmail?: ModelSubscriptionStringInput | null,
  classSection?: ModelSubscriptionStringInput | null,
  clearId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  deptShort?: ModelSubscriptionStringInput | null,
  educationLevel?: ModelSubscriptionStringInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  regNumber?: ModelSubscriptionStringInput | null,
  schoolShort?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetIndividualRegistrationQueryVariables = {
  id: string,
};

export type GetIndividualRegistrationQuery = {
  getIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type GetNewssectionQueryVariables = {
  id: string,
};

export type GetNewssectionQuery = {
  getNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type GetSchoolQueryVariables = {
  schoolShort: string,
};

export type GetSchoolQuery = {
  getSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetScoreQueryVariables = {
  id: string,
};

export type GetScoreQuery = {
  getScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type GetTeamQueryVariables = {
  teamName: string,
};

export type GetTeamQuery = {
  getTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  clearId: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListIndividualRegistrationsQueryVariables = {
  filter?: ModelIndividualRegistrationFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListIndividualRegistrationsQuery = {
  listIndividualRegistrations?:  {
    __typename: "ModelIndividualRegistrationConnection",
    items:  Array< {
      __typename: "IndividualRegistration",
      createdAt: string,
      eventId: string,
      id: string,
      playerClearId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListNewssectionsQueryVariables = {
  filter?: ModelNewssectionFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListNewssectionsQuery = {
  listNewssections?:  {
    __typename: "ModelNewssectionConnection",
    items:  Array< {
      __typename: "newssection",
      createdAt: string,
      description: string,
      id: string,
      title: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchoolsQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  schoolShort?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSchoolsQuery = {
  listSchools?:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListScoresQueryVariables = {
  filter?: ModelScoreFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListScoresQuery = {
  listScores?:  {
    __typename: "ModelScoreConnection",
    items:  Array< {
      __typename: "Score",
      createdAt: string,
      eventId: string,
      id: string,
      playerOrTeamName: string,
      points: number,
      schoolShort: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  teamName?: string | null,
};

export type ListTeamsQuery = {
  listTeams?:  {
    __typename: "ModelTeamConnection",
    items:  Array< {
      __typename: "Team",
      captainClearId: string,
      createdAt: string,
      eventId: string,
      teamMemberClearIds?: Array< string | null > | null,
      teamName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  clearId?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateIndividualRegistrationMutationVariables = {
  condition?: ModelIndividualRegistrationConditionInput | null,
  input: CreateIndividualRegistrationInput,
};

export type CreateIndividualRegistrationMutation = {
  createIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateNewssectionMutationVariables = {
  condition?: ModelNewssectionConditionInput | null,
  input: CreateNewssectionInput,
};

export type CreateNewssectionMutation = {
  createNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type CreateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: CreateSchoolInput,
};

export type CreateSchoolMutation = {
  createSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null,
  input: CreateScoreInput,
};

export type CreateScoreMutation = {
  createScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type CreateTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null,
  input: CreateTeamInput,
};

export type CreateTeamMutation = {
  createTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteIndividualRegistrationMutationVariables = {
  condition?: ModelIndividualRegistrationConditionInput | null,
  input: DeleteIndividualRegistrationInput,
};

export type DeleteIndividualRegistrationMutation = {
  deleteIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteNewssectionMutationVariables = {
  condition?: ModelNewssectionConditionInput | null,
  input: DeleteNewssectionInput,
};

export type DeleteNewssectionMutation = {
  deleteNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type DeleteSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: DeleteSchoolInput,
};

export type DeleteSchoolMutation = {
  deleteSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null,
  input: DeleteScoreInput,
};

export type DeleteScoreMutation = {
  deleteScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null,
  input: DeleteTeamInput,
};

export type DeleteTeamMutation = {
  deleteTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateIndividualRegistrationMutationVariables = {
  condition?: ModelIndividualRegistrationConditionInput | null,
  input: UpdateIndividualRegistrationInput,
};

export type UpdateIndividualRegistrationMutation = {
  updateIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateNewssectionMutationVariables = {
  condition?: ModelNewssectionConditionInput | null,
  input: UpdateNewssectionInput,
};

export type UpdateNewssectionMutation = {
  updateNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type UpdateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: UpdateSchoolInput,
};

export type UpdateSchoolMutation = {
  updateSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateScoreMutationVariables = {
  condition?: ModelScoreConditionInput | null,
  input: UpdateScoreInput,
};

export type UpdateScoreMutation = {
  updateScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeamMutationVariables = {
  condition?: ModelTeamConditionInput | null,
  input: UpdateTeamInput,
};

export type UpdateTeamMutation = {
  updateTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateIndividualRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionIndividualRegistrationFilterInput | null,
};

export type OnCreateIndividualRegistrationSubscription = {
  onCreateIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateNewssectionSubscriptionVariables = {
  filter?: ModelSubscriptionNewssectionFilterInput | null,
};

export type OnCreateNewssectionSubscription = {
  onCreateNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnCreateSchoolSubscription = {
  onCreateSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
};

export type OnCreateScoreSubscription = {
  onCreateScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
};

export type OnCreateTeamSubscription = {
  onCreateTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteIndividualRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionIndividualRegistrationFilterInput | null,
};

export type OnDeleteIndividualRegistrationSubscription = {
  onDeleteIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteNewssectionSubscriptionVariables = {
  filter?: ModelSubscriptionNewssectionFilterInput | null,
};

export type OnDeleteNewssectionSubscription = {
  onDeleteNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnDeleteSchoolSubscription = {
  onDeleteSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
};

export type OnDeleteScoreSubscription = {
  onDeleteScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
};

export type OnDeleteTeamSubscription = {
  onDeleteTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateIndividualRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionIndividualRegistrationFilterInput | null,
};

export type OnUpdateIndividualRegistrationSubscription = {
  onUpdateIndividualRegistration?:  {
    __typename: "IndividualRegistration",
    createdAt: string,
    eventId: string,
    id: string,
    playerClearId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateNewssectionSubscriptionVariables = {
  filter?: ModelSubscriptionNewssectionFilterInput | null,
};

export type OnUpdateNewssectionSubscription = {
  onUpdateNewssection?:  {
    __typename: "newssection",
    createdAt: string,
    description: string,
    id: string,
    title: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnUpdateSchoolSubscription = {
  onUpdateSchool?:  {
    __typename: "School",
    color: string,
    createdAt: string,
    fullName: string,
    schoolShort: string,
    scores?:  {
      __typename: "ModelScoreConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateScoreSubscriptionVariables = {
  filter?: ModelSubscriptionScoreFilterInput | null,
};

export type OnUpdateScoreSubscription = {
  onUpdateScore?:  {
    __typename: "Score",
    createdAt: string,
    eventId: string,
    id: string,
    playerOrTeamName: string,
    points: number,
    school?:  {
      __typename: "School",
      color: string,
      createdAt: string,
      fullName: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    schoolShort: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeamSubscriptionVariables = {
  filter?: ModelSubscriptionTeamFilterInput | null,
};

export type OnUpdateTeamSubscription = {
  onUpdateTeam?:  {
    __typename: "Team",
    captain?:  {
      __typename: "User",
      christGmail: string,
      classSection: string,
      clearId: string,
      createdAt: string,
      deptShort: string,
      educationLevel: string,
      fullName: string,
      phoneNumber: string,
      regNumber: string,
      schoolShort: string,
      updatedAt: string,
    } | null,
    captainClearId: string,
    createdAt: string,
    eventId: string,
    teamMemberClearIds?: Array< string | null > | null,
    teamName: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    christGmail: string,
    classSection: string,
    clearId: string,
    createdAt: string,
    deptShort: string,
    educationLevel: string,
    fullName: string,
    individualRegistrations?:  {
      __typename: "ModelIndividualRegistrationConnection",
      nextToken?: string | null,
    } | null,
    phoneNumber: string,
    regNumber: string,
    schoolShort: string,
    teamCaptained?:  {
      __typename: "ModelTeamConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};
