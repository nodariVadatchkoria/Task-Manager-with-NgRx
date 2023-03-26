import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../../../core/services/board.service";
import {Observable, of, pipe, Subject, switchMap, takeUntil} from "rxjs";
import {IBoard} from "../../../../core/interfaces";

import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../../../../shared/confirm-delete/confirm-delete.component";



@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name',  'createdAt', 'actions']
  dataSource = new MatTableDataSource<IBoard>();
  sub$ = new Subject()
  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    // private route: ActivatedRoute,
  ) {

  }

  getBoard() {
    this.boardService.getProjBoards().subscribe(boards => {
      this.dataSource.data = boards
    })

  }

  ngOnInit(): void {
    this.getBoard()
    // this.route.params
    //   .pipe(
    //     takeUntil(this.sub$)
    //   )
    //   .subscribe(params => {
    //   if (params['id']) {
    //     this.boardService.getBoardss(params['id']).subscribe({
    //       next: res => this.boards = res
    //     })
    //     console.log(params['id'])
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            console.log(result)
            return this.boardService.deleteBoard(id);
          }
          return of(null);
        })
      ).subscribe(result => {
        if (result) {
          this.getBoard();
        }
      });
  }



}

