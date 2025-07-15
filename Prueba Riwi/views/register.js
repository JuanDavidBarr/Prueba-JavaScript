export function render() {
    return `
        <section class="container vh-100">
            <div class="row h-100">
                <div class="col d-flex flex-column align-items-center justify-content-center">
                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                                name="username">
                            <div id="emailHelp" class="form-text text-danger username d-none" data-hidden>All fields must be
                                filled.</div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email">
                            <div id="emailHelp" class="form-text text-danger email d-none" data-hidden>All fields must be
                                filled.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password">
                            <div id="emailHelp" class="form-text text-danger password d-none" data-hidden>All fields must be
                                filled.</div>
                        </div>
                        <div class="mb-3">
                            <label for="passwordConfirm" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="passwordConfirm" name="passwordConfirm">
                            <div id="emailHelp" class="form-text text-danger passwordConfirm d-none" data-hidden>All fields
                                must be filled.</div>
                            <div id="emailHelp" class="form-text text-danger no-match d-none" data-hidden>Passwords do not
                                match.</div>
                        </div>
                        <button type="submit" class="btn btn-primary" id="register-button">Create</button>
                        <div id="emailHelp" class="form-text text-danger username-unavailable d-none" data-hidden>There is
                            already an account with that name.</div>
                        <div id="emailHelp" class="form-text text-danger email-unavailable d-none" data-hidden>There is
                            already an account with that email.</div>
                    </form>
                </div>
            </div>
        </section>
    `
}

export function afterRender() {
    const URL_db = "http://localhost:3000/";
    const registerInput = Array.from(document.getElementsByClassName("form-control"));
    const registerButton = document.getElementById("register-button");
    //GET METHOD
    async function getUsers(url) {
        try {
            const response = await fetch(url + "users");
            if (!response.ok) {
                throw new Error("Couldn't fetch resource");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Error when getting information:", error);
        }
    }
    //POST METHOD
    async function createUsers(url, data1) {
        try {
            const response = await fetch(url + "users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data1)
            });
            if (!response.ok) {
                throw new Error("Couldn't add resource");
            }
            const data = await response.json();
            console.log("User has been created");
            //AUTHENTICATION AND BRINGS TO PRIVATE SESSION
            const userLogged = data["id"];
            localStorage.setItem("userLogged", JSON.stringify(userLogged));
            sessionStorage.setItem("authentication", "true");
            window.location = "#/";
        }
        catch (error) {
            console.error("Error when creating user:", error)
        }
    }
    registerButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const messages = document.querySelectorAll("[data-hidden]");
        //TAKING OUT ERROR MESSAGES IF ANY
        messages.forEach(element => {
            if (element.dataset.hidden === "false") {
                element.classList.add("d-none");
                element.dataset.hidden = "true";
            }
        });
        const data = await getUsers(URL_db);
        let noAvaible = false;
        let isEmpty = false;
        //VALIDATING INPUTS ARE NOT EMPTY
        registerInput.forEach(element => {
            if (element.value.length === 0) {
                const emptyMessage = document.querySelector(`.${element.name}`);
                emptyMessage.classList.remove("d-none");
                emptyMessage.dataset.hidden = "false";
                isEmpty = true;
            }
        });
        if (isEmpty) {
            return;
        }
        const username = registerInput[0].value.trim();
        const email = registerInput[1].value.trim();
        const password = registerInput[2].value;
        const confirmPassword = registerInput[3].value;
        //VALIDATING THERE IS NO USERNAME OR EMAIL REPEATED
        const serchUser = data.find(element => element.username === username || element.email === email);
        console.log(serchUser);

        if (serchUser) {
            if (serchUser.username === username) {
                const unavailableMessage = document.querySelector(".username-unavailable");
                unavailableMessage.classList.remove("d-none");
                unavailableMessage.dataset.hidden = "false";
                noAvaible = true;
            } else if (serchUser.email === email) {
                const unavailableMessage = document.querySelector(".email-unavailable");
                unavailableMessage.classList.remove("d-none");
                unavailableMessage.dataset.hidden = "false";
                noAvaible = true;
            }
        }
        if (noAvaible) {
            return;
        }
        if (!(password === confirmPassword)) {
            const noMatchMessage = document.querySelector(".no-match");
            noMatchMessage.classList.remove("d-none");
            noMatchMessage.dataset.hidden = "false";
            return;
        }
        const newUser = {
            "username": username,
            "email": email,
            "password": password,
            "role": "visitor",
            "cursos": ""
        }
        createUsers(URL_db, newUser);
    })
}