async function fetchUserData() {
    const res = await fetch('http://localhost:5002/api/users/allUsers')
    console.log(res);
    const data = await res.json();
    console.log(data.users);
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    data.users.map((user) => {
        var row = document.createElement('tr');
        var idTd = document.createElement('td');
        idTd.innerHTML = user._id;
        var nameTd = document.createElement('td');
        nameTd.innerHTML = user.name;
        var emailTd = document.createElement('td');
        emailTd.innerHTML = user.email;
        var createdAt = document.createElement('td');
        createdAt.innerHTML = user.createdAt;
        var updatedAt = document.createElement('td');
        updatedAt.innerHTML = user.updatedAt;

        var actionsTd = document.createElement('td');
        // actionsTd.innerHTML = user.actions;

        var updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Update';

        var bodyBtn = document.createElement('button');
        bodyBtn.innerHTML = 'body';

        row.appendChild(idTd);
        row.appendChild(nameTd);
        row.appendChild(emailTd);
        row.appendChild(createdAt);
        row.appendChild(updatedAt);
        actionsTd.appendChild(updateBtn);
        actionsTd.appendChild(bodyBtn);
        row.appendChild(actionsTd);
        userTableBody.appendChild(row);
    });
}
fetchUserData();

const userForm = document.getElementById('userData');

formSubmit.addEventListener('submit', async function (e) {
    e.preventDefault();
    var userName = document.getElementById('name').value;
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;
    var userConfirmPassword = document.getElementById('confirmPassword').value;
    console.log(userName, userEmail, userPassword, userConfirmPassword);

        // تحقق من تطابق password و confirmPassword
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const res = await fetch('http://localhost:5002/api/users/registerUser');
    const data = await res.json();
    console.log(data);
}
);