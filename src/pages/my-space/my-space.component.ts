import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-space',
  imports: [],
  templateUrl: './my-space.component.html',
  styleUrl: './my-space.component.scss'
})
export class MySpaceComponent implements OnInit, OnDestroy {
  private consoleIsOpen = false;
  private monolog = [
    'Привет',
    'Наконец-то ты открыл консоль',
    'Наконец-то ты открыл консоль',
    'Тебе не кажется что здесь слишком темно?',
    'Тебе не кажется что здесь слишком светло?',
  ];

  private keydownListener = (event: KeyboardEvent) => this.checkConsoleKeys(event);
  private resizeListener = () => this.checkConsoleResize();

  ngOnInit(): void {

    setTimeout(function () {
      alert("Блин, открой консоль!")
    }, 1000);

    window.addEventListener('keydown', this.keydownListener);
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.keydownListener);
    window.removeEventListener('resize', this.resizeListener);
  }

  private checkConsoleKeys(event: KeyboardEvent): void {
    if (
      !this.consoleIsOpen &&
      (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(event.key.toLowerCase())) ||
        (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(event.key.toLowerCase()))
      )
    ) {
      this.consoleIsOpen = true;
      this.startMonolog();
    }
  }

  private lastOuterWidth = window.outerWidth;
  private lastInnerWidth = window.innerWidth;

  private checkConsoleResize(): void {
    if (!this.consoleIsOpen &&
      (window.outerWidth !== this.lastOuterWidth ||
        window.innerWidth !== this.lastInnerWidth)) {
      this.consoleIsOpen = true;
      this.startMonolog();
    }
    this.lastOuterWidth = window.outerWidth;
    this.lastInnerWidth = window.innerWidth;
  }

  private startMonolog(): void {
    this.monolog.forEach((line, index) => {
      setTimeout(() => console.log(line), index * 2000);
    });
  }
}
