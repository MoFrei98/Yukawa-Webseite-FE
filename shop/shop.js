function loadProducts() {
    console.log("loading products...");
    fetch('json/products.json').then(response => response.json()).then(data => {
        const content = document.getElementById('content');

        /*Textilen*/
        const textilien = data.textilien;
        const textilienSection = document.getElementById('textilien');
        textilien.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.setAttribute('class', 'product');

            const productName = document.createElement('h3');
            productName.setAttribute('class', 'product-headline');
            productName.textContent = product.name;

            const productImg = document.createElement('img');
            productImg.setAttribute('class', 'product-img');
            productImg.setAttribute('src', product.img);

            const productRightContent = document.createElement('div');
            productRightContent.setAttribute('class', 'product-right-content');

            const productDescr = document.createElement('p');
            productDescr.setAttribute('class', 'product-descr');
            productDescr.textContent = product.description;

            const addToCartButton = document.createElement('button');
            addToCartButton.setAttribute('class', 'add-to-chart-button');
            addToCartButton.textContent = '+';
            addToCartButton.addEventListener("click", function() {
                addProductToChart(product);
            });

            productRightContent.appendChild(productDescr);
            productRightContent.appendChild(addToCartButton);

            productDiv.appendChild(productName);
            productDiv.appendChild(productImg);
            productDiv.appendChild(productRightContent);

            textilienSection.appendChild(productDiv);
        });


        /*Alben*/
        const alben = data.alben;
        const albenSection = document.getElementById('alben');
        alben.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.setAttribute('class', 'product');

            const productName = document.createElement('h3');
            productName.setAttribute('class', 'product-headline');
            productName.textContent = product.name;

            const productImg = document.createElement('img');
            productImg.setAttribute('class', 'product-img');
            productImg.setAttribute('src', product.img);

            const productRightContent = document.createElement('div');
            productRightContent.setAttribute('class', 'product-right-content');

            const productDescr = document.createElement('p');
            productDescr.setAttribute('class', 'product-descr');
            productDescr.textContent = product.description;

            const addToCartButton = document.createElement('button');
            addToCartButton.setAttribute('class', 'add-to-chart-button');
            addToCartButton.textContent = '+';
            addToCartButton.addEventListener("click", function() {
                addProductToChart(product);
            });

            productRightContent.appendChild(productDescr);
            productRightContent.appendChild(addToCartButton);

            productDiv.appendChild(productName);
            productDiv.appendChild(productImg);
            productDiv.appendChild(productRightContent);
    
            albenSection.appendChild(productDiv);
        });

        /*Sonstiges*/
        const sonstiges = data.sonstiges;
        const sonstigesSection = document.getElementById('sonstiges');
        sonstiges.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.setAttribute('class', 'product');

            const productName = document.createElement('h3');
            productName.setAttribute('class', 'product-headline');
            productName.textContent = product.name;

            const productImg = document.createElement('img');
            productImg.setAttribute('class', 'product-img');
            productImg.setAttribute('src', product.img);

            const productRightContent = document.createElement('div');
            productRightContent.setAttribute('class', 'product-right-content');

            const productDescr = document.createElement('p');
            productDescr.setAttribute('class', 'product-descr');
            productDescr.textContent = product.description;

            const addToCartButton = document.createElement('button');
            addToCartButton.setAttribute('class', 'add-to-chart-button');
            addToCartButton.textContent = '+';
            addToCartButton.addEventListener("click", function() {
                addProductToChart(product);
            });

            productRightContent.appendChild(productDescr);
            productRightContent.appendChild(addToCartButton);

            productDiv.appendChild(productName);
            productDiv.appendChild(productImg);
            productDiv.appendChild(productRightContent);

            sonstigesSection.appendChild(productDiv);
        });

        /* Events */
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("expandedImg");
        const images = document.querySelectorAll(".product-img");
        images.forEach(image => {
            image.addEventListener("click", function() {
                console.log("image clicked");
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });
    
        const closeBtn = document.querySelector(".close");
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }).catch(error => {
      console.error('Fehler beim Laden der Daten: ', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

function addProductToChart(prduct) {
    console.log("Product " + prduct.name + " added to chart");
    // id mit php in chart.csv schreiben
}

