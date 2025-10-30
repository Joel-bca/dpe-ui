import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // User Model
  User: a.model({
    clearId: a.id().required(),
    fullName: a.string().required(),
    regNumber: a.string().required(),
    christGmail: a.email().required(),
    phoneNumber: a.phone().required(),
    deptShort: a.string().required(),
    schoolShort: a.string().required(),
    classSection: a.string().required(),
    educationLevel: a.string().required(),
    individualRegistrations: a.hasMany('IndividualRegistration', 'playerClearId'),
    teamCaptained: a.hasMany('Team', 'captainClearId'),
  }).identifier(['clearId']).authorization((allow) => [
    allow.publicApiKey().to(['create', 'read', 'update', 'delete']),
  ]),

  // IndividualRegistration Model
  IndividualRegistration: a.model({
    id: a.id().required(),
    eventId: a.string().required(),
    playerClearId: a.string().required(),
    user: a.belongsTo('User', 'playerClearId'), // ✅ changed here
  }).identifier(['id']).authorization((allow) => [
    allow.publicApiKey().to(['create', 'read', 'update', 'delete']),
  ]),

  // Team Model
  Team: a.model({
    teamName: a.string().required(),
    eventId: a.string().required(),
    captainClearId: a.string().required(),
    captain: a.belongsTo('User', 'captainClearId'), // ✅ consistent naming
    teamMemberClearIds: a.string().array(),
  }).identifier(['teamName']).authorization((allow) => [
    allow.publicApiKey().to(['create', 'read', 'update', 'delete']),
  ]),

  // School Model
  School: a.model({
    schoolShort: a.id().required(),
    fullName: a.string().required(),
    color: a.string().required(),
    scores: a.hasMany('Score', 'schoolShort'),
  }).identifier(['schoolShort']).authorization((allow) => [
    allow.guest().to(['read']),
    allow.authenticated().to(['create', 'update', 'delete']),
  ]),

  // Score Model
  Score: a.model({
    id: a.id().required(),
    schoolShort: a.string().required(),
    school: a.belongsTo('School', 'schoolShort'),
    eventId: a.string().required(),
    points: a.integer().required(),
    playerOrTeamName: a.string().required(),
  }).identifier(['id']).authorization((allow) => [
    allow.guest().to(['read']),
    allow.authenticated().to(['create', 'update', 'delete']),
  ]),

  // Admin Dashboard Model
  newssection: a.model({
    id: a.id().required(),
    title: a.string().required(),
    description: a.string().required(),
  }).identifier(['id']).authorization((allow) => [
    allow.guest().to(['read']),
    allow.authenticated().to(['create', 'update', 'delete']),
  ]),
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
