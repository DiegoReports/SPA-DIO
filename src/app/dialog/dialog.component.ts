import { Component, OnInit } from '@angular/core';
import { ProfileElement } from '../home/home.component';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'spa-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  element!: ProfileElement;
  isChange!: boolean;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ProfileElement,
    public dialogRef: MatDialogRef<DialogComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.position != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
