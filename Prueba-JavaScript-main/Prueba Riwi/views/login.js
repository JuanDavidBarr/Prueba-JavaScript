export function render() {
    return `
        <section class="container vh-100">
            <div class="row h-100">
                <div class="col d-flex flex-column align-items-center justify-content-center">
                    <form>
                        <div class="mb-3">
                            <label for="user" class="form-label">Email address or Username</label>
                            <input type="text" class="form-control" id="user" aria-describedby="emailHelp" name="user">
                            <div id="emailHelp" class="form-text text-danger user message-empty d-none" data-hidden>All
                                fields must be filled.</div>
                            <div id="emailHelp" class="form-text text-danger user-incorrect d-none" data-hidden>User not
                                found.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password">
                            <div id="emailHelp" class="form-text text-danger password message-empty d-none" data-hidden>All
                                fields must be filled.</div>
                            <div id="emailHelp" class="form-text text-danger password-incorrect d-none" data-hidden>Password
                                incorrect.</div>
                        </div>
                        <button type="submit" class="btn btn-primary" id="loginButton">Login</button>
                        <button type="submit" class="btn btn-primary" id="createAccountButton">Create account</button>
                    </form>
                </div>
            </div>
        </section>
    
    `
}

export function afterRender() {
    const loginInput = document.querySelectorAll(".form-control");
    const loginButton = document.getElementById("loginButton");
    const createAccButton = document.getElementById("createAccountButton");
    const URL_db = "http://localhost:3000/";
    async function getUsers(url) {
        try {
            const response = await fetch(url + "users");
            if (!response.ok) {
                throw new Error("Couldn't fetch resource")
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error when getting information:".error);
        }
    }

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const messages = document.querySelectorAll("[data-hidden]");
        messages.forEach(element => {
            if (element.dataset.hidden === "false") {
                element.classList.add("d-none");
                element.dataset.hidden = "true";
            }
        });
        const data = await getUsers(URL_db);
        let isEmpty;
        loginInput.forEach(element => {
            if (element.value.length === 0) {
                const emptyMessage = document.querySelector(`.${element.name}`);
                emptyMessage.classList.remove("d-none");
                emptyMessage.dataset.hidden = "false";
                isEmpty = true;
            }
        })
        if (isEmpty) {
            return;
        }
        const emailName = loginInput[0].value;
        const password = loginInput[1].value;
        const serchUser = data.find(element => element.username === emailName || emailName === element.email);
        console.log(serchUser);
        if (!serchUser) {
            const incorrectUser = document.querySelector(".user-incorrect");
            incorrectUser.classList.remove("d-none");
            incorrectUser.dataset.hidden = "false";
            return;
        } else if (serchUser.password !== password) {
            const incorrectPassword = document.querySelector(".password-incorrect");
            incorrectPassword.classList.remove("d-none");
            incorrectPassword.dataset.hidden = "false";
            return;
        } else {
            if(serchUser.id !== "47l8"){
                localStorage.setItem("userLogged", JSON.stringify(serchUser.id));
                window.location = "#/";
            } else {
                localStorage.setItem("userLogged", JSON.stringify(serchUser.id));
                window.location = "#/dashboard"
            }
        }
    })
    createAccButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location = "#/register";
    })
}