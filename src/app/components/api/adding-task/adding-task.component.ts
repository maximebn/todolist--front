import { TacheService } from './../../../shared/services/tacheservice';

import { Component, OnInit, Inject, Input } from '@angular/core';


import {FormControl, FormGroup} from '@angular/forms';
import { TacheInterface } from 'src/app/shared/interface/tache';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import { ProjetInterface } from 'src/app/shared/interface/projet';

export interface Priorite {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-adding-task',
  templateUrl: './adding-task.component.html',
  styleUrls: ['./adding-task.component.scss']
})

export class AddingTaskComponent implements OnInit {
  @Input() tache: TacheInterface;

  titreSaisi = new FormControl();
  date = new FormControl(new Date());
  priorite = new FormControl();
  statut = new FormControl();
  projetSaisi = new FormControl();

  tacheForm: FormGroup;

  //priorites: string[] = ['Normale', 'Importante', 'Prioritaire'];



  constructor(private tacheService: TacheService,
    public dialogRef: MatDialogRef<AddingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public projets: Array<ProjetInterface>) {}



  ngOnInit() {
    this.tacheForm = new FormGroup({});
    console.log(this.projets);
  }


  public save(): void {


    // Récupère la date depuis le formulaire
    const formDate: string = this.date.value;

    // Convertir la date 'chaîne' en date 'date'
    const momentDate: moment.Moment = moment(formDate, 'DD/MM/YYYY');

    this.tache = {};
    this.tache.titre = this.titreSaisi.value;
    this.tache.date = momentDate.format("YYYY-MM-DD");
    this.tache.priorite = this.priorite.value;
    this.tache.statut = '';
    this.tache.id = '';
    let projetJson : ProjetInterface={};
    projetJson.id = this.projetSaisi.value.id;
    projetJson.titre = this.projetSaisi.value.titre;
    this.tache.projet = projetJson;

    this.tacheService.addTask(this.tache).subscribe(() => console.log('ok'));
    this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
