import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversityModel } from './model/university.model';
import {UniversityService} from './services/university.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy  {
  title = 'Angular University PWA';
  searchForm: FormGroup;
  universityData: UniversityModel;
  subscription: Subscription[] = [];

  constructor(private fb: FormBuilder, private universityService: UniversityService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }

  /**
   * function calling the API to get the
   * list of all universities by country name
   */
  async onSearch(): Promise<void> {
    const {search} = this.searchForm.value;
    console.log('search value: ', search);
    this.subscription.push(
      await this.universityService.fetchUniversitiesList(search).subscribe((res: UniversityModel) => {
        console.log('University list: ', res);
        this.universityData = res;
    }, (err) => {
      console.log('Error: ', err);
    })
    );
  } // end of onSearch function...

  // unsubscribing the subscribed data on view destroy.
  ngOnDestroy(): void {
    this.subscription.forEach(ele => ele.unsubscribe());
  }
}
