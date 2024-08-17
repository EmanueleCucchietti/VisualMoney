import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    fullSidebar = true;
    smallSidebar = false;

    closeFullSidebar() {
        this.fullSidebar = false;
        this.smallSidebar = true;
    }

    openFullSidebar(){
        this.fullSidebar = true;
        this.smallSidebar = false;
    }
}
