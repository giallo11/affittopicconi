document.addEventListener('DOMContentLoaded', function() {
    const itemForm = document.getElementById('item-form');
    const itemList = document.getElementById('items');

    // Load items from localStorage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Render items
    function renderItems() {
        itemList.innerHTML = '';
        items.forEach(function(item, index) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <strong>${item.name}</strong> - Prezzo: ${item.price}€ - Durata: ${item.duration} ${item.durationUnit} - Data: ${item.date}
                <span class="remove-btn" data-index="${index}">&times;</span>
            `;
            itemList.appendChild(itemElement);
        });
    }

    renderItems();

    // Handle form submission
    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemNameInput = document.getElementById('item-name');
        const itemPriceInput = document.getElementById('item-price');
        const itemDurationInput = document.getElementById('item-duration');
        const durationUnitSelect = document.getElementById('duration-unit');

        const itemName = itemNameInput.value.trim();
        const itemPrice = parseFloat(itemPriceInput.value);
        const itemDuration = parseInt(itemDurationInput.value);
        const durationUnit = durationUnitSelect.value;

        if (itemName && !isNaN(itemPrice) && !isNaN(itemDuration) && durationUnit) {
            const newItem = {
                name: itemName,
                price: itemPrice,
                duration: itemDuration,
                durationUnit: durationUnit,
                date: new Date().toLocaleString() // Aggiungi la data di inserimento
            };

            items.push(newItem);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();

            itemNameInput.value = '';
            itemPriceInput.value = '';
            itemDurationInput.value = '';
            durationUnitSelect.selectedIndex = 0;
        } else {
            alert('Inserisci tutte le informazioni correttamente.');
        }
    });

    // Handle item removal
    itemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        }
    });
});
