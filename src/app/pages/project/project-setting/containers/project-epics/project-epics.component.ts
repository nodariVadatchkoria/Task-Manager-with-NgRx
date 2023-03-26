import {Component, OnDestroy, OnInit} from '@angular/core';
import {EpicService} from "../../../../../core/services/epic.service";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../../../../../shared/confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource();

  sub$ = new Subject();

  constructor(private epicService: EpicService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEpics();
  }

  getEpics() {
    this.epicService.getEpics()
      .pipe(takeUntil(this.sub$))
      .subscribe(epics => {
        console.log(epics)
        this.dataSource.data = epics;
      })
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.epicService.deleteEpic(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getEpics();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
