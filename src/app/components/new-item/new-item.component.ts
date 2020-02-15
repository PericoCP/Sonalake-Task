import { Component, OnInit } from '@angular/core';
import { SpeciesService } from '../../services/species.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sl-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  optionsSelect: any;
  loadingSpecies: boolean;
  genderValid: boolean;

  constructor(private _speciesService: SpeciesService, private router: Router) { }

  ngOnInit() {

    this.genderValid = false;
    this.loadingSpecies = true;
    this.optionsSelect = this._speciesService.getSpecies().subscribe((species: Array<string>) => {
      this.optionsSelect = species;
      console.log(this.optionsSelect);
      this.loadingSpecies = false;
    });

  }

  sendForm() {


    this.router.navigate(['/home']);
  }

}
