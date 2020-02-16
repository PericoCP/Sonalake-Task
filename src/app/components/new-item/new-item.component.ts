import { Component, OnInit } from '@angular/core';
import { SpeciesService } from '../../services/species.service';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';
import { Directive, Self } from '@angular/core';
import { NgControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sl-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  optionsSelect: any;
  loadingSpecies: boolean;
  genderValid: boolean;
  character: Characters;
  loginForm: FormGroup;
  editMode = false;
  controlStatusHost = {
    '[class.is-valid]': 'ngClassValid',
    '[class.is-invalid]': 'ngClassInvalid'
  };

  constructor(private _speciesService: SpeciesService, private _charactersService: CharactersService, private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('character')) {
      this.editMode = true;
      this.character = JSON.parse(localStorage.getItem('character'));
    } else {
      this.editMode = false;
      this.character = {
        name: '',
        species: '',
        gender: '',
        homeworld: ''
      };
    }

    this.loginForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      'species': new FormControl('', [
        Validators.required
      ]),
      'gender': new FormControl('', [
        Validators.required
      ]),
      'homeworld': new FormControl('', [
      ])
    });

    this.genderValid = false;
    this.loadingSpecies = true;
    this.optionsSelect = this._speciesService.getSpecies().subscribe((species: Array<string>) => {
      this.optionsSelect = species;
      console.log(this.optionsSelect);
      this.loadingSpecies = false;
    });

  }

  sendForm(): void {

    let id: number;

    this.editMode ? id = this.character.id : '';
    // this.character.name = this.name;
    // this.character.species = this.species;
    // this.character.gender = this.gender;
    // this.character.homeworld = this.homeworld;

    this.character = this.loginForm.value;

    console.log(this.character);

    if (this.editMode) {
      console.log(this.character);

      this._charactersService.editCharacter(this.character, id).subscribe(char => {
        console.log(char);
      });
      localStorage.removeItem('character');
    } else {
      this._charactersService.addCharacter(this.character).subscribe(char => {
        console.log(char);
      });
    }
    this.router.navigate(['/home']);

  }

}
