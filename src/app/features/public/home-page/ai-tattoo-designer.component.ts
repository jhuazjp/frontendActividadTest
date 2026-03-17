import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-ai-tattoo-designer',
  standalone: true,
  imports: [RouterLink, AssetUrlPipe],
  templateUrl: './ai-tattoo-designer.component.html',
  styleUrls: ['./ai-tattoo-designer.component.css']
})
export class AiTattooDesignerComponent {}
