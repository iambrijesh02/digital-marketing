
        $(document).ready(function() {
            // Navbar scroll effect
            $(window).scroll(function() {
                if ($(window).scrollTop() > 50) {
                    $('.navbar').addClass('scrolled');
                } else {
                    $('.navbar').removeClass('scrolled');
                }
            });
            
            // Smooth scrolling for navigation links
            $('a[href^="#"]').on('click', function(event) {
                var target = $(this.getAttribute('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                }
            });
            
            // Animate on scroll
            function animateOnScroll() {
                $('.animate-on-scroll').each(function() {
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();
                    
                    if (elementBottom > viewportTop && elementTop < viewportBottom) {
                        $(this).addClass('animated');
                    }
                });
            }
            
            $(window).on('scroll resize', animateOnScroll);
            animateOnScroll(); // Initial check
            
            // Form submissions
            $('#heroForm, #contactForm').on('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                alert('Thank you for your message! We will get back to you within 24 hours.');
                
                // Reset form
                this.reset();
            });
            
            // Counter animation for stats
            function animateCounters() {
                $('.stat-number').each(function() {
                    var $this = $(this);
                    var countTo = parseInt($this.text().replace(/\D/g, ''));
                    var suffix = $this.text().replace(/[0-9]/g, '');
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum) + suffix);
                        },
                        complete: function() {
                            $this.text(countTo + suffix);
                        }
                    });
                });
            }
            
            // Trigger counter animation when about section is visible
            var counterAnimated = false;
            $(window).scroll(function() {
                if (!counterAnimated) {
                    var aboutSection = $('#about');
                    if (aboutSection.length) {
                        var aboutTop = aboutSection.offset().top;
                        var aboutBottom = aboutTop + aboutSection.outerHeight();
                        var viewportTop = $(window).scrollTop();
                        var viewportBottom = viewportTop + $(window).height();
                        
                        if (aboutBottom > viewportTop && aboutTop < viewportBottom) {
                            animateCounters();
                            counterAnimated = true;
                        }
                    }
                }
            });
            
            // Service card hover effects
            $('.service-card').hover(
                function() {
                    $(this).find('.service-icon').addClass('animate__animated animate__pulse');
                },
                function() {
                    $(this).find('.service-icon').removeClass('animate__animated animate__pulse');
                }
            );
            
            // Portfolio item hover effects
            $('.portfolio-item').hover(
                function() {
                    $(this).find('.portfolio-image').css('transform', 'scale(1.05)');
                },
                function() {
                    $(this).find('.portfolio-image').css('transform', 'scale(1)');
                }
            );
        });
        
        // Parallax effect for hero section
        $(window).scroll(function() {
            var scrolled = $(window).scrollTop();
            var parallax = $('.hero-section');
            var speed = scrolled * 0.5;
            
            parallax.css('background-position', 'center ' + speed + 'px');
        });
 