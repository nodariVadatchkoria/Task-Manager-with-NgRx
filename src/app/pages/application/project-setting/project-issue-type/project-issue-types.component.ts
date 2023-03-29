import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {IssueTypesService} from "../../../../core/services";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../../../../shared/confirm-delete/confirm-delete.component";
import {IssueType} from "../../../../core/interfaces";
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../../../store";
import {currentProject} from "../../../../store/rxProject/project.selectors";

@Component({
    selector: 'app-project-issue-type',
    templateUrl: './project-issue-types.component.html',
    styleUrls: ['./project-issue-types.component.scss']
})
export class ProjectIssueTypesComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'name', 'createdAt', 'actions'];

    dataSource = new MatTableDataSource<IssueType>();

    sub$ = new Subject();

    constructor(
        private store: Store<{project: ProjectStateModule}>,
        private issueTypesService: IssueTypesService,
        public dialog: MatDialog,
        private issueTypeService: IssueTypesService) {
    }

    ngOnInit() {
        // this.getIssueTypes();
        this.store.select(currentProject)
            .subscribe((project)=>{
                if (project){
                    this.getIssueTypes();
                }
            })
    }

    getIssueTypes() {
        this.issueTypesService.getIssueType()
            .pipe(takeUntil(this.sub$))
            .subscribe(boards => {
                console.log(boards)
                this.dataSource.data = boards;
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
