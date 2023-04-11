import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MatDialogClose} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../../core/services/users.service";
import {Router} from "@angular/router";
import {currentProject} from "../../../../../../store/rxProject/project.selectors";
import {Subject, takeUntil} from "rxjs";
import {IBoard, User} from "../../../../../../core/interfaces";
import {ProjectStateModule} from "../../../../../../store";
import {Store} from "@ngrx/store";
import {ProjectService} from "../../../../../../core/services/project.service";
import {ProjectFacade} from "../../../../../../facades/project-facade.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {


  constructor(
    // public dialogRef: MatDialogRef<UserEditComponent>,
    public dialog: MatDialog,
   private usersService: UsersService,
   private router: Router,
    private projectService: ProjectService,
    private store: Store<{ project: ProjectStateModule }>,
    private projectFacade: ProjectFacade,
  ) { }
  sub$ = new Subject();
  projectUsersIds: number[] = [];
  dataSource = new MatTableDataSource<IBoard>();
  get projectId(){
    return this.projectFacade.getProject().id
    return this.store.select(currentProject).subscribe((project)=>{
      if (project){
        return project.id
      }
      else{
        return null
      }
    })
  }
  getCurrentProjectUsers() {
    this.projectService.getProjectUsersId(+this.projectId)
        .pipe(takeUntil(this.sub$))
        .subscribe(users => {
          this.projectUsersIds = users.map((user: User) => user.id)
          this.dataSource.data = users
        })
  }

  ngOnInit(): void {
    this.store.select(currentProject)
        .subscribe((project)=>{
          if (project){
            this.getCurrentProjectUsers();
          }
        })
    }

  form: FormGroup = new FormGroup({
    id: new FormControl(null,),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    identityNumber: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    isActive: new FormControl(true, ),
  });



  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    this.usersService.createUser(this.form.value)
      .subscribe((res) => {
        // this.dialogRef.close(res)
      })
  }

  close() {
    this.router.navigate(['/application/setting/users'])
  }
}
