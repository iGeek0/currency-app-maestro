(() => {
    console.log("Hello from index.js");
    document.getElementById("convertButton").addEventListener("click", convertir);
    document.getElementById("informationButton").addEventListener("click", showInformationModal);
    const currencyFrom = document.getElementById("currencyFrom");
    const currencyTo = document.getElementById("currencyTo");
    const amountFrom = document.getElementById("amountFrom");
    const amountTo = document.getElementById("amountTo");
    const loader = document.getElementById("loader");
    const mainContainer = document.getElementById("mainContainer");

    function showInformationModal() {
        Swal.fire({
            icon: 'info',
            title: 'Mensaje',
            text: 'Web creado por @JesusCardenas'
            // showConfirmButton: false,
            // timer: 1500
          })
    }

    function convertir() {
        if (amountTo.value === "" || amountTo.value === "0") {
            Swal.fire({
                icon: 'error',
                title: 'Mensaje',
                text: 'Debe ingresar un monto a convertir',
            });
            return;
        }
        console.log("Convertir");
        const from = currencyFrom.value;
        const to = currencyTo.value;
        const amount = amountFrom.value;
        console.log(from, to, amount);
        mainContainer.classList.add("d-none");
        loader.classList.remove("d-none");
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`)
            .then(response => response.json())
            .then(async (data) => {
                console.log(data);
                await delay(3000);
                loader.classList.add("d-none");
                mainContainer.classList.remove("d-none");
                let result = data[to] * amount;
                amountTo.value = result.toFixed(2);
            })
    }

    function loadCurrencies() {
        loader.classList.remove("d-none");
        console.log("Load currencies");
        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
            .then(response => response.json())
            .then(async (data) => {
                // await delay(5000);
                loader.classList.add("d-none");
                for (const key in data) {
                    const option = document.createElement("option");
                    option.value = key;
                    // option.text = data[key] + " (" + key + ")";
                    option.text = `${data[key]} (${key})`;
                    currencyFrom.appendChild(option);
                    currencyTo.appendChild(option.cloneNode(true));
                }
                mainContainer.classList.remove("d-none");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    loadCurrencies();

})();

// https://cssloaders.github.io/
