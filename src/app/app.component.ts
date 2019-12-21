import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ApiConectionService,fiscaliasInterface } from './api-conection.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  form:FormGroup;
  camposFiscalia:fiscaliasInterface[];
  agregarFiscalia:boolean=false;
  editarFiscalia:boolean=false;
  fiscalias;
  botonFiscaliaLbl="";
  camposFiscalias=[
    {  nombreCampo: 'Nombre', etiqueta:'Nombre',
       etiquetaErrRequerido: 'El nombre es obligatorio',requerido:true,
       minCaracteres:4},
    {  nombreCampo: 'Municipio', etiqueta:'Municipio',
       etiquetaErrRequerido: 'El municipio es obligatorio',requerido:true,
       minCaracteres:4},
    {  nombreCampo: 'Departamento', etiqueta:'Departamento',
       etiquetaErrRequerido: 'El nombre es obligatorio',requerido:true,
       minCaracteres:4},
    {  nombreCampo: 'Aldea', etiqueta:'Aldea',},
    {  nombreCampo: 'Colonia', etiqueta:'Colonia',},
    {  nombreCampo: 'Referencia', etiqueta:'Referencia',},
    {  nombreCampo: 'Tel', etiqueta:'Teléfono',
       etiquetaErrRequerido: 'El contacto es obligatorio',requerido:true,
       minCaracteres:7},
    {  nombreCampo: 'Dir', etiqueta:'Dirección',
       etiquetaErrRequerido: 'la dirección es obligatoria',requerido:true,
       minCaracteres:4},
    {  nombreCampo: 'Coordenadas', etiqueta:'Coordenadas',},
   ]
   camposForm=[];
   idFiscaliaEditar:number;
  constructor(private api:ApiConectionService){
    ///this.fiscalias=this.api.getFiscalias();
    console.log(this.camposFiscalias);
    this.getFiscalias();
  }
  async getFiscalias(){
   this.fiscalias= await this.api.getFiscalias();
  }  
  /**recepcion de datos desde el modal y realizacion de edicion o creacion segun sea el caso */
  async datosEmitidos(e){
   let res
   let data=JSON.stringify(e);
   if(this.agregarFiscalia){
      res= await this.api.addFiscalia(data);}
   else if(this.editarFiscalia){
      res= await this.api.editFiscalia(data,this.idFiscaliaEditar);
      //this.idFiscaliaEditar=null;
      }
   console.log('res', res);
  }
  /** realiza un deepclone a campos form para generar el modal dinamico de creacion y luego lo muestra */
  agregar(){

     this.camposForm=JSON.parse(JSON.stringify(this.camposFiscalias));
     this.botonFiscaliaLbl="Agregar Fiscalia"
     this.agregarFiscalia=true;
  }
  /** recorre los campos de la fiscalia seleccionada para clonarlos y agregarles un valor y luego generar el array de campos para el form y luego los muestra */
  editar(fiscalia){
   console.log('fiscalia', fiscalia)
   for(let campo of this.camposFiscalias){
      let campoEdit = Object.assign("",campo);
      campoEdit['valor']=fiscalia[campo.nombreCampo];
      this.camposForm.push(campoEdit)
   }
   this.idFiscaliaEditar=fiscalia.Id;
   this.botonFiscaliaLbl="Editar Fiscalia"
   this.editarFiscalia=true;
  }
  eliminar(data){
     console.log('data', data)
     this.api.delFiscalia(data.Id)
  }
  cerrarModal(){
   this.camposForm=[];
   this.idFiscaliaEditar=null;
   this.agregarFiscalia =this.editarFiscalia=false
  }
}