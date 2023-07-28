import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class MasterDataClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/dataentities`,
      context,
      {
        ...options,
        headers: {
          VtexIdClientAutCookie:
            context.adminUserAuthToken ??
            context.storeUserAuthToken ??
            context.authToken,
        },
      }
    )
  }
  public async getData(query : string, entity : string) {
    console.log(`/${entity}/search?_fields=_all&_where=(${query})`);
    return this.http.getRaw(`/${entity}/search?_fields=_all&_where=(${query})`)
  }

  public async updateDocument(id: string, body: any) {
    await this.http.patch(
      `/CS/documents/${id}`,
      body
    )
    return { status: 200 }
  }

  public async createDocument(body: any) {
    await this.http.post(
      `/CO/documents`,
      body
    )
    return { status: 200 }
  }

}
