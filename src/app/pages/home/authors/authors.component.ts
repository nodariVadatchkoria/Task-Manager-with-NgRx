import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {IconName} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements  AfterViewInit {

  github: IconName = 'github';
  facebook: IconName = 'facebook';

  @ViewChildren('social') social!: QueryList<ElementRef>;
  @ViewChildren('socialContainer') socialContainer!: QueryList<ElementRef>;

  authors = [
    {
      firstName: 'Shavlego',
      lastName: 'Botchorishvili',
      imageUrl: 'assets/images/img.png',
      profession: 'Front end Developer',
      social: [
        {
          image: this.github,
          url: ''
        },
        {
          image: this.facebook,
          url: ''
        }
      ]
    },
    {
      firstName: 'Nodari',
      lastName: 'Vadatchkoria',
      imageUrl: 'assets/images/img.png',
      profession: 'Front end Developer',
      social: [
        {
          image: this.github,
          url: ''
        },
        {
          image: this.facebook,
          url: ''
        }
      ]
    },
    {
      firstName: 'Davit',
      lastName: 'Garsiashvili',
      imageUrl: 'assets/images/img.png',
      profession: 'Front end Developer',
      social: [
        {
          image: this.github,
          url: ''
        },
        {
          image: this.facebook,
          url: ''
        }
      ]
    }
  ]

  childrenCount: number = 0;
  socContainer: any;

  ngAfterViewInit() {
    this.childrenCount = this.social.length;
    this.socContainer = this.socialContainer;
  }


  enter() {
    this.socContainer.forEach((soc: ElementRef) => {
      soc.nativeElement.style.gap = 100 / this.childrenCount * this.socContainer.length  + '%';
    })
  }

  leave() {
    this.socContainer.forEach((soc: ElementRef) => {
      soc.nativeElement.style.gap = '0%';
    })
  }
}
