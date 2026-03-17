import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})
export class LocationSelectorComponent {
  @Input() selected = 'ALL';
  @Output() change = new EventEmitter<string>();

  readonly locations = ['ALL', 'NEW YORK', 'COPENHAGEN', 'DUBAI'];
}
