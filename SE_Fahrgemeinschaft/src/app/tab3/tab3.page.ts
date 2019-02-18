import { Component } from '@angular/core';
import { RTDBService } from '../services/rtdb.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    constructor(private rtdb: RTDBService,
                )
    {

    }
    http(){
        this.rtdb.read();
    }
}
