import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';


@NgModule({
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule

  ],
  declarations: [],
  providers: [],
})

export class MaterialModule { }
