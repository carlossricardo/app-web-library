import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService,
  ) { }

  private showToast(severity: string, header: string, message: string) {
    this.messageService.clear();
    this.messageService.add({ severity, summary: header, detail: message, life: 5000 });
  }

  showSuccess(header: string, message: string) {
    this.showToast('success', header, message);
  }

  showWarn(header: string, message: string) {
    this.showToast('warn', header, message);
  }

  showError(header: string, message: string) {
    this.showToast('error', header, message);
  }

}
