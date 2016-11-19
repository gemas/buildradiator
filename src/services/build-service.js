import {HttpClient} from 'aurelia-fetch-client';

let client = new HttpClient();

function getAllBuilds(baseUrl) {
    let url =  baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';
    
    let init =  {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch',
      })
    };
    
    return client.fetch(url, init)
    .then(response => response.json());
}

export default {getAllBuilds: getAllBuilds};