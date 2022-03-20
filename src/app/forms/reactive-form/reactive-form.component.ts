import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  applicationDetailsForm: FormGroup;

  selectedWaterValues: Array<string>;
  waterUsages: Array<string> = [
    'House',
    'Garden/Lawn',
    'Industrial',
    'Mining',
    'Aquaculture',
    'Horticultural',
    'Stock Watering',
    'Other',
  ];

  fileName: string;
  errMsg: string;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateWaterUsageValue();
  }

  addWaterUsages(value: string | string[]) {
    const arr = this.waterUsages.map((item) => {
      if (value.includes(item)) {
        return this._fb.control(true);
      }
      return this._fb.control(false);
    });
    return this._fb.array(arr);
  }

  get waterUse() {
    return <FormArray>this.applicationDetailsForm.get('waterUsageCheckBox');
  }
  get application() {
    return this.applicationDetailsForm.controls;
  }
  getSelectedWaterValue() {
    this.selectedWaterValues = [];
    this.waterUse.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedWaterValues.push(this.waterUsages[i]);
      }
    });
    console.log(this.selectedWaterValues);
  }

  fileChange(e: any) {
    console.log(e[0]);
    if (!e[0]) {
      return;
    }
    this.fileName = e[0].name;
    if (e[0].size >= 10240000) {
      this.applicationDetailsForm.controls['attachFile'].setErrors({
        incorrect: true,
      });
      this.errMsg = 'Please upload the file size smaller than 10MB.';
      this.fileName = '';
      return;
    }
    if (
      !this.fileName.match(
        /.txt|.TXT|.doc|.DOC|.docx|DOCX|.jpg|.JPG|.jpeg|.JPEG|.png|.PNG|.pdf|.PDF/
      )
    ) {
      this.errMsg =
        'File format not supported. Please upload a PDF, DOC, TXT, JPEG or PNG file.';
      this.applicationDetailsForm.controls['attachFile'].setErrors({
        incorrect: true,
      });
      this.fileName = '';
      return;
    } else {
      this.applicationDetailsForm.get('attachFile')?.setValue(e[0]);
      this.errMsg = '';
    }
  }

  updateWaterUsageValue() {
    var checked = ['Mining', 'Aquaculture', 'House'];
    this.applicationDetailsForm = this._fb.group({
      waterUsageCheckBox: this.addWaterUsages(checked),
      areaToIrrigate: [null],
      licenceRegistered: ['false', Validators.required],
      infrastructure: [null, Validators.required],
      companyName: [null, Validators.required],
      abnNumber: [null, Validators.required],
      attachFile: [null],
    });
  }
  submit() {
    if (this.applicationDetailsForm.invalid) return;
    console.log(this.applicationDetailsForm.value);
    alert('form submitted');
    // here will api call for uploading file and other details.
  }
}
