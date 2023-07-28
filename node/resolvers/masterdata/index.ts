export const queries = {
  getData: async (_: unknown,{ couponId, entity  }: any, ctx: Context): Promise<any> => {
    return ctx.clients.masterDataClient.getData(couponId, entity)
  },
}

export const mutations = {
  updateDocument: async (
    _: unknown,
    { documentId, body }: any,
    ctx: Context
  ): Promise<any> => {
    return ctx.clients.masterDataClient.updateDocument(documentId, body)
  },
}
