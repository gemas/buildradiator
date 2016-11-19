import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';


let client = new HttpClient();

@inject(HttpClient)
export class BuildService {
  constructor(client) {
    this.client = client;
  }

  getAllBuilds(baseUrl) {
    let url =  baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';
    
    let init =  {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch',
      })
    };
    
    return this.client.fetch(url, init)
    .then(response => response.json());
  }
}
