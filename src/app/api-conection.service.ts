import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface fiscaliasInterface<>{
  Fiscaliaid:string,
	DepartamentoId :string,
	MunicipioId:string,
	AldeaId :string,
	ColoniaId:string ,
	Referencia :string ,
	Tel:string,
	Dir :string ,
	Coordenadas:string,
	FechaModificado:Date ,
}


@Injectable({
  providedIn: 'root'
})
export class ApiConectionService {
  private rootApi:string="http://localhost:8080/Crud-Java/";
  constructor(private httpClient:HttpClient) { 
    
  }
  async getFiscalias () {
    let url=`${this.rootApi}fiscalia`;
    let res = await this.httpClient.request('GET',url).toPromise();
    return res
  }
  async addFiscalia (data) {
    let url=`${this.rootApi}fiscalia?opcion=crear`;
    let res = await this.httpClient.request('POST',url,{body:data}).toPromise();
    return res
  }
  async editFiscalia (data,id) {
    let url=`${this.rootApi}fiscalia?opcion=${id}`;
    let res = await this.httpClient.request('POST',url,{body:data}).toPromise();
    return res
  }
  async delFiscalia (id) {
    let url=`${this.rootApi}fiscalia?id=${id}`;
    let res = await this.httpClient.request('DELETE',url).toPromise();
    return res
  }
}
