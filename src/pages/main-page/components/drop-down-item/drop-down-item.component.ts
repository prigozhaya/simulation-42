import { Component, inject, Input } from '@angular/core';
import { VisitPageService } from '../../../../app/services/visit-page.service';
// import { VisitMainService } from '../../../../app/services/visit-page.service';

export interface TreeNode {
  trigger?: boolean;
  link?: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-drop-down-item',
  imports: [],
  templateUrl: './drop-down-item.component.html',
  styleUrl: './drop-down-item.component.scss'
})
export class DropDownItemComponent {
  private visitflagService = inject(VisitPageService);

  @Input() node!: TreeNode;


  toggle() {
    this.node.expanded = !this.node.expanded;
    if (this.node.trigger !== undefined) {
      this.visitflagService.setFlag("main", this.node.trigger);
    }
  }

  clickOnLink(event: MouseEvent) {

    event.stopPropagation();
  }
}
