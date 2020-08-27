import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule

  ],
  declarations: [],
  providers: [],
})

export class MaterialModule { }
