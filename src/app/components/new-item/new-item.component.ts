import { Component, OnInit } from '@angular/core';
import { SpeciesService } from '../../services/species.service';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sl-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  optionsSelect: any;
  loadingSpecies: boolean;
  character: Characters;
  loginForm: FormGroup;
  editMode = false;

  nameValid = true;
  speciesValid = true;
  genderValid = true;

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

    this.loadingSpecies = true;
    this.optionsSelect = this._speciesService.getSpecies().subscribe((species: Array<string>) => {
      this.optionsSelect = species;
      console.log(this.optionsSelect);
      this.loadingSpecies = false;
    });

  }

  sendForm(): void {

    let id: number;

    this.genderValid = true;
    this.speciesValid = true;
    this.nameValid = true;

    this.editMode ? id = this.character.id : '';

    if (this.character.gender === '') {
      this.genderValid = false;
      document.getElementById('inlineRadio1').focus();
    }
    if (this.character.species === '') {
      this.speciesValid = false;
      document.getElementById('validationServer02').focus();
    }
    if (this.character.name === '' || this.character.name.length < 3) {
      this.nameValid = false;
      document.getElementById('validationServer01').focus();
    }

    this.character = this.loginForm.value;

    if (this.nameValid && this.speciesValid && this.genderValid) {
      if (this.editMode) {

        this._charactersService.editCharacter(this.character, id).subscribe();
        localStorage.removeItem('character');

      } else {
        this._charactersService.addCharacter(this.character).subscribe();
      }

      this.router.navigate(['/home']);

    }
  }

}
