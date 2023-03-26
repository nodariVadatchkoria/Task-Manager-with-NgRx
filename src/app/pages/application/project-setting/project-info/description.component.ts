import {Component, OnInit} from '@angular/core';
import {IProject} from "../../../../core/interfaces/iproject";
import {ProjectFacade} from "../../../../facades/project-facade.service";
import {Subject, takeUntil} from "rxjs";
import {ProjectService} from "../../../../core/services/project.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faItalic,
  faTextSlash,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  faAlignLeft = faAlignLeft;
  faAlignCenter = faAlignCenter;
  faAlignRight = faAlignRight;
  faTextSlash = faTextSlash;
  faUnderline = faUnderline;
  faItalic = faItalic;
  faBold = faBold;
  sub$ = new Subject()
constructor(
  private projectFacade: ProjectFacade,
  private projectService: ProjectService,
  private route: ActivatedRoute,
) { }
  form: FormGroup = new FormGroup({
    description: new FormControl(this.project?.description, ),
  });
  get project(): IProject {
    return this.projectFacade.getProject();
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params =>{
        if (params['id']){
          this.projectService.getProjectById(+params['id'])
            .pipe(takeUntil(this.sub$))
            .subscribe(
              res =>{
                this.form.patchValue(res)
                console.log(res)

              }
            )
        }
      }
    )
  }


  save() {
    this.projectService.updateProject(this.project.id, this.form.value).subscribe(
      res => {
        this.projectService.getProjectById(this.project.id).subscribe(
          res => {
            this.projectFacade.setProject(res);
            console.log(res)
          }
        )
      }
    )

  }
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;
  alignleft: boolean = false;
  aligncenter: boolean = false;
  alignright: boolean = false;

  fontsize11 :any = 16;


  changeFontWeight() {
    this.bold = !this.bold;
  }

  changeFontWeight2() {
    this.italic = !this.italic;

  }

  changeFontWeight3() {
    this.underline = !this.underline;

  }

  fontSizeChange() {
    let fontSize = document.getElementById("fontSize") as HTMLInputElement;
    let fontSizeValue = fontSize.value;
    this.fontsize11 = fontSizeValue + "px";
    localStorage.setItem("fontsize", this.fontsize11);

  }


  alignLeft() {

    this.alignleft = !this.alignleft;
  }

  alignCenter() {
    this.aligncenter = !this.aligncenter;
  }

  alignRight() {
    this.alignright = !this.alignright;
  }

  aA() {
    let textarea = document.getElementById("description") as HTMLInputElement;
    if (textarea.style.textTransform == "uppercase") {
      textarea.style.textTransform = "none";

    } else {
      textarea.style.textTransform = "uppercase";
    }
  }

  capitalize() {
    let textarea = document.getElementById("description") as HTMLInputElement;
    textarea.style.fontWeight = "normal";
    textarea.style.textAlign = "left";
    textarea.style.fontStyle = "normal";
    textarea.style.textTransform = "capitalize";


  }

  color() {
    let textarea = document.getElementById("description") as HTMLInputElement;
    let value1 = document.getElementById("fontColor") as HTMLInputElement;
    textarea.style.color = value1.value;

  }
}
