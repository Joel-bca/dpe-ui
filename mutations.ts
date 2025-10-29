/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createIndividualRegistration = /* GraphQL */ `mutation CreateIndividualRegistration(
  $condition: ModelIndividualRegistrationConditionInput
  $input: CreateIndividualRegistrationInput!
) {
  createIndividualRegistration(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateIndividualRegistrationMutationVariables,
  APITypes.CreateIndividualRegistrationMutation
>;
export const createSchool = /* GraphQL */ `mutation CreateSchool(
  $condition: ModelSchoolConditionInput
  $input: CreateSchoolInput!
) {
  createSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSchoolMutationVariables,
  APITypes.CreateSchoolMutation
>;
export const createScore = /* GraphQL */ `mutation CreateScore(
  $condition: ModelScoreConditionInput
  $input: CreateScoreInput!
) {
  createScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateScoreMutationVariables,
  APITypes.CreateScoreMutation
>;
export const createTeam = /* GraphQL */ `mutation CreateTeam(
  $condition: ModelTeamConditionInput
  $input: CreateTeamInput!
) {
  createTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteIndividualRegistration = /* GraphQL */ `mutation DeleteIndividualRegistration(
  $condition: ModelIndividualRegistrationConditionInput
  $input: DeleteIndividualRegistrationInput!
) {
  deleteIndividualRegistration(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteIndividualRegistrationMutationVariables,
  APITypes.DeleteIndividualRegistrationMutation
>;
export const deleteSchool = /* GraphQL */ `mutation DeleteSchool(
  $condition: ModelSchoolConditionInput
  $input: DeleteSchoolInput!
) {
  deleteSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSchoolMutationVariables,
  APITypes.DeleteSchoolMutation
>;
export const deleteScore = /* GraphQL */ `mutation DeleteScore(
  $condition: ModelScoreConditionInput
  $input: DeleteScoreInput!
) {
  deleteScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteScoreMutationVariables,
  APITypes.DeleteScoreMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
  $condition: ModelTeamConditionInput
  $input: DeleteTeamInput!
) {
  deleteTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateIndividualRegistration = /* GraphQL */ `mutation UpdateIndividualRegistration(
  $condition: ModelIndividualRegistrationConditionInput
  $input: UpdateIndividualRegistrationInput!
) {
  updateIndividualRegistration(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateIndividualRegistrationMutationVariables,
  APITypes.UpdateIndividualRegistrationMutation
>;
export const updateSchool = /* GraphQL */ `mutation UpdateSchool(
  $condition: ModelSchoolConditionInput
  $input: UpdateSchoolInput!
) {
  updateSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSchoolMutationVariables,
  APITypes.UpdateSchoolMutation
>;
export const updateScore = /* GraphQL */ `mutation UpdateScore(
  $condition: ModelScoreConditionInput
  $input: UpdateScoreInput!
) {
  updateScore(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateScoreMutationVariables,
  APITypes.UpdateScoreMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
  $condition: ModelTeamConditionInput
  $input: UpdateTeamInput!
) {
  updateTeam(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
