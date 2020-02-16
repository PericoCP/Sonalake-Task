import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { Characters } from 'src/app/models/character.model';
import { Router } from '@angular/router';

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
  maxResults: number;

  constructor(private _characterService: CharactersService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.anyResult = false;
    this._characterService.getCharacters().subscribe((chars: Characters[]) => {
      this.loading = false;
      if (chars.length === 0) {
        this.anyResult = true;
      } else {
        this.numberOfResults = chars.length;

        this.characters = chars.splice(0, 10);
        this.anyResult = true;
        this.numberOfPages = Math.ceil(this.numberOfResults / this.numberPerPage);
        this.maxResults = this.numberOfResults;
      }
    });
  }

  searchResults(pageToFocus: number, isFilter: boolean) {

    this.actualPage = pageToFocus;

    this.loading = true;
    this.anyResult = false;
    this._characterService.searchCharacters(this.actualPage, this.numberPerPage, this.search).subscribe((chars: Characters[]) => {
      this.loading = false;

      if (chars.length === 0) {
        this.anyResult = false;
      } else {
        this.numberOfResults = chars.length;
        this.characters = chars;
        this.anyResult = true;
        if (isFilter) {
          this.numberOfPages = Math.ceil(this.numberOfResults / this.numberPerPage);
        } else {
          this.numberOfPages = Math.ceil(this.maxResults / this.numberPerPage);
        }

      }
    });
  }

  editCharacter(character: Characters) {
    localStorage.setItem('character', JSON.stringify(character));
    this.router.navigate(['/add']);
  }

  deleteCharacter(id: number) {
    this._characterService.removeCharacter(id).subscribe(char => {

      // This would remove the character from characters, but Nº of results/page will no longer fit with shown results, so a new get call must be done
      // this.characters = this.characters.filter(x => {
      //   return x.id !== id;
      // });

      // console.log(char);
      this.ngOnInit();

    });
  }
}
