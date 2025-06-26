  $(document).ready(function() {
            // Smooth scrolling for navigation links
            $('a[href^="#"]').on('click', function(event) {
                var target = $(this.getAttribute('href'));
                if( target.length ) {
                    event.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                }
            });

            // Navbar background on scroll
            $(window).scroll(function() {
                if ($(window).scrollTop() > 50) {
                    $('.navbar').addClass('scrolled');
                } else {
                    $('.navbar').removeClass('scrolled');
                }
            });

            // Animate elements on scroll
            function animateOnScroll() {
                $('.fade-in-up').each(function() {
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();

                    if (elementBottom > viewportTop && elementTop < viewportBottom) {
                        $(this).addClass('animate');
                    }
                });
            }

            $(window).on('scroll', animateOnScroll);
            animateOnScroll(); // Run on page load

            // Form submissions
            $('#contactForm').on('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
            });

            $('#consultationForm').on('submit', function(e) {
                e.preventDefault();
                alert('Thank you! We\'ll contact you within 24 hours to schedule your free consultation.');
                $('#consultationModal').modal('hide');
                this.reset();
            });

            // Counter animation
            function animateCounters() {
                $('.stat-number').each(function() {
                    var $this = $(this);
                    var countTo = $this.text().replace(/[^0-9]/g, '');
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
                            $this.text(this.countNum + suffix);
                        }
                    });
                });
            }

            // Trigger counter animation when about section is visible
            var counterAnimated = false;
            $(window).scroll(function() {
                var aboutSection = $('#about').offset().top;
                var scrollTop = $(window).scrollTop();
                var windowHeight = $(window).height();

                if (scrollTop + windowHeight > aboutSection && !counterAnimated) {
                    animateCounters();
                    counterAnimated = true;
                }
            });
        });