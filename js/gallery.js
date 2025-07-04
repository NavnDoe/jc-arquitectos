const images = [
    {
        src: 'images/gallery/gallery1.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery2.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery3.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery4.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery5.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery6.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery7.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery8.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
    {
        src: 'images/gallery/gallery9.jpg',
        title: 'Casa Prueba XD',
        alt: 'Render casa prueba'
    },
];

const galleryGrid = document.getElementById('galleryGrid');

const popup = document.getElementById('popup')
const popupImage = document.getElementById('popupImage')
const popupTitle = document.getElementById('popupTitle')

const closeBtn = document.getElementById('closeBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

let currentIndex = 0;
let galleryItems = [];

// Generar galeria
const generateGallery = () => {
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div')
        galleryItem.className = 'gallery-item'
        galleryItem.setAttribute('data-index', index)

        const galleryImg = document.createElement('img')
        galleryImg.src = image.src;
        galleryImg.alt = image.alt;

        const titleContainer = document.createElement('div');
        titleContainer.className = 'image-title';

        const title = document.createElement('h3');
        title.textContent = image.title;

        titleContainer.appendChild(title);
        galleryItem.appendChild(galleryImg);
        galleryItem.appendChild(titleContainer);

        galleryGrid.appendChild(galleryItem)
    })

    galleryItems = document.querySelectorAll('.gallery-item')

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openPopup(index))
    });
};

const openPopup = (index) => {
    currentIndex = index;
    updatePopupContent();
    popup.classList.add('active');
    document.body.style.overflow = 'auto';
};

const closePopup = () => {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
};

const updatePopupContent = () => {
    const image = images[currentIndex];
    popupImage.src = image.src;
    popupTitle.textContent = image.title;
};

const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePopupContent()
}

const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updatePopupContent()
}


// Event listeners
closeBtn.addEventListener('click', closePopup);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup();
    }
})

// Navegacion con el teclado
document.addEventListener('keydown', (e) => {
    if (!popup.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closePopup()
            break;
        case 'ArrowLeft':
            prevImage()
            break;
        case 'ArrowRight':
            nextImage()
            break;
    }
});

// Navegacion en dispositivo movil
let startX = 0;
let endX = 0;

popup.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

popup.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

const handleSwipe = () => {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextImage();
        }
        else {
            prevImage();
        }
    }
};

// Inicia la galeria cuando la pagina se carga
document.addEventListener('DOMContentLoaded', generateGallery);

