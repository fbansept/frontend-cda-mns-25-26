import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  notification = inject(NotificationService);

  formulaire = this.formBuilder.group({
    email: ['', [
      Validators.required, 
      Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    if(this.formulaire.valid) {
      this.httpClient.post(
        'http://localhost:8080/login',
        this.formulaire.value,
        {responseType: 'text'}
      ).subscribe({
        next: (jwt) => {
          localStorage.setItem('jwt', jwt);
          this.notification.open('Connexion réussie', 'valid');
        },
        error: (err) => {
          this.notification.open('Mauvais login / mot de passe', 'error');
        }
      });
    }
  }
}
