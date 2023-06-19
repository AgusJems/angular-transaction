import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'product',
                loadChildren: () =>
                    import('./product/product.module').then((m) => m.ProductModule),
            },
            {
                path: 'transaksi',
                loadChildren: () =>
                    import('./transaction/transaction.module').then((m) => m.TransactionModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
