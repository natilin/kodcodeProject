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
