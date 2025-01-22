document.addEventListener('DOMContentLoaded', () => {
    const totalFrames = 100;
    const frameFolder = 'frames'; 
    const frameExtension = 'png'; 

    const frameNames = [...Array(totalFrames).keys()].map(i => 
        `${frameFolder}/${String(i + 1).padStart(4, '0')}.${frameExtension}`
    );

    const frameCache = [];

    const preloadFrames = () => {
        frameNames.forEach(src => {
            const img = new Image();
            img.src = src;
            frameCache.push(img); 
        });
    };

    preloadFrames();

    const updateBackgroundOnScroll = () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / scrollHeight;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(scrollFraction * totalFrames))
        );

        document.body.style.backgroundImage = `url('${frameNames[frameIndex]}')`;
    };

    window.addEventListener('scroll', updateBackgroundOnScroll);

    const popup = document.getElementById('popup');
    const popupScrollableContent = document.getElementById('popupScrollableContent');
    const closePopup = document.getElementById('closePopup');
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');

    const projectDetails = {
        5: [
            { img: 'skull.jpg', text: "'Out of the Box' -- created using sanded beer and pop cans, cut, folded, and adhered using hot glue." },
            { img: 'lino.jpg', text: "'Enlightened' -- executed using Linocut techniques and red and yellow ink." },
            { img: 'batman.jpg', text: 'Batman Who Laughs -- using Copic markers and coloured pencils.' },
            { img: 'wow.jpg', text: 'WowGr8 of Earthgang -- using Copic markers and coloured pencils.' },
            { img: 'rick.png', text: 'Rick Sanchez -- made using Blender. Honed my skills in 3D modelling and the Shading functionalities of Blender.' },
            { img: 'oar.jpg', text: 'Scene from Algonquin Park Camping Trip -- Acrylic paint on maple oar.' },
            { img: 'mask.jpg', text: "Venetian Commedia Dell'Arte Mask -- made using the traditional methods: created a plaster positive of my face, where I then added exaggerated clay facial features, followed by a plaster negative, paper mache, and painting/decor." }
        ],
        6: [
            { img: 'placeholder.png', text: 'Details about Project 6, Image 1.' },
            { img: 'placeholder.png', text: 'Details about Project 6, Image 2.' },
            { img: 'placeholder.png', text: 'Details about Project 6, Image 3.' }
        ]
    };

    seeMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const details = projectDetails[projectId];

            popupScrollableContent.innerHTML = '';


            if (details) {
                details.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.classList.add('popup-item');
                    div.innerHTML = `
                        <img src="${item.img}" alt="Image ${index + 1}">
                        <p>${item.text}</p>
                    `;
                    popupScrollableContent.appendChild(div);
                });
            } else {
                popupScrollableContent.innerHTML = '<p>No details available.</p>';
            }

         
            popup.classList.remove('hidden');
        });
    });

    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });

    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });
    const toggleButton = document.getElementById("toggle-about");
    const fullText = document.getElementById("about-full");
    const snippetText = document.getElementById("about-snippet");
  
    toggleButton.addEventListener("click", () => {
      const isExpanded = !fullText.classList.contains("hidden");
      fullText.classList.toggle("hidden");
      snippetText.classList.toggle("hidden");
      toggleButton.textContent = isExpanded ? "See More ▼" : "See More ▲";
    });
    
});

