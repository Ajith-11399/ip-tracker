//! Creating a function named element =>
function element(tag, className, id, text) {
  const tags = document.createElement(tag);
  tags.id = id;
  tags.className = className;
  tags.textContent = text;
  return tags;
}

//! Creating container, title and rows =>
const container = element("div", "container mt-5 mb-5", "", "");
const h1 = element(
  "h1",
  "text-center mt-5 mb-4",
  "title",
  "IP Address Validation"
);
const row = element(
  "div",
  "row align-items-center justify-content-center",
  "",
  ""
);

//! Creating Rows =>
const box = document.createElement("div");
box.className = "col-lg-6 col-md-8 col-sm-10";
box.innerHTML = `
    <div class="card border-primary">
        <div class="card-header bg-primary">
            <h5 class="text-center text-white pt-1">Get details of a <b>Public</b> IP address</h5>
        </div>
        <div class="card-body">
            <input type="text" class="inp form-control mb-2 border-primary" id="ipAddress" placeholder="Enter a public IP address">
            <button type="button" class="btn btn-primary btn-block">Check</button>
            <div class="img-top mt-2">
                <img src="" id="image" class="card-img-top" alt="">
            </div>
            <div id="details" class="mt-3"></div>
        </div>
    </div>
  `;

//! Appending child tags to parent tags =>
row.appendChild(box);
container.appendChild(h1);
container.appendChild(row);
document.body.append(container);

//! Added event listener for, when an ip address was submitted, the number value directly appended to the API url, so we can get the details about that IP Address dynamically =>
const button = document.querySelector("button");
button.addEventListener("click", async (event) => {
  const input = document.getElementById("ipAddress").value.trim();

  //! Fetching API using Async - Await =>
  try {
    const result = await fetch(
      `https://api.ipstack.com/${input}?access_key=019bb11249dfa8eca89ab1fcd95eafdd`
    );
    const data = await result.json();

    const ele = document.getElementById("details");
    ele.innerHTML = "";

    const table = document.createElement("table");
    table.classList = "table";

    // Create table structure and rows
    const tbody = document.createElement("tbody");

    const rowData = [
      { label: "IP Address", value: data.ip },
      { label: "IP Type", value: data.type },
      { label: "Country Code", value: data.country_code },
      { label: "Country Name", value: data.country_name },
      { label: "Region Code", value: data.region_code },
      { label: "Region Name", value: data.region_name },
      { label: "City", value: data.city },
      { label: "ZIP Code", value: data.zip },
      { label: "Latitude", value: data.latitude },
      { label: "Longitude", value: data.longitude },
      { label: "Prefix", value: data.location.calling_code },
      { label: "Geo - Name ID", value: data.location.geoname_id },
      { label: "Capital", value: data.location.capital },
      { label: "Language", value: data.location.languages[0].name },
    ];

    rowData.forEach(({ label, value }) => {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.innerHTML = label;
      const td = document.createElement("td");
      td.innerHTML = value;
      row.appendChild(th);
      row.appendChild(td);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    ele.appendChild(table);

    const image = document.getElementById("image");
    image.src = data.location.country_flag;
  } catch (error) {
    console.error("Error fetching IP details:", error);
    // Handle error, e.g., display a message to the user
  }
});
