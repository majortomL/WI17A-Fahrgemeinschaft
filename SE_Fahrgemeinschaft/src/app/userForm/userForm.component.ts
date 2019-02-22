import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-user-form',
    templateUrl: './userForm.component.html',
    styleUrls: ['./userForm.component.scss']
})
export class UserFormComponent implements OnInit {
    myForm: FormGroup;

    constructor(private fb: FormBuilder,) {
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            email: '',
            message: 'default message'
        })

        this.myForm.valueChanges.subscribe(console.log);
    }

}
