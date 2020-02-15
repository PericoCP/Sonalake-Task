import { Component, OnInit } from '@angular/core';
import { NewItemService } from './new-item.service';

@Component({
  selector: 'sl-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  optionsSelect: any;
  loadingSpecies: boolean;
  genderValid: boolean;

  constructor(private newItemService: NewItemService) { }

  ngOnInit() {

    this.loadingSpecies = true;
    this.optionsSelect = this.newItemService.getSpecies().subscribe((species: Array<string>) => {
      this.optionsSelect = species;
      console.log(this.optionsSelect);
      this.loadingSpecies = false;
    });

  }

  sendForm() {

  }

}
