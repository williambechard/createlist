import {
  SPHttpClient,
  SPHttpClientCommonConfiguration,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
interface ISPList {
  Title: string;
}
interface ISPLists {
  value: ISPList[];
}
export class ListService {
  public static isListExists(
    weburl: string,
    title: string,
    client: SPHttpClient
  ): Promise<boolean> {
    const url = `${weburl}/_api/web/lists?$filter=Title eq '${title}'&$select=Title`;
    return new Promise<boolean>((resolve, reject) => {
      return client
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            response
              .json()
              .then((responsejson: ISPLists) => {
                if (responsejson.value.length > 0) {
                  //list exists
                  resolve(true);
                } else {
                  //list does not exists
                  resolve(false);
                }
              })
              .catch((e) => {
                console.error(e);
              });
          } else {
            reject("Something went wrong.");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  public static createList(
    weburl: string,
    listTitle: string,
    client: SPHttpClient
  ): Promise<boolean> {
    const urlToPost = `${weburl}/_api/web/lists`;
    const listBody: any = {
      Title: listTitle,
      Description: "My description",
      AllowContentTypes: false,
      BaseTemplate: 100,
    };
    const spHttpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(listBody),
    };
    return new Promise<boolean>((resolve, reject) => {
      client
        .post(urlToPost, SPHttpClient.configurations.v1, spHttpClientOptions)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            if (response.status === 201) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            reject("Something went wrong");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
