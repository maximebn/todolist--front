import { ProjetService } from 'src/app/shared/services/projetservice';
import { CreateTask } from './../../../shared/services/create.service';
import { TacheInterface } from 'src/app/shared/interface/tache';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ProjetInterface } from 'src/app/shared/interface/projet';
import * as moment from 'moment';

@Component({
  selector: 'app-adding-task-outside-dialog',
  templateUrl: './adding-task-outside-dialog.component.html',
  styleUrls: ['./adding-task-outside-dialog.component.scss']
})
export class AddingTaskOutsideDialogComponent implements OnInit {
  @Input() tache: TacheInterface;

  titreSaisi = new FormControl();
  date = new FormControl(new Date());
  priorite = new FormControl();
  statut = new FormControl();
  projetSaisi = new FormControl();
  tacheForm: FormGroup;
  projets: Array<ProjetInterface>;

  constructor(private creationTacheService : CreateTask, private projetService: ProjetService) {}

  ngOnInit() {
    this.tacheForm = new FormGroup({});
    this.projetService.getRemoteProjets().subscribe( (result) => this.projets = result);
    console.log(this.projets);
  }


  public save(): void {

    // Récupère la date depuis le formulaire
    const formDate: string = this.date.value;

    // Convertir la date 'chaîne' en date 'date'
    const momentDate: moment.Moment = moment(formDate, 'DD/MM/YYYY');

    this.tache = {};
    this.tache.titre = this.titreSaisi.value;
    this.tache.date = momentDate.format('YYYY-MM-DD');
    this.tache.priorite = this.priorite.value;
    this.tache.statut = '';
    this.tache.id = '';
    let projetJson : ProjetInterface={};
    projetJson.id = this.projetSaisi.value.id;
    projetJson.titre = this.projetSaisi.value.titre;
    this.tache.projet = projetJson;

    this.creationTacheService.addTask(this.tache).subscribe(() => console.log('ok'));
  }

}
