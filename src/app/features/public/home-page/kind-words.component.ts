import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

export interface KindWord {
  quote: string;
  author: string;
  location: string;
}

@Component({
  selector: 'app-kind-words',
  standalone: true,
  imports: [AssetUrlPipe],
  templateUrl: './kind-words.component.html',
  styleUrls: ['./kind-words.component.css']
})
export class KindWordsComponent {
  @Input() word!: KindWord;
  @Input() backgroundImage = 'assets/apztattoo/home/fondokindwords.PNG';
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
