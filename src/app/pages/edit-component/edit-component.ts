import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComposantService } from '../../services/composant';

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
  composantService = inject(ComposantService);
  router = inject(Router);

  listUser = signal<AppUser[]>([]);
  listTags = signal<Tag[]>([]);
  componentEdited = signal<Composant | null>(null);

  formulaire = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(100)]],
    serialNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    loaner: [null as AppUser | null],
    tags: [[] as Tag[]],
  });

  ngOnInit() {
    // récupérer la liste des utilisateurs pour le select du formulaire
    this.httpClient
      .get<AppUser[]>('http://localhost:8080/user/list')
      .subscribe((listUser) => this.listUser.set(listUser));

    // récupérer la liste des tags pour le multiselect du formulaire
    this.httpClient
      .get<Tag[]>('http://localhost:8080/tag/list')
      .subscribe((listTags) => this.listTags.set(listTags));

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
          this.composantService.get(id).subscribe((component) => {
            this.formulaire.patchValue(component);
            this.componentEdited.set(component);
          });
        }
      }
    });
  }

  onCreation() {
    if (this.formulaire.valid) {
      //si on est en edition
      if (this.componentEdited()) {
        this.composantService
          .update(this.formulaire.value as Composant, this.componentEdited()!.id)
          .subscribe({
            next: () => {
              this.notification.open('Le composant a bien été modifié', 'valid');
              this.router.navigateByUrl('/');
              // ou vider le formulaire : this.formulaire.reset()
            },
            error: this.onError,
          });
      } else {
        //si on est en creation
        this.composantService.create(this.formulaire.value as Composant).subscribe({
          next: (nouveauComposant) => {
            this.notification.open('Le composant a bien été créé', 'valid');
            this.router.navigateByUrl('/');
            // ou vider le formulaire : this.formulaire.reset()
          },
          error: this.onError,
        });
      }
    }
  }

  onError = (reponse: any) => {
    if (reponse.status === 409) {
      this.notification.open('Le numero de série existe déjà', 'error');
    } else {
      this.notification.open('Une erreur est survenue', 'error');
    }
  };
}
