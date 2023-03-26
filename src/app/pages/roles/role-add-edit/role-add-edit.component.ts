import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoleService} from "../../../core/services/role.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss']
})
export class RoleAddEditComponent implements OnInit{

  groups: any = [];
  roleId!: string

  permissions: Set<number> = new Set<number>();

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['roleId']) {
        this.roleId = params['roleId'];
        this.getPermissionsByRole()
      }
    })
    this.getPermissions()
  }

  getPermissionsByRole() {
    this.roleService.getRole(this.roleId)
      .subscribe(role => {
        console.log(role)
        role && role.permissions && role.permissions.length && role.permissions.forEach((p: any) => this.permissions.add(p.id))

      })
  }

  getPermissions() {
    this.roleService.getPermissions()
      .subscribe(permissions => {
        console.log(permissions)
        const grouped = _.groupBy(permissions, 'groupKey');
        this.groups = Object.keys(grouped).map(key => {
          return {
            key,
            permissions: grouped[key]
          }
        })

        console.log(this.groups)
      });
  }


  checkPermission(permission: any) {
    this.permissions.has(permission.id) ? this.permissions.delete(permission.id) : this.permissions.add(permission.id)
  }

  save() {
    this.roleService.setPermissions({
      roleId: this.roleId,
      permissions: Array.from(this.permissions)
    }).subscribe(res => {
      console.log(res)
    })
  }
}
