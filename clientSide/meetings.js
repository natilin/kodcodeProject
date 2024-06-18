const cooseDoc = document.getElementById("selectDoc")
const cooseSpecialty = document.getElementById("selectSpecialty")

function filterDoctorsByName(doctors, name) {
    return doctors.filter(doctor => doctor.name.toLowerCase().includes(name.toLowerCase()));
}
let filteredByName = filterDoctorsByName(doctors, "Paul");
console.log(filteredByName);

function filterDoctorsBySpecialty(doctors, specialty) {
    return doctors.filter(doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase());
}

let filteredBySpecialty = filterDoctorsBySpecialty(doctors, "Clinical Psychology");
console.log(filteredBySpecialty);





function greetUser(username) {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = `Good morning, ${username}`;
    } else if (hours >= 12 && hours < 18) {
        greeting = `Good afternoon, ${username}`;
    } else if (hours >= 18 && hours < 24) {
        greeting = `Good evening, ${username}`;
    } else {
        greeting = `Good night, ${username}`;
    }

    document.getElementById('greeting').innerText = greeting;
}

greetUser('Your Username');
