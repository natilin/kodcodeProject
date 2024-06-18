function scrollToBottom() {
    document.getElementById('bottom').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.testimonials-wrapper');
    const testimonials = document.querySelectorAll('.testimonials-carousel .testimonial');
    const totalTestimonials = testimonials.length;
    const visibleTestimonials = 3; // Number of testimonials visible at one time
    let currentIndex = 0;

    function showNextTestimonials() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        wrapper.style.transform = `translateX(-${currentIndex * (100 / visibleTestimonials)}%)`;
    }

    setInterval(showNextTestimonials, 7000); // Change testimonial every 5 seconds

    window.addEventListener('scroll', function() {
        const footer = document.querySelector('footer');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { // Adjusted for smoother transition
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    });
});
