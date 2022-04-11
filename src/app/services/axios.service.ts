import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  urlApi = 'https://localhost:44388/api/Cadastrar';

  constructor() {}

  putUser(data: any) {
    return axios
      .put(this.urlApi, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
