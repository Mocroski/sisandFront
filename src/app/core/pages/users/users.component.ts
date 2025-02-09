import { UsersService } from './../../services/users/users.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserOutputDto } from '../../models/users/users';
import { TokenMethodsUtils } from '../../../shared/token-methods';
import { Router } from '@angular/router';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  usersList: UserOutputDto[] = [];

  constructor(
    private usersService: UsersService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(): void {
    this.usersService.getAllAsync().subscribe({
      next: (response) => {this.usersList = response.data},
      error: (error) => {console.log(error)},
      complete: () => { this.changeDetector.detectChanges(); }
    })
  }

  openUserDialog(isUpdateDialog: boolean, user?: UserOutputDto, isDelete?: boolean): void {
   const dialogRef = this.dialog.open(UserDialogComponent, {
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh', 
      data: {
        user: user,
        isUpdate: isUpdateDialog,
        isDelete: isDelete,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsersList(); 
    });  }
  

  logout() {
    TokenMethodsUtils.signOut();
    document.location.reload();
    this.router.navigate(['/login']);
  }
}
