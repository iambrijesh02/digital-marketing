  
        // Counter Animation
        function animateCounters() {
            $('.counter').each(function() {
                const $this = $(this);
                const target = parseInt($this.data('target'));
                
                $({ counter: 0 }).animate({ counter: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.counter));
                    },
                    complete: function() {
                        $this.text(target);
                    }
                });
            });
        }

        // Scroll Animation
        function checkScroll() {
            $('.fade-in-up').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animate');
                }
            });
        }

        // Initialize animations
        $(document).ready(function() {
            // Check scroll on load
            checkScroll();
            
            // Check scroll on scroll
            $(window).scroll(function() {
                checkScroll();
            });
            
            // Animate counters when stats section is visible
            let countersAnimated = false;
            $(window).scroll(function() {
                const statsSection = $('.stats-section');
                const statsTop = statsSection.offset().top;
                const statsBottom = statsTop + statsSection.outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (!countersAnimated && statsBottom > viewportTop && statsTop < viewportBottom) {
                    animateCounters();
                    countersAnimated = true;
                }
            });
            
            // Smooth scrolling for anchor links
            $('a[href^="#"]').on('click', function(event) {
                const target = $(this.getAttribute('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 100
                    }, 1000);
                }
            });
            
            // Navbar background on scroll
            $(window).scroll(function() {
                if ($(window).scrollTop() > 50) {
                    $('.navbar-custom').addClass('scrolled');
                } else {
                    $('.navbar-custom').removeClass('scrolled');
                }
            });
        });

        // Add some interactive hover effects
        $('.service-card, .testimonial-card').hover(
            function() {
                $(this).addClass('animate__animated animate__pulse');
            },
            function() {
                $(this).removeClass('animate__animated animate__pulse');
            }
        );
   