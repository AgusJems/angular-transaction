import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KaryawanComponent } from './karyawan.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KaryawanComponent }
	])],
	exports: [RouterModule]
})
export class KaryawanRoutingModule { }
