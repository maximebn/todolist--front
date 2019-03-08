import { ProjetInterface } from './../../shared/interface/projet';
import { ProjetService } from './../../shared/services/projetservice';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.scss'],

})
export class AjoutProjetComponent implements OnInit {

public projet: ProjetInterface = {};
titreSaisi = new FormControl();
public projetForm: FormGroup;
step :number;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }


  constructor(
    public projetService: ProjetService

  ) { }

  ngOnInit() {
      this.projetForm = new FormGroup({})

  }

  public save(){
    this.projet.id = '';
    this.projet.titre = this.titreSaisi.value;
    console.log(this.projet);
    this.projetService.saveProjetRemote(this.projet).subscribe();

  }

}