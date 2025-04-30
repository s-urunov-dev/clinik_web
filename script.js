document.addEventListener('DOMContentLoaded', function () {
	// Back to Top Button
	const backToTopButton = document.getElementById('back-to-top')

	if (backToTopButton) {
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 300) {
				backToTopButton.classList.add('active')
			} else {
				backToTopButton.classList.remove('active')
			}
		})

		backToTopButton.addEventListener('click', function (e) {
			e.preventDefault()
			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}

	// Testimonial Slider
	const testimonialSlider = document.getElementById('testimonial-slider')

	if (testimonialSlider) {
		const testimonials = testimonialSlider.querySelectorAll('.testimonial-card')
		const dots = document.querySelectorAll('.dot')
		const prevButton = document.getElementById('prev-testimonial')
		const nextButton = document.getElementById('next-testimonial')
		let currentIndex = 0

		function showTestimonial(index) {
			testimonials.forEach(testimonial =>
				testimonial.classList.remove('active')
			)
			dots.forEach(dot => dot.classList.remove('active'))

			testimonials[index].classList.add('active')
			dots[index].classList.add('active')
			currentIndex = index
		}

		if (prevButton && nextButton) {
			prevButton.addEventListener('click', function () {
				let newIndex = currentIndex - 1
				if (newIndex < 0) newIndex = testimonials.length - 1
				showTestimonial(newIndex)
			})

			nextButton.addEventListener('click', function () {
				let newIndex = currentIndex + 1
				if (newIndex >= testimonials.length) newIndex = 0
				showTestimonial(newIndex)
			})
		}

		dots.forEach(dot => {
			dot.addEventListener('click', function () {
				const index = parseInt(this.getAttribute('data-index'))
				showTestimonial(index)
			})
		})

		// Auto slide
		setInterval(function () {
			let newIndex = currentIndex + 1
			if (newIndex >= testimonials.length) newIndex = 0
			showTestimonial(newIndex)
		}, 5000)
	}

	// Tabs
	const tabButtons = document.querySelectorAll('.tab-btn')

	if (tabButtons.length > 0) {
		tabButtons.forEach(button => {
			button.addEventListener('click', function () {
				const tabId = this.getAttribute('data-tab')

				// Remove active class from all tabs and panes
				document
					.querySelectorAll('.tab-btn')
					.forEach(btn => btn.classList.remove('active'))
				document
					.querySelectorAll('.tab-pane')
					.forEach(pane => pane.classList.remove('active'))

				// Add active class to current tab and pane
				this.classList.add('active')
				document.getElementById(tabId).classList.add('active')
			})
		})
	}

	// Gallery Image Change
	function changeImage(src) {
		const mainImage = document.getElementById('main-gallery-image')
		if (mainImage) {
			mainImage.src = src

			// Update active thumbnail
			const thumbnails = document.querySelectorAll('.gallery-thumbnails img')
			thumbnails.forEach(thumb => {
				if (thumb.getAttribute('src') === src) {
					thumb.classList.add('active')
				} else {
					thumb.classList.remove('active')
				}
			})
		}
	}

	// Make the changeImage function globally available
	window.changeImage = changeImage

	// Appointment Form Submission
	const appointmentForm = document.getElementById('appointment-form')

	if (appointmentForm) {
		appointmentForm.addEventListener('submit', function (e) {
			e.preventDefault()

			// Get form values
			const name = document.getElementById('appointment-name').value
			const phone = document.getElementById('appointment-phone').value
			const email = document.getElementById('appointment-email').value
			const service = document.getElementById('appointment-service').value
			const doctor = document.getElementById('appointment-doctor').value
			const date = document.getElementById('appointment-date').value
			const time = document.getElementById('appointment-time').value

			// Simple validation
			if (!name || !phone || !email || !service || !doctor || !date || !time) {
				alert('Please fill in all required fields')
				return
			}

			// Show success message
			alert(
				'Appointment booked successfully! We will contact you shortly to confirm your appointment.'
			)

			// Reset form
			appointmentForm.reset()
		})
	}

	// Dynamic Service Selection
	const serviceSelect = document.getElementById('appointment-service')
	const doctorSelect = document.getElementById('appointment-doctor')

	if (serviceSelect && doctorSelect) {
		serviceSelect.addEventListener('change', function () {
			const selectedService = this.value

			// Reset doctor options
			doctorSelect.innerHTML = '<option value="">Select a doctor</option>'

			// Add relevant doctors based on selected service
			if (selectedService === 'cardiology') {
				addDoctorOption('dr-williams', 'Dr. Robert Williams')
			} else if (selectedService === 'neurology') {
				addDoctorOption('dr-lee', 'Dr. Jennifer Lee')
			} else if (selectedService === 'pulmonology') {
				addDoctorOption('dr-chen', 'Dr. Michael Chen')
			} else if (selectedService === 'general-medicine') {
				addDoctorOption('dr-johnson', 'Dr. Sarah Johnson')
				addDoctorOption('dr-williams', 'Dr. Robert Williams')
			} else if (
				selectedService === 'diagnostic-imaging' ||
				selectedService === 'laboratory-services'
			) {
				addDoctorOption('dr-johnson', 'Dr. Sarah Johnson')
			}
		})

		function addDoctorOption(value, text) {
			const option = document.createElement('option')
			option.value = value
			option.textContent = text
			doctorSelect.appendChild(option)
		}
	}

	// Newsletter Form Submission
	const newsletterForm = document.querySelector('.newsletter-form')

	if (newsletterForm) {
		newsletterForm.addEventListener('submit', function (e) {
			e.preventDefault()

			const emailInput = this.querySelector('input[type="email"]')
			const email = emailInput.value

			if (!email) {
				alert('Please enter your email address')
				return
			}

			// Show success message
			alert('Thank you for subscribing to our newsletter!')

			// Reset form
			emailInput.value = ''
		})
	}

	// Search Functionality
	const searchInput = document.getElementById('search-input')
	const searchBtn = document.querySelector('.search-btn')

	if (searchInput && searchBtn) {
		searchBtn.addEventListener('click', function () {
			const searchTerm = searchInput.value.trim()

			if (!searchTerm) {
				alert('Please enter a search term')
				return
			}

			// In a real application, this would redirect to search results page
			window.location.href =
				'search-results.html?q=' + encodeURIComponent(searchTerm)
		})

		// Allow search on Enter key
		searchInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				searchBtn.click()
			}
		})
	}

	// Mobile Menu Toggle (for smaller screens)
	const mobileMenuBtn = document.createElement('button')
	mobileMenuBtn.className = 'mobile-menu-btn'
	mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

	const header = document.querySelector('header')

	if (header) {
		if (window.innerWidth < 768) {
			header.querySelector('.container').appendChild(mobileMenuBtn)

			mobileMenuBtn.addEventListener('click', function () {
				const topLinks = document.querySelector('.top-links')
				topLinks.classList.toggle('active')
			})
		}
	}

	// Date Validation for Appointment
	const dateInput = document.getElementById('appointment-date')

	if (dateInput) {
		// Set min date to today
		const today = new Date()
		const dd = String(today.getDate()).padStart(2, '0')
		const mm = String(today.getMonth() + 1).padStart(2, '0')
		const yyyy = today.getFullYear()

		const todayString = yyyy + '-' + mm + '-' + dd
		dateInput.setAttribute('min', todayString)

		// Disable weekends
		dateInput.addEventListener('input', function () {
			const selectedDate = new Date(this.value)
			const day = selectedDate.getDay()

			// 0 is Sunday, 6 is Saturday
			if (day === 0 || day === 6) {
				alert(
					'Weekends are not available for appointments. Please select a weekday.'
				)
				this.value = ''
			}
		})
	}

	// FAQ Toggle
	const faqItems = document.querySelectorAll('.faq-item')

	if (faqItems.length > 0) {
		faqItems.forEach(item => {
			const question = item.querySelector('.faq-question')
			const answer = item.querySelector('.faq-answer')
			const toggle = item.querySelector('.faq-toggle')

			question.addEventListener('click', function () {
				answer.classList.toggle('active')
				toggle.innerHTML = answer.classList.contains('active')
					? '<i class="fas fa-minus"></i>'
					: '<i class="fas fa-plus"></i>'
			})
		})
	}

	// Handle URL parameters
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
		const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
		const results = regex.exec(location.search)
		return results === null
			? ''
			: decodeURIComponent(results[1].replace(/\+/g, ' '))
	}

	// Handle specialty page
	const specialtyParam = getUrlParameter('specialty')
	const specialtyTitle = document.getElementById('specialty-title')

	if (specialtyParam && specialtyTitle) {
		// Capitalize first letter
		const formattedSpecialty =
			specialtyParam.charAt(0).toUpperCase() + specialtyParam.slice(1)
		specialtyTitle.textContent = formattedSpecialty
		document.title = formattedSpecialty + ' Specialists - MediFind'
	}

	// Placeholder images for development
	function generatePlaceholderImage(width, height, text) {
		const canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		const ctx = canvas.getContext('2d')

		// Background
		ctx.fillStyle = '#f5f5f5'
		ctx.fillRect(0, 0, width, height)

		// Border
		ctx.strokeStyle = '#ddd'
		ctx.lineWidth = 2
		ctx.strokeRect(0, 0, width, height)

		// Text
		ctx.fillStyle = '#999'
		ctx.font = 'bold 16px Arial'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(text || `${width}x${height}`, width / 2, height / 2)

		return canvas.toDataURL('image/png')
	}

	// Generate placeholder images for development
	window.addEventListener('load', function () {
		// Only run this in development environment
		if (
			window.location.hostname === 'localhost' ||
			window.location.hostname === '127.0.0.1'
		) {
			const images = document.querySelectorAll('img')

			images.forEach(img => {
				if (!img.src || img.src.includes('placeholder') || img.src === '') {
					const width = img.width || 300
					const height = img.height || 200
					const alt = img.alt || 'Placeholder'

					img.src = generatePlaceholderImage(width, height, alt)
				}
			})
		}
	})
})
