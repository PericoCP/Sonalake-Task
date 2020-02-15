import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  characters: Characters[];

  constructor(private _characterService: CharactersService) {}

  ngOnInit() {
    this._characterService.getCharacters().subscribe((chars: Characters[]) => {
      this.characters = chars;
    })
  }

  editCharacter(character: Characters){

  }

  deleteCharacter(id: String) {

  }
}
