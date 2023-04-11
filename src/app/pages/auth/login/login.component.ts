import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {map, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {CookieService} from "../../../core/services/cookie.service";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/iproject";
import {RoleService} from "../../../core/services/role.service";
import {ILoginPayload} from "../../../core/interfaces";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  sub$ = new Subject();
  validateForm!: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectService,
    private roleService: RoleService
  ) {}

  isRegistered: boolean = false;
  mobile: boolean = false;
  spinner: boolean = false;
  diameter: number = 30;

  projects: IProject[] = [];

  @ViewChild('password') password!: ElementRef;

  ngOnInit() {
    window.innerWidth <= 1024 ? this.mobile = true : this.mobile = false;
    this.getProjects();
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe(params => {
      params.get('email') && !params.get('fromRegistration') ? (this.form.get('email')?.setValue(params.get('email')), this.isRegistered = true) : null;
    });
    this.isRegistered ? this.password.nativeElement.focus() : null;
  }

  // submit() {
  //   this.form.markAllAsTouched();
  //   if (this.form.invalid) return;
  //   this.spinner = true;
  //   this.authService
  //       .login(this.form.value)
  //       .pipe(takeUntil(this.sub$))
  //       .subscribe((res) => {
  //         this.getProjects();
  //
  //       })
  //   switchMap(() => this.roleService.getMyRoles()
  //       .pipe(
  //           map((res: any) => {
  //                 const role = res.user.roles.map((r: any) => r.name);
  //                 this.cookieService.setCookie('roles', JSON.stringify(role), 1);
  //                 const permissions: string[] = []
  //                 const roles = res.forEach((r: any) => {
  //                   r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
  //                 })
  //                 localStorage.setItem('permissions', JSON.stringify(permissions));
  //
  //               }
  //           )
  //       ),
  //   );
  //   if (this.projects.length > 0) {
  //     this.router.navigate(['']);
  //   } else {
  //     this.router.navigate(['/stepper']);
  //   }
  // }
  submit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value)
        .pipe(
            tap((res: ILoginPayload) => {
              this.cookieService.setCookie('accessToken', res.token.accessToken, 1);
              this.cookieService.setCookie('refreshToken', res.token.refreshToken, 1);
              const roles = res.user.roles.map((r: any) => r.name);
              this.cookieService.setCookie('roles', JSON.stringify(roles), 1);
              localStorage.setItem('user', JSON.stringify(res.user));
              this.router.navigate(['/']);
            }),
            switchMap(() => this.roleService.getMyRoles()
                .pipe(
                    map((res: any) => {
                          const permissions: string[] = []
                          const roles = res.forEach((r: any) => {
                            r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
                          })
                          localStorage.setItem('permissions', JSON.stringify(permissions));
                        }
                    )
                ),
            )
        )
        .subscribe()

  }

  getProjects(){
    this.projectsService.getProjects().subscribe({
      next: res => res.data.forEach((project: any) => {
        this.projects.push(project);
      }),
      error: err => console.log(err),
    })
  }
}

// if(res) {
//   this.router.navigate(['/stepper']);
// }
