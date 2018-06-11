import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output() searched: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  search(searchValue: string) {
    this.searched.emit(searchValue);
  }
}
