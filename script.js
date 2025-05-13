// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Network Background
  initNetworkBackground()

  // Mobile Menu
  initMobileMenu()

  // Scroll Header
  initScrollHeader()

  // Animated Text
  initAnimatedText()

  // Projects Horizontal Scrolling
  initProjectsScroll()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Scroll animations
  initScrollAnimations()

  // Add experience timeline animation
  initExperienceTimeline()
})

// Network Background
function initNetworkBackground() {
  const canvas = document.getElementById("network-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  setCanvasSize()

  // Particle settings
  const particlesArray = []
  let numberOfParticles = getParticleCountByScreenSize()
  const mouseRadius = 100

  // Mouse position
  const mouse = {
    x: null,
    y: null,
  }

  // Handle mouse move
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  // Handle mouse leave
  window.addEventListener("mouseleave", () => {
    mouse.x = null
    mouse.y = null
  })

  // Handle window resize
  let resizeTimeout = null
  window.addEventListener("resize", () => {
    // Clear previous timeout
    if (resizeTimeout) clearTimeout(resizeTimeout)

    // Set new timeout to avoid multiple resize events
    resizeTimeout = setTimeout(() => {
      setCanvasSize()
      numberOfParticles = getParticleCountByScreenSize()
      init()
    }, 250)
  })

  // Function to determine particle count based on screen size
  function getParticleCountByScreenSize() {
    const width = window.innerWidth

    if (width <= 480) {
      return 30 // For very small mobile screens
    } else if (width <= 768) {
      return 50 // For mobile screens
    } else if (width <= 1024) {
      return 75 // For tablets
    } else {
      return 100 // For desktops
    }
  }

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.baseSize = this.size
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = this.getRandomColor(0.5)
      this.baseColor = this.color
    }

    getRandomColor(alpha) {
      const colors = [
        `rgba(147, 51, 234, ${alpha})`, // Purple
        `rgba(236, 72, 153, ${alpha})`, // Pink
        `rgba(59, 130, 246, ${alpha})`, // Blue
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      // Move particles
      this.x += this.speedX
      this.y += this.speedY

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          // Change color and size when near mouse
          this.color = this.getRandomColor(1)
          this.size = this.baseSize * 2

          // Move away from mouse
          const angle = Math.atan2(dy, dx)
          const force = (mouseRadius - distance) / mouseRadius
          this.x -= Math.cos(angle) * force * 3
          this.y -= Math.sin(angle) * force * 3
        } else {
          // Return to original state
          this.color = this.baseColor
          this.size = this.baseSize
        }
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  // Initialize particles
  function init() {
    particlesArray.length = 0
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }
  }

  // Connect particles with lines
  function connect() {
    // Adjust connection distance based on screen size
    const connectionDistance = window.innerWidth <= 768 ? 100 : 150

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          // Draw line between particles
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionDistance})`
          ctx.lineWidth = 1
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    // Connect particles
    connect()

    requestAnimationFrame(animate)
  }

  // Initialize and start animation
  init()
  animate()
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a")

  menuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileNav.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })
}

// Scroll Header
function initScrollHeader() {
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Animated Text
function initAnimatedText() {
  const text = document.getElementById("animated-text")
  if (!text) return

  const originalText = text.innerText
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  let interval = null
  let iteration = 0

  const startAnimation = () => {
    clearInterval(interval)

    interval = setInterval(() => {
      text.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("")

      if (iteration >= originalText.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)
  }

  // Start animation on page load only
  startAnimation()
}

// Projects Horizontal Scrolling
function initProjectsScroll() {
  const projectsWrapper = document.querySelector(".projects-wrapper")
  const projectGrid = document.querySelector(".project-grid")
  const paginationDotsContainer = document.querySelector(".pagination-dots")
  const prevButton = document.querySelector(".project-nav.prev")
  const nextButton = document.querySelector(".project-nav.next")

  if (!projectsWrapper || !projectGrid || !paginationDotsContainer) return

  const projectCards = document.querySelectorAll(".project-card")
  if (projectCards.length === 0) return

  // Store initial values
  let cardWidth = projectCards[0].offsetWidth
  const cardGap = 64 // This should match the gap in CSS (4rem)
  let wrapperWidth = projectsWrapper.offsetWidth

  // Calculate how many cards can be visible at once
  const visibleCards = 1.5 // Show 1.5 cards at a time

  // Calculate scroll amount for each step (half a card)
  let scrollStep = cardWidth / 2

  // Calculate total number of steps and pages
  let totalSteps = projectCards.length * 2 - 1 // -1 because we start at 0
  let totalPages = Math.ceil(totalSteps / 2) // Convert steps to pages

  // Function to recalculate dimensions
  function recalculateDimensions() {
    // Get current dimensions
    cardWidth = projectCards[0].offsetWidth
    wrapperWidth = projectsWrapper.offsetWidth

    // Recalculate scroll step
    scrollStep = cardWidth / 2

    // Recalculate total steps and pages
    totalSteps = projectCards.length * 2 - 1
    totalPages = Math.ceil(totalSteps / 2)

    // Update pagination dots
    updatePaginationDots()

    // Update current position
    const currentStep = getCurrentStep()
    updateActiveDot(Math.floor(currentStep / 2))
    updateNavButtons(currentStep)
  }

  // Function to update pagination dots
  function updatePaginationDots() {
    // Clear existing dots
    paginationDotsContainer.innerHTML = ""

    // Create pagination dots
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (i === 0) dot.classList.add("active")
      dot.dataset.index = i
      paginationDotsContainer.appendChild(dot)

      dot.addEventListener("click", () => {
        scrollToPage(i)
      })
    }
  }

  // Initialize pagination dots
  updatePaginationDots()

  // Navigation buttons
  prevButton.addEventListener("click", () => {
    const currentStep = getCurrentStep()
    if (currentStep > 0) {
      scrollToStep(currentStep - 1)
    }
  })

  nextButton.addEventListener("click", () => {
    const currentStep = getCurrentStep()
    if (currentStep < totalSteps) {
      scrollToStep(currentStep + 1)
    }
  })

  // Scroll event to update active dot
  projectsWrapper.addEventListener("scroll", () => {
    const currentStep = getCurrentStep()
    const currentPage = Math.floor(currentStep / 2)
    updateActiveDot(currentPage)
    updateNavButtons(currentStep)
  })

  // Get current step based on scroll position
  function getCurrentStep() {
    const scrollLeft = projectsWrapper.scrollLeft
    return Math.round(scrollLeft / scrollStep)
  }

  // Scroll to specific step
  function scrollToStep(stepIndex) {
    projectsWrapper.scrollLeft = stepIndex * scrollStep
    const currentPage = Math.floor(stepIndex / 2)
    updateActiveDot(currentPage)
    updateNavButtons(stepIndex)
  }

  // Scroll to specific page (each page is 2 steps)
  function scrollToPage(pageIndex) {
    scrollToStep(pageIndex * 2)
  }

  // Update active dot
  function updateActiveDot(pageIndex) {
    const dots = document.querySelectorAll(".pagination-dots .dot")
    dots.forEach((dot, index) => {
      if (index === pageIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Show/hide navigation buttons based on scroll position
  function updateNavButtons(currentStep) {
    prevButton.style.opacity = currentStep === 0 ? "0.3" : "0.7"
    nextButton.style.opacity = currentStep >= totalSteps ? "0.3" : "0.7"
  }

  // Initialize
  updateNavButtons(0)

  // Handle window resize - use a debounced version to avoid constant reloads
  let resizeTimeout
  window.addEventListener("resize", () => {
    // Clear the timeout if it exists
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    // Set a new timeout
    resizeTimeout = setTimeout(() => {
      // Recalculate dimensions without reloading the page
      recalculateDimensions()
    }, 250) // 250ms delay
  })

  // Add touch swipe support for mobile
  let touchStartX = 0
  let touchEndX = 0

  projectsWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    false,
  )

  projectsWrapper.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    const currentStep = getCurrentStep()
    const swipeThreshold = 50 // Minimum distance to register as a swipe

    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left - go to next
      if (currentStep < totalSteps) {
        scrollToStep(currentStep + 1)
      }
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right - go to previous
      if (currentStep > 0) {
        scrollToStep(currentStep - 1)
      }
    }
  }
}

// Scroll Animations
function initScrollAnimations() {
  const sections = document.querySelectorAll("section")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    section.style.opacity = "0"
    observer.observe(section)
  })
}

// Add this new function for experience timeline animation
function initExperienceTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")

          // Add a slight delay for each item to create a cascade effect
          const index = Array.from(timelineItems).indexOf(entry.target)
          entry.target.style.animationDelay = `${index * 0.2}s`
        }
      })
    },
    { threshold: 0.2 },
  )

  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    observer.observe(item)
  })
}
