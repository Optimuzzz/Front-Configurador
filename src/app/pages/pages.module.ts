import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToModule } from 'angular-count-to';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbTooltipModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';



import { PagesRoutingModule } from './pages-routing.modules';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { WidgetModule } from '../shared/widget/widget.module';


import { SharedModule } from '../shared/shared.module';
import { RastreadorModule } from './rastreador/rastreador.module';

@NgModule({
  declarations: [
    DashboardsComponent,

  
  ],
  imports: [
    CommonModule,
    WidgetModule,
    PagesRoutingModule,
    ScrollToModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    CountToModule,
    RastreadorModule,
  
 
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ]
})
export class PagesModule { }
