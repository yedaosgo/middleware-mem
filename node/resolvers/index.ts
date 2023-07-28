import {
  queries as masterDataQueries,
  mutations as masterDataMutations,
} from './masterdata'

export const resolvers = {
  Query: {
    ...masterDataQueries
  },
  Mutation: {
    ...masterDataMutations,
  },
}
