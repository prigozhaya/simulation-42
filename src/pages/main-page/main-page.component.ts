import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VisitPageService } from '../../app/services/visit-page.service';
import {
  DropDownItemComponent,
  TreeNode,
} from './components/drop-down-item/drop-down-item.component';

@Component({
  standalone: true,
  selector: 'app-main-page',
  imports: [DropDownItemComponent, CommonModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  // host: { class: 'background' }
})
export class MainPageComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  isScrolled: boolean = false;
  isMobileMenuOpen: boolean = false;

  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;

  // constructor() {}

  // ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initial check for elements in viewport
    setTimeout(() => {
      this.checkElementsInViewport();
    }, 100);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Navbar scroll effect
    this.isScrolled = window.scrollY > 10;

    // Check for elements to animate
    this.checkElementsInViewport();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  private checkElementsInViewport(): void {
    this.animatedElements.forEach(element => {
      const elementPosition = element.nativeElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.9) {
        element.nativeElement.classList.add('animate');
      }
    });
  }

  private visitflagService = inject(VisitPageService);
  private router = inject(Router)
  private viewportScroller = inject(ViewportScroller)
  readonly isPageVisited = computed(() => this.visitflagService.getFlag('main')());
  readonly isNotFoundPageVisited = computed(() => this.visitflagService.getFlag('notfound')());
  // constructor() {
  //   effect(() => {
  //     console.log(this.isPageVisited())
  //   })
  // }


  scrollSmooth(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  ngOnInit(): void {
    console.log(this.isNotFoundPageVisited())
    if (this.isNotFoundPageVisited()) {
      this.router.navigate(['/mаin']);
    }

  }

  tree: TreeNode = {
    label: this.isPageVisited() ? 'Опять ты?' : 'Здесь абсолютно ничего нет =(',
    children: [
      {
        label: this.isPageVisited() ? 'Неужели тебе не понравился котик?' : 'Здесь тоже ничего нет',
        children: [
          {
            label: 'Здесь все еще ничего нет',
            children: [
              {
                label: 'Здесь точно ничего нет и быть не может',
                children: [
                  {
                    trigger: true,
                    label: 'Да сколько можно, тебе не надоело ?',
                    children: [
                      {
                        trigger: false,
                        link: "https://www.youtube.com/watch?v=s6D17UJLyJA",
                        label: this.isPageVisited() ? 'Ну все все, теперь точно' : 'Ну ладно вот держи, то что тебе надо',
                        children: [
                          {
                            label: 'Неужели не повелся? Неплохо неплохо',
                            children: [
                              {
                                label: 'Хорошо, 4то ты думаешь насчет т0го 4тобы пойти в НИКУДА подальше?',
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // ngOnDestroy(): void {
  //   console.log("destroy")
  //   this.visitflagService.setFlag(true);
  // }

  // заблокировать просмотр на телефоне
}
