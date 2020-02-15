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
  numberPerPage = 10;
  search = '';
  actualPage = 1;
  anyResult: boolean;
  loading: boolean;
  numberOfResults: number;
  numberOfPages: number;

  constructor(private _characterService: CharactersService) { }

  ngOnInit() {
    this.loading = true;
    this.anyResult = false;
    this._characterService.getCharacters().subscribe((chars: Characters[]) => {
      this.loading = false;
      if (chars.length === 0) {

      } else {
        this.numberOfResults = chars.length;

        this.characters = chars.splice(0, 10);
        this.anyResult = true;
        this.numberOfPages = Math.ceil(this.numberOfResults / this.numberPerPage);
      }
    });
  }

  searchResults() {
    this.loading = true;
    this.anyResult = false;
    this._characterService.getCharacters(this.actualPage, this.numberPerPage).subscribe((chars: Characters[]) => {
      this.loading = false;
      if (chars.length === 0) {

      } else {
        this.characters = chars;
        this.anyResult = true;

      }
    });
  }

  editCharacter(character: Characters) {

  }

  deleteCharacter(id: String) {

  }
}
