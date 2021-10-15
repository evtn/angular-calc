import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { companies, Plan } from '../utils';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})

export class CalculatorFormComponent {
  inputs = this.fb.group({
    distance: ['100'],
    age: ['20'],
    bags: ['0'],
  });
  companies = companies
  formatter = Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

  constructor(private fb: FormBuilder) { }

  planPriceBase(plan: Plan): number[] {
    let { distance, age, bags } = this.inputs.value;
    return plan.func(distance, age, bags)
  }

  planPrices(plan: Plan): string[] {
    return this.planPriceBase(plan).map(this.formatter.format)
  }

  checkPlan(plan: Plan): boolean {
    return !Number.isNaN(this.planPriceBase(plan)[0])
  }

  onSubmit() {}
}