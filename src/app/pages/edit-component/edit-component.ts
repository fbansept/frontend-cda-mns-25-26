import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-component',
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.scss',
})
export class EditComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  notification = inject(NotificationService);
  route = inject(ActivatedRoute);

  listUser = signal<AppUser[]>([]);

  formulaire = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(100)]],
    serialNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    loaner: [null],
  });

  ngOnInit() {
    // récupérer la liste des utilisateurs pour le select du formulaire
    this.httpClient
      .get<AppUser[]>('http://localhost:8080/user/list')
      .subscribe((listUser) => this.listUser.set(listUser));

    // vérifier si on est en création ou en modification et recuperer l'id
    this.route.params.subscribe((parametre) => {
      //si on est en edition
      if (parametre['id'] !== undefined) {
        const id = +parametre['id'];

        if (Number.isNaN(id)) {
          this.notification.open('ID non valide', 'error');
        } else {
          // récupérer les données du composant à modifier
          // et les injecter dans le formulaire
          this.httpClient
            .get<Composant>('http://localhost:8080/component/' + id)
            .subscribe((component) => this.formulaire.patchValue(component));
        }
      }
    });
  }

  onCreation() {
    if (this.formulaire.valid) {
      this.httpClient.post('http://localhost:8080/component', this.formulaire.value).subscribe({
        next: (nouveauComposant) => this.notification.open('Le composant a bien été créé', 'valid'),
        error: (reponse) => {
          if (reponse.status === 409) {
            this.notification.open('Le numero de série existe déjà', 'error');
          } else {
            this.notification.open('Une erreur est survenue', 'error');
          }
        },
      });
    }
  }
}
