export function render() {
    return `
        <main class="container">
            <section class="row vh-100">
                <div class="col-xs-12 col-md-3 bg-secondary">
                    <h1 class="text-light">Events</h1>
                    <div>
                        <h2 class="text-light">Welcome user</h2>
                    </div>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active text-light" href="#">Events</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Enrollments</a>
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
                            <th scope="col">State</th>
                        
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
        const container = document.getElementById("container");
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
        //GET USERS INFORMATION
        async function getUsers() {
            try {
                const response = await fetch(URL_db + "users")
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
        //PUTS EVENTS INFORMATION FROM DB.JSON UPON THE TABLE
        async function renderTable() {
            const dataEvents = await getEvents();
            dataEvents.forEach(element => {
                tableContent.innerHTML += `
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.capacity}/20</td>
                    <td>${element.date}</td>
                    `
                if (element.capacity > 0) {
                    tableContent.innerHTML += `<td><button type="button" class="btn btn-primary" id="enrollBtn" data-event="${element.name}">Enroll</button></td>`
                } else {
                    tableContent.innerHTML += `<td><button type="button" class="btn btn-secondary disabled">Sold out</button></td>`
                }
            });
            //EVENT TO ENROLL TO A CONCERT
            const dataUsers = await getUsers();
            const enrollBtn = document.querySelectorAll(".btn");
            console.log(enrollBtn);
            enrollBtn.forEach(btn => {
                btn.addEventListener("click", async (event) => {
                    event.preventDefault();
                    const confirmation = confirm("Are you sure you want to sign-up for this event?");
                    if (confirmation) {
                        const user = dataUsers.find(element => element.id === JSON.parse(localStorage.getItem("userLogged")));
                        const eventsList = user.events;
                        const newEvent = event.target.dataset.event;
                        const isRepeated = eventsList.find(event => event === newEvent);
                        if (isRepeated) {
                            alert("You are already enrolled to this event");
                        } else {
                            eventsList.push(newEvent);
                            const newEventList = eventsList;
                            try {
                                const response = await fetch(URL_db + `users/${user.id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        events: newEventList
                                    })
                                })
                                if (!response.ok) {
                                    throw new Error("Couldn't update resource");
                                }
                                alert(`You have succesfully sign up for ${newEvent}`)
                            }
                            catch (error) {
                                console.error("Error when updating user", error);

                            }
                            //CAPACITY COUNTDOWN
                            const currentEvent = dataEvents.find(event => event.name === newEvent);
                            const eventCapacity = currentEvent.capacity;
                            const newEventCapacity = eventCapacity - 1;
                            try {
                                const response = await fetch(URL_db + `events/${currentEvent.id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        capacity: newEventCapacity
                                    })
                                })
                                if (!response.ok) {
                                    throw new Error("Couldn't update resource");
                                }
                            }
                            catch (error) {
                                console.error("Error when updating user", error);
                            }
                        }
                    }
                });
            });
        }
        //FUNCTION EXECUTER 
        async function functionExecuter() {
            await getEvents();
            await getUsers();
            await renderTable();
        }
        functionExecuter();
    }
}