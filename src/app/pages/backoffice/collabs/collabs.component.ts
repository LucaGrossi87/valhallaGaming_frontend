import { Component, OnInit } from '@angular/core';
import { CollabsService } from './collabs.service';
import { AuthService } from '../../../auth/auth.service';
import { Admin } from '../../../models/i-admins'; // Assicurati di importare correttamente Admin

@Component({
  selector: 'app-collabs',
  templateUrl: './collabs.component.html',
  styleUrls: ['./collabs.component.scss'],
})
export class CollabsComponent implements OnInit {
  select: boolean = false;
  selectEdit: boolean = false;
  collaborator: any = {};
  collaborators: any[] = [];
  isCollaborator: boolean = false;

  constructor(
    private collabSvc: CollabsService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCollaborators();
    this.authSvc.user$.subscribe((user) => {
      // Verifica se user è un oggetto Admin e se ha il ruolo 'COLLABORATOR'
      this.isCollaborator = (user as Admin)?.role === 'COLLABORATOR';
    });
  }

  toggleSelect(): void {
    if (!this.isCollaborator) {
      this.select = !this.select;
    }
  }

  toggleSelectEdit(): void {
    if (!this.isCollaborator) {
      this.selectEdit = !this.selectEdit;
    }
  }

  submitCollaborator(): void {
    if (!this.isCollaborator) {
      this.collabSvc.createCollaborator(this.collaborator).subscribe(
        (data) => {
          console.log('Collaboratore creato con successo:', data);
          this.collaborator = {};
          this.select = false;
          this.loadCollaborators();
        },
        (error) => {
          console.error(
            'Errore durante la creazione del collaboratore:',
            error
          );
        }
      );
    }
  }

  loadCollaborators(): void {
    this.collabSvc.getAllCollaborators().subscribe(
      (data) => {
        this.collaborators = data;
      },
      (error) => {
        console.error('Errore durante il recupero dei collaboratori:', error);
      }
    );
  }

  edit(collaborator: any): void {
    if (!this.isCollaborator) {
      this.collaborator = {
        id: collaborator.id,
        firstName: collaborator.firstName,
        lastName: collaborator.lastName,
        userName: collaborator.userName,
        email: collaborator.email,
        password: collaborator.password,
      };

      this.selectEdit = true;
    }
  }

  updateCollaborator(): void {
    if (!this.isCollaborator) {
      this.collabSvc
        .updateCollaborator(this.collaborator.id, this.collaborator)
        .subscribe(
          (data) => {
            console.log('Collaboratore aggiornato con successo:', data);
            this.collaborator = {};
            this.select = false;
            this.loadCollaborators();
          },
          (error) => {
            console.error(
              "Errore durante l'aggiornamento del collaboratore:",
              error
            );
          }
        );
    }
  }

  delete(id: number): void {
    if (!this.isCollaborator) {
      this.collabSvc.deleteCollaborator(id).subscribe(
        () => {
          console.log('Collaboratore eliminato con successo');
          this.loadCollaborators();
        },
        (error) => {
          console.error(
            "Errore durante l'eliminazione del collaboratore:",
            error
          );
        }
      );
    }
  }
}
