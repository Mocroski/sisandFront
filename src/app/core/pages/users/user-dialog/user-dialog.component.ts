import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users/users.service';
import { UserInputDto, UserOutputDto } from '../../../models/users/users';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UsersService,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: UserOutputDto,
      isUpdate: boolean,
      isDelete: boolean
    }
  ) {
    this.userForm = this.initUserForm();
  }

  ngOnInit(): void {

    if (this.data.isUpdate)
      this.populateUserForm(this.data.user)
  }

  initUserForm(): FormGroup {
    return this.formBuilder.group({
      userName: [null],
      password: [null],
      name: [null],
      email: [null],
    });
  }

  populateUserForm(data: UserOutputDto): void {
    this.userForm.patchValue({
      userName: data.userName,
      email: data.email,
    });
  }

  insertOrUpdateUser(): void {
    if (this.data.isUpdate) {
      this.userService.updateAsync(this.data.user.id, new UserInputDto(this.userForm.value.userName, this.userForm.value.password, this.userForm.value.name, this.userForm.value.email)).subscribe({
        next: (response) => { },
        error: (error) => { },
        complete: () => { this.dialogRef.close(); }
      });
    }
    else {
      this.userService.insertAsync(new UserInputDto(this.userForm.value.userName, this.userForm.value.password, this.userForm.value.name, this.userForm.value.email)).subscribe({
        next: (response) => { },
        error: (error) => { },
        complete: () => { this.dialogRef.close(); }
      }).add(() => {
        this.isLoading = false;
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.isLoading = true;
    this.userService.deleteByIdAsync(this.data.user.id).subscribe({
      next: (response: any) => {
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        { }
      }
    }).add(() => {
      this.isLoading = false;
    });
  }
}
