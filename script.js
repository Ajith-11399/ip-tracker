    //! Element function =>
    function element(tag, className, id, text) {
        const tags = document.createElement(tag);
        if (id) tags.id = id;
        tags.className = className;
        tags.innerHTML = text;
        return tags;
    }

    //! Creating containers and row =>
    const container = element("div", "container", "", "");
    const h1 = element("h1", "text-center mt-5 mb-5 text-success", "title", "IP Address Validation");
    const row = element("div", "row justify-content-center", "", "");

    const box1 = element("div", "col-lg-6 col-md-6 col-sm-12 mt-4 mb-5", "", `
        <div class="card border-primary">
            <div class="card-header bg-primary text-white pt-3">
                <h5 class="text-center">Check an IP Address for free</h5>
            </div>
            <div class="card-body d-flex align-items-center justify-content-center flex-column mb-1">
                <input type="text" id="ipAddress" class="form-control border-primary" placeholder="Enter your IP Address to check!" required="">
                <button type="submit" class="btn btn-primary">Click here</button>
            </div>
            <p class="text-dark m-2"> * To check your IP adress details, just click the Button..</p>
        </div>
    `);

    //! Appending values =>
    row.appendChild(box1);
    container.appendChild(h1);
    container.appendChild(row);
    document.body.append(container);

    //! Add event listener for the submit button =>
    const button = document.querySelector("button");
    button.addEventListener("click", async (event) => {
        const input = document.getElementById("ipAddress").value.trim();

        try {
            //! Try block =>
            const result = await fetch(
                `https://ipgeolocation.abstractapi.com/v1/?api_key=36472a8c4dcb4074a805f9a1ffe7a407&ip_address=${input}`
            );
            const data = await result.json();

            //! Remove any existing details before appending new ones =>
            const existingDetails = document.querySelector(".details");
            if (existingDetails) {
                existingDetails.remove();
            }

            //! IP Details =>
            const details = document.createElement("div");
            details.classList = "col-lg-6 col-md-6 col-sm-12 mt-4 mb-5 details";

            const imgBox = document.createElement("div");
            imgBox.classList = "img-box mt-3";

            const h4 = document.createElement("h4");
            h4.classList = 'text-center';

            const image = document.createElement("img");
            image.classList = "card-img-top mb-3";
            image.setAttribute("src", data.flag?.png || "NA");
            image.setAttribute("alt", "Flag of a Nation");

            const table = document.createElement("table");
            table.classList = "table table-bordered border-primary mt-5 text-center";

            const tbody = document.createElement("tbody");

            //! Assigning label and value =>
            // const rowData = [
            //     { label: "IP Address", value: data.ip_address },
            //     { label: "City", value: data.city },
            //     { label: "Region Name", value: data.region },
            //     { label: "Region Code", value: data.region_iso_code },
            //     { label: "Postal Code", value: data.postal_code },
            //     { label: "Country Name", value: data.country },
            //     { label: "Country Code", value: data.country_code },
            //     { label: "Latitude", value: data.latitude },
            //     { label: "Longitude", value: data.longitude },
            //     { label: "VPN", value: data.security.is_vpn },
            //     { label: "Timezone", value: data.timezone.name || "NA" }, 
            //     { label: "Current Time", value: data.timezone.current_time },
            //     { label: "Currency", value: data.currency_code },
            //     { label: "Connection Type", value: data.connection.connection_type },
            //     { label: "ISP", value: data.connection.isp_name },
            // ];

            const rowData = [
                { label: "IP Address", value: data.ip_address },
                { label: "City", value: data.city },
                { label: "Region Name", value: data.region },
                { label: "Region Code", value: data.region_iso_code },
                { label: "Postal Code", value: data.postal_code },
                { label: "Country Name", value: data.country },
                { label: "Country Code", value: data.country_code },
                { label: "Latitude", value: data.latitude },
                { label: "Longitude", value: data.longitude },
                { label: "VPN", value: data.security?.is_vpn || "NA" },
                { label: "Timezone", value: data.timezone?.name || "NA" }, 
                { label: "Current Time", value: data.timezone?.current_time || "NA" },
                { label: "Currency", value: data.currency_code },
                { label: "Connection Type", value: data.connection?.connection_type || "NA" },
                { label: "ISP", value: data.connection?.isp_name || "NA" },
            ];
            

            //! Using forEach method multiple table roes =>
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

            //! Appending to the main structure =>
            imgBox.appendChild(image);
            table.appendChild(tbody);
            details.append(imgBox, table);
            row.appendChild(details);
            container.appendChild(row);
        } catch (error) {
            //! Catch block =>
            console.log("Error fetching data from API", error);
        }
    }); 