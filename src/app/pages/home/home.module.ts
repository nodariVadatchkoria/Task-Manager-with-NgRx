import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeSignUpComponent } from './home-sign-up/home-sign-up.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthModule } from '../auth/auth.module';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AuthorsComponent } from './authors/authors.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//import {AuthInterceptor} from "../../core/interceptors/auth.interceptor";

//import {AuthInterceptor} from "../../core/interceptors/auth.interceptor";

@NgModule({
    declarations: [
        NavigationComponent,
        HeaderComponent,
        HomeSignUpComponent,
        AboutProjectComponent,
        ScrollToTopComponent,

        HomeSignUpComponent,
        AboutProjectComponent,
        ScrollToTopComponent,
        TestimonialsComponent,
        AuthorsComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        MatSidenavModule,
        HttpClientModule,
        MatTabsModule,
        AuthModule,
        FontAwesomeModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        NavigationComponent
    ]
})
export class HomeModule {
  constructor(public library: FaIconLibrary) {
    library.addIcons(faGithub, faFacebook);
  }
}
