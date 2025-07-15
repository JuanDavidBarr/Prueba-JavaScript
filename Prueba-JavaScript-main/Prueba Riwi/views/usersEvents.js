export function render() {
    return `  
        <main class="container">
            <section class="row vh-100">
                <div class="col-xs-12 col-md-3 bg-secondary">
                    <h1 class="text-light">Events</h1>
                    <div>
                        <h2 class="text-light">Welcome</h2>
                    </div>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active text-light" href="#/">Events</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#/usersEvents">Enrollments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
                <div class="col-xs-12 col-md-9 bg-primary-emphasis">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">Event's Name</th>
                            </tr>
                        </thead>
                        <tbody id="tableContent">

                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        </main>
    `
}

export function afterRender() {
    if (!(localStorage.getItem("userLogged"))) {
        window.location = "#/login";
    } else {
        //DEFINE ALL CONST AND VARIABLES THAT'LL BE USED
        const tableContent = document.getElementById("tableContent");
        const URL_db = "http://localhost:3000/";
        //GET USERS
        async function getUsers() {
            try {
                const response = await fetch(URL_db + "users")
                if (!response.ok) {
                    throw new Error("Couldn't get resource");
                }
                const dataUsers = await response.json();
                return dataUsers;
            }
            catch (error) {
                console.error("Error when getting information", error);
            }
        }
        //GET EVENTS AND IMPLEMENTING HTML
        async function getEvents() {
            const dataUsers = await getUsers();
            const currentUser = dataUsers.find(element => element.id === JSON.parse(localStorage.getItem("userLogged")));
            currentUser.events.forEach(element => {
                tableContent.innerHTML += `
                <td>${element}</td>
            `
            });
        }
        async function functionExecutor() {
            await getUsers();
            await getEvents();
        }
        functionExecutor();
    }
}