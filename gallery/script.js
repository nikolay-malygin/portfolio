// initialize all Bootstrap popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// To top btn
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};

// Load gallery-images from folder
let hrefsArray = [];
const imagesContainer = document.getElementById('images_container');
const shuffleBtn = document.getElementById('shuffle-btn');

document.addEventListener('DOMContentLoaded', async () =>
{
    try {
        let response = await fetch('https://api.github.com/repositories/673809542/contents/gallery/images');
        let data = await response.json();

        for(let i = 0; i < data.length; i++) {
            hrefsArray.push(data[i]['download_url']);
        }

        hrefsArray = shuffleArray(hrefsArray);
        appendImages(hrefsArray);
    }
    catch (error) {
        console.error("Error: " + error);
    }
});

shuffleBtn.onclick = () => {
    hrefsArray = shuffleArray(hrefsArray);
    cleanImagesContainer();
    appendImages(hrefsArray);
}

function cleanImagesContainer() {
    imagesContainer.innerHTML = '';
}

function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
}

function appendImages(hrefs) {
    for (let i = 0; i < hrefs.length; i++) {
        imagesContainer.innerHTML += `<div class="box"><img loading="lazy" src="${hrefs[i]}" alt="image"></div>`;
    }
}


// scroll to the bottom of the page
const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

scrollToBottomBtn.onclick = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollStep = totalHeight / 2800; // scroll speed (higher value = slower scroll)

    let currentScroll = 0;
    const intervalId = setInterval(() => {
        currentScroll += scrollStep;
        window.scrollTo(0, currentScroll);

        document.body.onclick = () => {
            clearInterval(intervalId);
        }
    }, 50);
};