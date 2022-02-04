import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';

export interface ProfileElement {
  position: number;
  image: string;
  name: string;
  email: string;
  linkedin: string;
}

const ELEMENT_DATA: ProfileElement[] = [
  {position: 1,image: '../../assets/picture1.jpg', name: 'Hydrogen', email: 'auto@auto.com', linkedin: 'www.exemplo/in.com'},
  {position: 2, image: '../../assets/picture3.jpg', name: 'Helium', email: 'auto@auto.com', linkedin: 'www.exemplo/in.com'},
  {position: 3, image: '../../assets/picture2.jpg', name: 'Lithium', email: 'auto@auto.com', linkedin: 'www.exemplo/in.com'},
  {position: 4, image: '../../assets/picture4.jpg', name: 'Beryllium', email: 'auto@auto.com', linkedin: 'www.exemplo/in.com'},
];

@Component({
  selector: 'spa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name','actions'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: ProfileElement | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        image: '../../assets/user.png',
        name: '',
        email: '',
        linkedin: ''
      } : {
        position: element.position,
        image: element.image,
        name:  element.name,
        email: element.email,
        linkedin: element.linkedin
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        /* console.log(result) */
        if (this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
        }
    });
  }

  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }

  editElement(element: ProfileElement): void {
    this.openDialog(element)
  }
}
