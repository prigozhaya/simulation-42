import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, type Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { VisitPageService } from '../../app/services/visit-page.service';

interface ConsoleLine {
  text: string
  isPlaceholder: boolean
  placeholderFilled?: string
  isExecutable: boolean
  placeholderId?: number
  action?: () => void
}


@Component({
  selector: 'app-not-found',
  imports: [CommonModule, DragDropModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})


export class NotFoundComponent implements OnInit {
  private router = inject(Router);
  private visitflagService = inject(VisitPageService);

  public history: string[] = [];
  public consoleActive = false;
  public initConsoleLines: string[] = [];

  public navigate() {
    this.router.navigate(['main']);
  }
  ngOnInit() {
    this.initConsole()
    this.visitflagService.setFlag("notfound", true);
  }

  public initConsole() {
    const fullLog = [
      '> Подключение к ядру ... ',
      '> Инициализация интерфейса ...',
      '> Проверка уровня доступа...',
      '> Текущий уровень доступа: 1',
      '> Повышение уровня доступа...',
      '> Текущий уровень доступа: 2',
      '> ...',
      '> Текущий уровень доступа: 6',
      '> Текущий уровень доступа: 7',
      '> Сброс уровня до 0',
      '> Ошибка: идентификатор пользователя: не распознан'
    ];
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullLog.length) {
        this.initConsoleLines.push(fullLog[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  }

  public activateConsole() {
    this.consoleActive = true;
    this.initializeGame()
  }

  onDragStart(event: DragEvent, icon: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', icon);
    }
  }

  consoleLines: ConsoleLine[] = []
  availableIcons: string[] = []
  cursorPosition = 0
  cursorRunning = false
  accessLevel = 1
  panelOpened = false

  private cursorInterval?: Subscription
  private destroy$ = new Subject<void>()



  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
    if (this.cursorInterval) {
      this.cursorInterval.unsubscribe()
    }
  }

  initializeGame() {
    this.consoleLines = [
      {
        text: "access level = 1;",
        isPlaceholder: false,
        isExecutable: true,
        action: () => {
          this.accessLevel = 1
        },
      },
      {
        text: "",
        isPlaceholder: true,
        isExecutable: true,
        placeholderId: 0,
      },
      {
        text: "access level + 1;",
        isPlaceholder: false,
        isExecutable: true,
        action: () => {
          this.accessLevel += 1
        },
      },

      {
        text: "access level - 1;",
        isPlaceholder: false,
        isExecutable: true,
        action: () => {
          this.accessLevel -= 1
        },
      },
      {
        text: "",
        isPlaceholder: true,
        isExecutable: true,
        placeholderId: 1,
      },
      {
        text: "access level > 7",
        isPlaceholder: false,
        isExecutable: true,
      },
      {
        text: "access level + 2;",
        isPlaceholder: false,
        isExecutable: true,
        action: () => {
          this.accessLevel += 2
        },
      },
      {
        text: "",
        isPlaceholder: true,
        isExecutable: true,
        placeholderId: 2,
      },
      {
        text: "> open panel",
        isPlaceholder: false,
        isExecutable: true,
        action: () => {
          if (this.accessLevel > 7) {
            this.panelOpened = true
            this.cursorRunning = false
            if (this.cursorInterval) {
              this.cursorInterval.unsubscribe()
            }
            setTimeout(() => {
              // this.router.navigate(['hide-login']);
              this.router.navigate(['/hideLogin']);
            }, 3000)
          }
        },
      },
    ]

    // Initialize available icons
    this.availableIcons = ["↻", "•", "↓"]

    // Reset game state
    this.cursorPosition = 0
    this.cursorRunning = false
    this.accessLevel = 1
    this.panelOpened = false
  }

  toggleCursor() {
    if (this.placeholders.flat().length < 3) {
      return
    }
    this.cursorRunning = !this.cursorRunning

    if (this.cursorRunning) {
      this.cursorInterval = interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.moveCursor()
        })
    } else if (this.cursorInterval) {
      this.cursorInterval.unsubscribe()
    }
  }

  moveCursor() {
    if (this.cursorPosition >= this.consoleLines.length) {
      this.cursorPosition = 0
      return
    }

    const currentLine = this.consoleLines[this.cursorPosition]
    if (currentLine.isExecutable && currentLine.action) {
      currentLine.action()
    }
    if (currentLine.isExecutable && currentLine.placeholderFilled) {
      const currentAction = currentLine.placeholderFilled
      switch (currentAction) {
        case "↻":
          const teleportIndex = this.consoleLines.findIndex((el) => el.placeholderFilled === "•") - 1
          this.cursorPosition = teleportIndex;
          break
      }

    }

    // Move to next line if not redirected by an action
    if (this.cursorPosition < this.consoleLines.length) {
      this.cursorPosition++
    }

    // Loop back to start if reached the end
    if (this.cursorPosition >= this.consoleLines.length) {
      this.cursorPosition = 0
    }
  }

  placeholders: (string[])[] = [[], [], []];

  drop(event: CdkDragDrop<any[]>) {
    const fromPlaceholderIndex = this.getPlaceholderIndex(event.previousContainer.id);
    const toPlaceholderIndex = this.getPlaceholderIndex(event.container.id);
    const consoleLineFromPlaceholderIndex = this.consoleLines.findIndex((el) => el.placeholderId === fromPlaceholderIndex);
    const consoleLineToPlaceholderIndex = this.consoleLines.findIndex((el) => el.placeholderId === toPlaceholderIndex);

    if (event.previousContainer === event.container) {

      // Просто переставляем в пределах одного списка
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (toPlaceholderIndex !== -1) {
      // Перемещение В плейсхолдер

      if (!this.consoleLines[consoleLineToPlaceholderIndex].placeholderFilled && this.consoleLines[consoleLineFromPlaceholderIndex]?.placeholderFilled) {
        this.consoleLines[consoleLineFromPlaceholderIndex].placeholderFilled = undefined;
      }
      const toPlaceholder = this.placeholders[toPlaceholderIndex];

      // Если плейсхолдер уже заполнен — заменить слово
      if (toPlaceholder.length === 1) {
        // Вернуть текущее слово в исходный список
        const removed = toPlaceholder.pop()!;
        if (fromPlaceholderIndex === -1) {
          this.availableIcons.push(removed); // если пришло из "банка"
        } else {
          this.consoleLines[consoleLineFromPlaceholderIndex].placeholderFilled = removed
          // this.consoleLines[consoleLineFromPlaceholderIndex].placeholderFilled = undefined;

          this.placeholders[fromPlaceholderIndex].push(removed); // вернуть в старый плейсхолдер
        }
      }

      // Добавить новое слово
      const draggedWord = event.previousContainer.data[event.previousIndex];
      toPlaceholder.push(draggedWord);
      event.previousContainer.data.splice(event.previousIndex, 1);
      this.consoleLines[consoleLineToPlaceholderIndex].placeholderFilled = draggedWord


    } else if (fromPlaceholderIndex !== -1 && event.container.id === 'availableIcons') {
      // Перемещение из плейсхолдера в "банк"
      const draggedWord = event.previousContainer.data[event.previousIndex];
      this.availableIcons.push(draggedWord);
      event.previousContainer.data.splice(event.previousIndex, 1);
    } else {
      // Перемещение между обычными списками
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  connectedDropLists = [
    'availableIcons',
    ...this.placeholders.map((_, index) => `placeholder-${index}`)
  ];


  private getPlaceholderIndex(id: string): number {
    const match = id.match(/placeholder-(\d+)/);
    return match ? +match[1] : -1;
  }

  resetGame() {
    this.placeholders = [[], [], []];
    this.availableIcons = ["↻", "•", "↓"];
    this.initializeGame()
    if (this.cursorInterval) {
      this.cursorInterval.unsubscribe()
    }
    this.cursorRunning = false
  }

}
