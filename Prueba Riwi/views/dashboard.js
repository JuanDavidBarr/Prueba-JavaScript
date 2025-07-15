export function render() {
    return `
        <main class="container">
        <section class="row vh-100">
            <div class="col-xs-12 col-md-3 bg-secondary">
                <h1 class="text-light">Events</h1>
                <div id="welcomeMessage">
                    <h2 class="text-light">Welcome Admin</h2>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active text-light" href="#">Events</a>
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
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody id="tableContent">

                    </tbody>
                </table>
                <button type="button" href="#/formNewEvent" class="btn btn-primary" id="addEventsBtn" >Add event</button>
            </div>
        </section>
        </div>
    </main>
    
    `
}

export function afterRender() {
    if (!(localStorage.getItem("userLogged"))) {
        window.location = "#/login";
    } else if (JSON.parse(localStorage.getItem("userLogged")) !== "47l8") {
        window.location = "#/eventsPage";
    } else {
        //DEFINE ALL CONST AND VARIABLES THAT'LL BE USED
        const tableContent = document.getElementById("tableContent");
        const URL_db = "http://localhost:3000/";
        //GET EVENTS INFORMATION
        async function getEvents() {
            try {
                const response = await fetch(URL_db + "events")
                if (!response.ok) {
                    throw new Error("Couldn't get resource");
                }
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.error("Error when getting information", error);
            }
        }
        async function renderTable() {
            const dataEvents = await getEvents();
            dataEvents.forEach(element => {
                tableContent.innerHTML += `
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>${element.capacity}/20</td>
                <td>${element.date}</td>
                `
            });
        }
        async function functionExecuter() {
            await getEvents();
            await renderTable();
        }
        functionExecuter();
    }
}