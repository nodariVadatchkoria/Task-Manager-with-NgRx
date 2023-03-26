import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {DrawerService} from "../../../core/services/drawer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent {

  constructor(private drawerService: DrawerService,
              private route: ActivatedRoute) {
  }

  isOpen = false;
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  ngOnInit() {
    this.drawerService.isDrawerOpen$.subscribe((res: boolean) => {
      if (res) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });

    this.route.params.subscribe(params => {
      if(params['id']) {

      }
    })
  }

  toggleDrawer() {
    if (!this.isOpen) {
      this.drawerService.openDrawer();
      this.isOpen = true;
    } else if (this.isOpen) {
      this.drawerService.closeDrawer();
      this.isOpen = false;
    }
  }
}
