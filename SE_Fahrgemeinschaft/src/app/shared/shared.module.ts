import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';

const COMPONENTS: any[] = [
    MapComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [COMPONENTS],
    exports: [...COMPONENTS]
})
export class SharedModule {
}
