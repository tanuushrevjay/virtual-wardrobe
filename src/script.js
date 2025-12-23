let wardrobeItems = [];
let currentOutfit = "";

// Load saved outfits on page load
window.onload = displaySavedOutfits;

function addItem() {
    const name = document.getElementById("itemName").value;
    const category = document.getElementById("category").value;

    if (name.trim() === "") return;

    wardrobeItems.push({ name, category });
    document.getElementById("itemName").value = "";

    displayWardrobe();
}

function displayWardrobe() {
    const wardrobe = document.getElementById("wardrobe");
    wardrobe.innerHTML = "";

    wardrobeItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <strong>${item.name}</strong>
            <div class="category">${item.category}</div>
        `;
        wardrobe.appendChild(div);
    });
}

function generateOutfit() {
    const tops = wardrobeItems.filter(i => i.category === "Top");
    const bottoms = wardrobeItems.filter(i => i.category === "Bottom");
    const shoes = wardrobeItems.filter(i => i.category === "Shoes");

    if (tops.length && bottoms.length && shoes.length) {
        currentOutfit = `
            👕 ${randomItem(tops).name}<br>
            👖 ${randomItem(bottoms).name}<br>
            👟 ${randomItem(shoes).name}
        `;
        document.getElementById("outfitResult").innerHTML = currentOutfit;
    } else {
        document.getElementById("outfitResult").innerText =
            "Add at least a top, bottom, and shoes!";
    }
}

function saveOutfit() {
    const date = document.getElementById("outfitDate").value;
    if (!date || !currentOutfit) return;

    const outfits = JSON.parse(localStorage.getItem("outfits")) || {};
    outfits[date] = currentOutfit;

    localStorage.setItem("outfits", JSON.stringify(outfits));
    displaySavedOutfits();
}

function displaySavedOutfits() {
    const container = document.getElementById("savedOutfits");
    if (!container) return;

    container.innerHTML = "";
    const outfits = JSON.parse(localStorage.getItem("outfits")) || {};

    Object.keys(outfits).sort().forEach(date => {
        const div = document.createElement("div");
        div.className = "saved-card";
        div.innerHTML = `
            <strong>${date}</strong>
            <div>${outfits[date]}</div>
        `;
        container.appendChild(div);
    });
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}