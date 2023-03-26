import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../core/services/role.service";
import {IRole} from "../../../core/interfaces/role";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IRole>();

  sub$ = new Subject();

  pageIndex  = 1;
  total = 0;
  pageSize = 10;


  constructor(
    private roleService: RoleService,
  ) {

  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(roles => {
        this.dataSource.data = roles.data;
        this.total = roles.totalCount;
      });
  }

  addRole(id?: number) {

  }

  delete(id: number) {

  }

  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getRoles()
  }

  setPermissions(id: number) {
    console.log(id)
  }

}
