import {Component, OnDestroy, OnInit} from '@angular/core';
import {IssueTypesService} from "../../../../../core/services";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../../../../../shared/confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource();

  sub$ = new Subject();

  constructor(private issueTypesService: IssueTypesService,
              public dialog: MatDialog,
              private issueTypeService: IssueTypesService) {
  }

  ngOnInit() {
    this.getIssueTypes();
  }

  getIssueTypes() {
    this.issueTypesService.getIssueType()
      .pipe(takeUntil(this.sub$))
      .subscribe(issueType => {
        console.log(issueType)
        this.dataSource.data = issueType;
      });
  }

  deleteIssueType(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.issueTypeService.deleteIssueType(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getIssueTypes();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
