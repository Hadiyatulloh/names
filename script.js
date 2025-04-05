const apiUrl = "https://67f0e36ec733555e24ab7e90.mockapi.io/erferffef/user";
let users = [];

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        users = await response.json();
        displayUsers();
    } catch (error) {
        console.error("Foydalanuvchilarni olishda xato:", error);
    }
}

function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="user-names-numbers-container">     
            <span>${user.name}</span>
            <span class="age">age ${user.age}</span>
        </span>
       
            <span class="actions">
                <button class="edit" onclick="editUser(${user.id})">✏️</button>
                <button onclick="deleteUser(${user.id})">🗑️</button>
            </span>
        `;
        userList.appendChild(li);
    });
}

async function addUser() {
    const userName = document.getElementById("userInput").value;
    if (userName === "") return;

    const newName = `Mr./Ms. ${userName}`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName
            })
        });

        const newUser = await response.json();
        users.pop(newUser);
        displayUsers();
        document.getElementById("userInput").value = '';
    } catch (error) {
        console.error("Yangi foydalanuvchini qo'shishda xato:", error);
    }
}

async function editUser(userId) {
    const newName = prompt("Enter a useful name:");
    if (newName) {
        try {
            const response = await fetch(`${apiUrl}/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newName
                })
            });

            const updatedUser = await response.json();
            const userIndex = users.findIndex(user => user.id === userId);
            users[userIndex] = updatedUser;
            displayUsers();
        } catch (error) {
            console.error("Foydalanuvchini tahrirlashda xato:", error);
        }
    }
}

async function deleteUser(userId) {
    try {
        await fetch(`${apiUrl}/${userId}`, {
            method: "DELETE"
        });

        users = users.filter(user => user.id !== userId);
        displayUsers();
    } catch (error) {
        console.error("Foydalanuvchini o'chirishda xato:", error);
    }
}

window.onload = fetchUsers;