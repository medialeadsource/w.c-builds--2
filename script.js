const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.getElementById("navMenu")

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  const spans = mobileMenuToggle.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(7px, 7px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = mobileMenuToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

const galleryItems = document.querySelectorAll(".gallery-item")
const allGalleryImages = Array.from(galleryItems).map((item) => item.getAttribute("href"))
let lightboxOpen = false
let currentImageIndex = 0

galleryItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()
    currentImageIndex = index
    const imgSrc = item.getAttribute("href")
    openLightbox(imgSrc, index)
  })
})

function openLightbox(imgSrc, index) {
  if (lightboxOpen) return

  lightboxOpen = true
  currentImageIndex = index

  const lightbox = document.createElement("div")
  lightbox.className = "lightbox"
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `

  const img = document.createElement("img")
  img.src = imgSrc
  img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        animation: scaleIn 0.3s ease;
    `

  const closeBtn = document.createElement("button")
  closeBtn.innerHTML = "&times;"
  closeBtn.setAttribute("aria-label", "Close gallery")
  closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 48px;
        cursor: pointer;
        z-index: 10001;
        transition: transform 0.2s ease;
    `

  const prevBtn = document.createElement("button")
  prevBtn.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
  prevBtn.setAttribute("aria-label", "Previous image")
  prevBtn.style.cssText = `
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(200, 164, 93, 0.9);
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
    `

  const nextBtn = document.createElement("button")
  nextBtn.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
  nextBtn.setAttribute("aria-label", "Next image")
  nextBtn.style.cssText = `
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(200, 164, 93, 0.9);
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
    `

  const counter = document.createElement("div")
  counter.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 10001;
    `
  counter.textContent = `${currentImageIndex + 1} / ${allGalleryImages.length}`

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.transform = "scale(1.2)"
  })

  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.transform = "scale(1)"
  })

  prevBtn.addEventListener("mouseenter", () => {
    prevBtn.style.transform = "translateY(-50%) scale(1.1)"
  })

  prevBtn.addEventListener("mouseleave", () => {
    prevBtn.style.transform = "translateY(-50%) scale(1)"
  })

  nextBtn.addEventListener("mouseenter", () => {
    nextBtn.style.transform = "translateY(-50%) scale(1.1)"
  })

  nextBtn.addEventListener("mouseleave", () => {
    nextBtn.style.transform = "translateY(-50%) scale(1)"
  })

  const navigateImage = (direction) => {
    if (direction === "next") {
      currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length
    } else {
      currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length
    }

    img.style.animation = "scaleIn 0.3s ease"
    img.src = allGalleryImages[currentImageIndex]
    counter.textContent = `${currentImageIndex + 1} / ${allGalleryImages.length}`
  }

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    navigateImage("prev")
  })

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    navigateImage("next")
  })

  lightbox.appendChild(img)
  lightbox.appendChild(closeBtn)
  lightbox.appendChild(prevBtn)
  lightbox.appendChild(nextBtn)
  lightbox.appendChild(counter)
  document.body.appendChild(lightbox)

  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `
  document.head.appendChild(style)

  const closeLightbox = () => {
    lightbox.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(lightbox)
      document.head.removeChild(style)
      lightboxOpen = false
    }, 300)
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  closeBtn.addEventListener("click", closeLightbox)

  const keyHandler = (e) => {
    if (e.key === "Escape") {
      closeLightbox()
      document.removeEventListener("keydown", keyHandler)
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev")
    } else if (e.key === "ArrowRight") {
      navigateImage("next")
    }
  }
  document.addEventListener("keydown", keyHandler)
}
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  console.log("[v0] Form submitted with data:", data)

  const successMessage = document.createElement("div")
  successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #C8A45D;
        color: white;
        padding: 30px 50px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.5s ease;
    `
  successMessage.innerHTML = `
        <div style="margin-bottom: 10px;">✓</div>
        <div>Thank you for your inquiry!</div>
        <div style="font-size: 16px; font-weight: 400; margin-top: 10px;">We'll contact you within 24 hours.</div>
    `

  document.body.appendChild(successMessage)


  contactForm.reset()


  setTimeout(() => {
    successMessage.style.animation = "slideOut 0.5s ease"
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 500)
  }, 4000)

  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from { transform: translate(-50%, -60%); opacity: 0; }
            to { transform: translate(-50%, -50%); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translate(-50%, -50%); opacity: 1; }
            to { transform: translate(-50%, -40%); opacity: 0; }
        }
    `
  document.head.appendChild(style)
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")

    if (!href || href === "#") return

    if (href.startsWith("http") || href.startsWith("https") || href.startsWith("mailto")) return

    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

const animationObserverOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
}

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      animationObserver.unobserve(entry.target)
    }
  })
}, animationObserverOptions)

const elementsToAnimate = document.querySelectorAll(`
  .hero-content,
  .section-title,
  .section-subtitle,
  .feature-card,
  .process-step,
  .step-content img,
  .gallery-item,
  .comparison-slider,
  .design-vision-text,
  .contact-content,
  .final-cta-content
`)

elementsToAnimate.forEach((el, index) => {

  if (el.classList.contains("feature-card")) {
    el.style.transitionDelay = `${index * 0.1}s`
  } else if (el.classList.contains("gallery-item")) {
    el.style.transitionDelay = `${index * 0.08}s`
  } else if (el.classList.contains("process-step")) {
    el.style.transitionDelay = `${index * 0.15}s`
  }

  animationObserver.observe(el)
})


const galleryGrid = document.querySelector(".gallery-grid")

if (galleryGrid) {
  const scrollStep = 400

  galleryGrid.addEventListener("scroll", () => {
    const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth

    if (galleryGrid.scrollLeft <= 0) {
      galleryGrid.style.setProperty("--prev-arrow-enabled", "false")
    } else {
      galleryGrid.style.setProperty("--prev-arrow-enabled", "true")
    }

    if (galleryGrid.scrollLeft >= maxScroll - 10) {
      galleryGrid.style.setProperty("--next-arrow-enabled", "false")
    } else {
      galleryGrid.style.setProperty("--next-arrow-enabled", "true")
    }
  })
}

const comparisonSlider = document.getElementById("comparisonSlider")
const comparisonDivider = document.getElementById("comparisonDivider")

if (comparisonSlider && comparisonDivider) {
  const container = comparisonSlider.querySelector(".comparison-container")
  const afterImage = comparisonSlider.querySelector(".comparison-image.after")
  let isDragging = false

  function updateSlider(x) {
    const rect = container.getBoundingClientRect()
    const offsetX = x - rect.left
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100))

    comparisonDivider.style.left = `${percentage}%`
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`
  }


  comparisonDivider.addEventListener("mousedown", (e) => {
    isDragging = true
    e.preventDefault()
  })

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      updateSlider(e.clientX)
    }
  })

  document.addEventListener("mouseup", () => {
    isDragging = false
  })


  comparisonDivider.addEventListener("touchstart", (e) => {
    isDragging = true
    e.preventDefault()
  })

  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0]
      updateSlider(touch.clientX)
    }
  })

  document.addEventListener("touchend", () => {
    isDragging = false
  })

  container.addEventListener("click", (e) => {
    if (e.target !== comparisonDivider && !comparisonDivider.contains(e.target)) {
      updateSlider(e.clientX)
    }
  })
}
