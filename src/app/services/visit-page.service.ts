import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitPageService {

  // // private readonly visitKey = 'visitFlag';
  // private _flag = signal<boolean>(this.loadFromStorage());
  // public readonly flag = computed(() => this._flag());

  // // private loadFromStorage(): boolean {
  // // }

  // public getFlag(page: string) {
  //   return !!localStorage.getItem(page);

  // }

  // public setFlag(page: string, value: boolean): void {
  //   this._flag.set(value);
  //   localStorage.setItem(page, String(value));
  // }

  private readonly prefix = 'pageFlag:';
  private flagsMap = new Map<string, ReturnType<typeof signal<boolean>>>();

  getFlag(name: string) {
    if (!this.flagsMap.has(name)) {
      const key = this.storageKey(name);
      const initial = localStorage.getItem(key) === 'true';
      this.flagsMap.set(name, signal(initial));
    }
    return this.flagsMap.get(name)!;
  }

  setFlag(name: string, value: boolean) {
    const flag = this.getFlag(name);
    flag.set(value);
    localStorage.setItem(this.storageKey(name), String(value));
  }

  toggleFlag(name: string) {
    const flag = this.getFlag(name);
    this.setFlag(name, !flag());
  }

  private storageKey(name: string): string {
    return `${this.prefix}${name}`;
  }
}

// сделать универсальный сервис для отслеживания посещения любой страницы

