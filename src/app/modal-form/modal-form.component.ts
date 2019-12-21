import { Component, OnInit,Output,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from "@angular/core";
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  @Input() botonLabel:string="Agregar";
  @Input() campos=[];
  @Output() emitirDatos=new EventEmitter();
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    let group: any = {};
    console.log('this.campos', this.campos)
    this.campos.forEach(campo => {
      let validaciones= campo.requerido?[Validators.required]:null;
      group[campo.nombreCampo] = new FormControl({value:campo.valor || '',disabled:campo.disabled},validaciones ) 
      });
    this.form = new FormGroup(group);
    console.log('this.form', this.form)
  }
  marcarCamposComoTocados(){
    for(let i in this.form.controls){
      this.form.controls[i].setValue(this.form.controls[i].value);
      this.form.controls[i].markAsTouched();
      
    }
  }
  onSubmit(){
    console.log(this.form);
    this.marcarCamposComoTocados();
    if(this.form.valid){
    this.emitirDatos.emit(this.form.value);
    }
  }
  stopPropagation(event){
    event.stopPropagation();
  }
}
