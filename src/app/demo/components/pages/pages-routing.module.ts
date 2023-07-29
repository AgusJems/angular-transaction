import { KaryawanComponent } from './karyawan/karyawan.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'karyawan',
                loadChildren: () =>
                    import('./karyawan/karyawan.module').then((m) => m.KaryawanModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
