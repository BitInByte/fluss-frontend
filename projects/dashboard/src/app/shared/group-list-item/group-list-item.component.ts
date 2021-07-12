import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.scss'],
})
export class GroupListItemComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Output() editHandler = new EventEmitter<string>();
  @Output() deleteHandler = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    this.editHandler.emit(this.id);
  }

  onDelete(): void {
    this.deleteHandler.emit(this.id);
  }
}
