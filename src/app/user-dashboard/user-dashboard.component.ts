import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms'
import { UserModel } from './user-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }
  userModelObj : UserModel = new UserModel();
  userData !:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Name:[''],
      JobTitle:['']
    })
    this.getAllUser();
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
    postUserDetails(){
      this.userModelObj.Name = this.formValue.value.Name;
      this.userModelObj.JobTitle = this.formValue.value.JobTitle;
    
      this.api.postUser(this.userModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("User Added Succesfully")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      },
      err=>{
        alert("something went wrong");
      })
      
    }

    getAllUser(){
      this.api.getUser()
      .subscribe(res=>{
        this.userData = res;
      })
    }

    deleteUser(row : any){
      this.api.deleteUser(row.id)
      .subscribe(res=>{
        alert("User Deleted");
        this.getAllUser();
      })
    }

    onEdit(row: any){
      this.showAdd = false;
      this.showUpdate = true;
      this.userModelObj.id = row.id;
      this.formValue.controls['Name'].setValue(row.Name);
      this.formValue.controls['JobTitle'].setValue(row.JobTitle);
    }

    updateUserDetails(){
      this.userModelObj.Name = this.formValue.value.Name;
      this.userModelObj.JobTitle = this.formValue.value.JobTitle;
      this.api.updateUser(this.userModelObj,this.userModelObj.id)
      .subscribe(res=>{
        alert("updated successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })      
    }


}
