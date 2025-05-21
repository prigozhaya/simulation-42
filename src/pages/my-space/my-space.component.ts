import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { DocumentsDialogService } from '../../app/services/dialog-communication.service';
import { DocumentsDialogComponent } from './components/documents-dialog/documents-dialog.component';

@Component({
  selector: 'app-my-space',
  imports: [MatIconModule, CommonModule],
  templateUrl: './my-space.component.html',
  styleUrl: './my-space.component.scss'
})
export class MySpaceComponent implements OnInit, OnDestroy {
  private dialog = inject(MatDialog);
  private documentsDialogService = inject(DocumentsDialogService);
  private titleService = inject(Title);

  private dialogState = toSignal(this.documentsDialogService.closeDialog$);
  private secondDialogStarted = false;

  public access = false;
  private consoleIsOpen = false;
  private monolog = [
    'Наконец-то ты открыл консоль',
    'Добро пожаловать в мое пространство)))',
    'Немного ностальгично, правда?',
    'Но не суть. Где-то здесь должна быть моя резервная почта.',
    'Я на всякий случай ее сделал. Там есть координаты флеш-ключа от ЯИшки',
    'Осталось только ее найти...',
    'Ах да, здесь еще есть папка с материалами, которые я успел насобирать пока изучал Cogitum',
    'Сейчас открою тебе доступ',
    'Готово!',
    'Можешь поизучать, пока я ищу почту)',
  ];
  private secondMonolog = [
    'Уже посмотрел материалы?',
    'Что ж, теперь ты больше знаешь, что здесь происходит',
    'А я так и не нашел почту',
    'Нигде не могу её найти... Возможно здесь просто слишком темно?',
    'Но она должна быть где-то здесь – среди тегов',
    'Я зашифровал ее шифром Ви██████',
    'Ключ - это просто смешное слово, оно должно быть написано по Р±РѕСЂС‚РёРєСѓ РєР°СЂС‚РёРЅС‹ c деревом',
    'Не думал, что СЃРєР°Р¶Сѓ это. Но наверно РЅР°РґРѕ Р±С‹Р»Рѕ использовать СЃРІРµС‚Р»СѓСЋ тему',
    'РљР°Р¶РµС‚СЃСЏ С‡С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє ?',
    '███',
  ];

  private keydownListener = (event: KeyboardEvent) => this.checkConsoleKeys(event);
  private resizeListener = () => this.checkConsoleResize();

  constructor() {
    effect(() => {
      if (this.dialogState() && !this.secondDialogStarted) {
        this.startSecondMonolog()
      }
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('My space');
    setTimeout(function () {
      alert("Блин, открой консоль, пожалуйста)")
    }, 5000);

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
      if (index >= 8) {
        setTimeout(() => { if (index === 8) { this.access = true; this.playOpenSound() } console.log(line) }, index * 1.5 * 2000);
      } else {
        setTimeout(() => console.log(line), index * 2000);
      }
    });
  }

  private startSecondMonolog(): void {
    this.secondMonolog.forEach((line, index) => {

      setTimeout(() => console.log(line), index * 2000);

    });
  }

  openDocumentsDialog(): void {
    if (this.access) {
      this.dialog.open(DocumentsDialogComponent, {
        width: "500px",
        panelClass: "documents-dialog",
      })
    }
  }

  playOpenSound(): void {
    const audio = new Audio("/open.mp3")
    audio.play().catch((error) => console.error("Error playing sound:", error))
  }
}
