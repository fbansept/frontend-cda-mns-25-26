import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-component',
  imports: [MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.scss',
})
export class EditComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  notification = inject(MatSnackBar);

  listUser = signal<AppUser[]>([]);

  formulaire = this.formBuilder.group({
    name: ['toto', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['titi', [Validators.maxLength(100)]],
    serialNumber: [
      '0123456789',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    loaner: [null],
  });

  ngOnInit() {
    this.httpClient
      .get<AppUser[]>('http://localhost:8080/user/list')
      .subscribe((listUser) => this.listUser.set(listUser));
  }

  onCreation() {
    if (this.formulaire.valid) {
      this.httpClient.post('http://localhost:8080/component', this.formulaire.value).subscribe({
        next: (nouveauComposant) => this.notification.open('Le composant a bien été créé'),
        error: (reponse) => this.notification.open('Erreur'),
      });
    }
  }
}
