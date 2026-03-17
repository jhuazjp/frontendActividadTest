import { Pipe, PipeTransform } from '@angular/core';
import { AssetManifestService } from '../../core/services/asset-manifest.service';

@Pipe({
  name: 'assetUrl',
  standalone: true,
  pure: true
})
export class AssetUrlPipe implements PipeTransform {
  constructor(private readonly manifest: AssetManifestService) {}

  transform(value: string | null | undefined): string {
    return this.manifest.resolve(value);
  }
}
