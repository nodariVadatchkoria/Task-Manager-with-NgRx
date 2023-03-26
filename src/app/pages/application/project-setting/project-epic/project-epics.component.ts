import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, pipe, Subject, switchMap, takeUntil} from "rxjs";
import {EpicService} from "../../../../core/services/epic.service";
import {MatDialog} from "@angular/material/dialog";
import {IEpic} from "../../../../core/interfaces/epic";
import {ConfirmDeleteComponent} from "../../../../shared/confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-project-epic',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent implements OnInit{
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IEpic>();

  sub$ = new Subject();
  constructor(
    private epicService: EpicService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEpics();
  }


getEpics() {
  this.epicService.getProjEpics()
    .pipe(takeUntil(this.sub$))
    .subscribe(epics => {
      this.dataSource.data = epics;
    })
}
deleteEpic(id: number) {
    const dialogRef = this.matDialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.epicService.deleteProjEpic(id);
          }
          return of(null);
        })
      ) .pipe(takeUntil(this.sub$))
      .subscribe(result => {
        if (result) {
          this.getEpics();
        }
    })
}
ngOnDestroy(): void {
  this.sub$.next(null);
  this.sub$.complete();
}

}
