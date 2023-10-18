document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = 'http://localhost:3000';

    const employeForm = document.getElementById('employeForm');
    employeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const dateNaissance = document.getElementById('dateNaissance').value;
        const animalId = document.getElementById('animalId').value;

        createEmploye(nom, prenom, dateNaissance, animalId);
    });


    function createEmploye(nom, prenom, dateNaissance, animalId) {
        const data = {
            nom: nom,
            prenom: prenom,
            dateNaissance: dateNaissance,
            animalId: animalId
        };

        fetch(`${API_BASE_URL}/employes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    employeForm.reset(); 
                    fetchEmployes(); 
                } else {
                    console.error("Erreur lors de la création de l'employé");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la création de l'employé :", error);
            });
    }

    // Fonction pour supprimer un employé
    function deleteEmploye(employeId) {
        fetch(`${API_BASE_URL}/employes/${employeId}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    fetchEmployes(); // Mettre à jour la liste des employés après la suppression
                } else {
                    console.error("Erreur lors de la suppression de l'employé");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'employé :", error);
            });
    }

    // Fonction pour récupérer la liste des employés depuis l'API
    function fetchEmployes() {
        fetch(`${API_BASE_URL}/employes`)
            .then((response) => response.json())
            .then((data) => {
                const employeList = document.getElementById('employeList');
                employeList.innerHTML = ''; // Effacez la liste précédente

                data.employes.forEach((employe) => {
                    const li = document.createElement('li');
                    li.innerHTML = `Id: ${employe._id}, Nom: ${employe.nom}, Prénom: ${employe.prenom}, Date de Naissance: ${employe.dateNaissance}, Animal : ${employe.animalId}`;

                    // Bouton pour supprimer l'employé
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Supprimer';
                    deleteButton.addEventListener('click', () => deleteEmploye(employe._id));
                    li.appendChild(deleteButton);

                    employeList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la liste des employés :', error);
            });
    }

    fetchEmployes();

    function fetchAnimals() {
        fetch(`${API_BASE_URL}/animals`)
            .then((response) => response.json())
            .then((data) => {
                const animalDropdown = document.getElementById('animalId');
                animalDropdown.innerHTML = ''; 
    
                data.animals.forEach((animal) => {
                    const option = document.createElement('option');
                    option.value = animal._id;
                    option.innerText = animal.nom;
                    animalDropdown.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération de la liste des animaux :', error);
            });
    }
    

    fetchAnimals();
    
});