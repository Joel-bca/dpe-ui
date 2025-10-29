import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateIndividualRegistration = /* GraphQL */ `subscription OnCreateIndividualRegistration(
  $filter: ModelSubscriptionIndividualRegistrationFilterInput
) {
  onCreateIndividualRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateIndividualRegistrationSubscriptionVariables,
  APITypes.OnCreateIndividualRegistrationSubscription
>;
export const onCreateNewssection = /* GraphQL */ `subscription OnCreateNewssection(
  $filter: ModelSubscriptionNewssectionFilterInput
) {
  onCreateNewssection(filter: $filter) {
    createdAt
    description
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNewssectionSubscriptionVariables,
  APITypes.OnCreateNewssectionSubscription
>;
export const onCreateSchool = /* GraphQL */ `subscription OnCreateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onCreateSchool(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSchoolSubscriptionVariables,
  APITypes.OnCreateSchoolSubscription
>;
export const onCreateScore = /* GraphQL */ `subscription OnCreateScore($filter: ModelSubscriptionScoreFilterInput) {
  onCreateScore(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateScoreSubscriptionVariables,
  APITypes.OnCreateScoreSubscription
>;
export const onCreateTeam = /* GraphQL */ `subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
  onCreateTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamSubscriptionVariables,
  APITypes.OnCreateTeamSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteIndividualRegistration = /* GraphQL */ `subscription OnDeleteIndividualRegistration(
  $filter: ModelSubscriptionIndividualRegistrationFilterInput
) {
  onDeleteIndividualRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteIndividualRegistrationSubscriptionVariables,
  APITypes.OnDeleteIndividualRegistrationSubscription
>;
export const onDeleteNewssection = /* GraphQL */ `subscription OnDeleteNewssection(
  $filter: ModelSubscriptionNewssectionFilterInput
) {
  onDeleteNewssection(filter: $filter) {
    createdAt
    description
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNewssectionSubscriptionVariables,
  APITypes.OnDeleteNewssectionSubscription
>;
export const onDeleteSchool = /* GraphQL */ `subscription OnDeleteSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onDeleteSchool(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSchoolSubscriptionVariables,
  APITypes.OnDeleteSchoolSubscription
>;
export const onDeleteScore = /* GraphQL */ `subscription OnDeleteScore($filter: ModelSubscriptionScoreFilterInput) {
  onDeleteScore(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteScoreSubscriptionVariables,
  APITypes.OnDeleteScoreSubscription
>;
export const onDeleteTeam = /* GraphQL */ `subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
  onDeleteTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamSubscriptionVariables,
  APITypes.OnDeleteTeamSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateIndividualRegistration = /* GraphQL */ `subscription OnUpdateIndividualRegistration(
  $filter: ModelSubscriptionIndividualRegistrationFilterInput
) {
  onUpdateIndividualRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateIndividualRegistrationSubscriptionVariables,
  APITypes.OnUpdateIndividualRegistrationSubscription
>;
export const onUpdateNewssection = /* GraphQL */ `subscription OnUpdateNewssection(
  $filter: ModelSubscriptionNewssectionFilterInput
) {
  onUpdateNewssection(filter: $filter) {
    createdAt
    description
    id
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNewssectionSubscriptionVariables,
  APITypes.OnUpdateNewssectionSubscription
>;
export const onUpdateSchool = /* GraphQL */ `subscription OnUpdateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onUpdateSchool(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSchoolSubscriptionVariables,
  APITypes.OnUpdateSchoolSubscription
>;
export const onUpdateScore = /* GraphQL */ `subscription OnUpdateScore($filter: ModelSubscriptionScoreFilterInput) {
  onUpdateScore(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateScoreSubscriptionVariables,
  APITypes.OnUpdateScoreSubscription
>;
export const onUpdateTeam = /* GraphQL */ `subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
  onUpdateTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamSubscriptionVariables,
  APITypes.OnUpdateTeamSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
