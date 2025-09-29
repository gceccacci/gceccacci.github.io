document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ascii-video'); // use your existing div
  const totalFrames = asciiFrames.length;

  // Preprocess frames into strings
  const asciiFramesStr = asciiFrames.map(frame => frame.join('\n'));

  // Function to render a frame
  function renderFrame(index) {
    container.textContent = asciiFramesStr[index];
  }

  // Scroll-based animation
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(scrollPercent * totalFrames)
    );
    renderFrame(frameIndex);
  });

  // Initial render
  renderFrame(0);

  // --- Popup and "See More" logic (unchanged) ---
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

  closePopup.addEventListener('click', () => popup.classList.add('hidden'));
  window.addEventListener('click', (event) => {
    if (event.target === popup) popup.classList.add('hidden');
  });

  // About toggle
  const toggleButton = document.getElementById("toggle-about");
  const fullText = document.getElementById("about-full");
  const snippetText = document.getElementById("about-snippet");

  toggleButton.addEventListener("click", () => {
    const isExpanded = !fullText.classList.contains("hidden");
    fullText.classList.toggle("hidden");
    snippetText.classList.toggle("hidden");
    toggleButton.textContent = isExpanded ? "See More ▼" : "See More ▲";
  });
  let lastScrollY = window.scrollY;
  const headerContainer = document.querySelector('.header-container');

  window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
          // Scrolling down - hide the header
          headerContainer.classList.add('hidden-header');
      } else {
          // Scrolling up - show the header
          headerContainer.classList.remove('hidden-header');
      }

      lastScrollY = currentScrollY;
    });
});
