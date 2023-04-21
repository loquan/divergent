import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MaterialComponenets = [ MatMenuModule,
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  BrowserAnimationsModule ];

@NgModule({
  declarations: [ ],
  imports: [
    MaterialComponenets

  ], exports: [MaterialComponenets
  ]
})
export class MaterialModule { }
