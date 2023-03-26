import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../../../core/services/drawer.service';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {IBoard} from "../../../core/interfaces";
import {Observable} from "rxjs";
import {ProjectService} from "../../../core/services/project.service";
import {ProjectFacade} from "../../../facades/project-facade.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit{

  boards: IBoard[] = [];


  constructor(
              private route: ActivatedRoute,
              private boardService: BoardService,
              private projectService: ProjectService,
              private projectFacade: ProjectFacade,
             ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({projects}) => {
      console.log(projects);

      if(projects['id']) {
        this.boardService.getBoards(projects['id']).subscribe({
          next: res => {
            this.boards = res;
          },
        })
      }
    })
  }
  }
