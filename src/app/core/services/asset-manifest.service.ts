import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetManifestService {
  async loadManifest(): Promise<void> {
    return Promise.resolve();
  }

  resolve(url: string | null | undefined): string {
    return url || 'assets/apztattoo/home/home_image_01.jpg';
  }
}
