
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

            // Navbar scroll effect
            $(window).scroll(function() {
                if ($(this).scrollTop() > 50) {
                    $('.navbar').addClass('scrolled');
                } else {
                    $('.navbar').removeClass('scrolled');
                }
            });

            // Counter animation
            function animateCounters() {
                $('.counter').each(function() {
                    var $this = $(this);
                    var countTo = parseInt($this.text());
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(countTo);
                        }
                    });
                });
            }

            // Trigger counter animation when hero section is visible
            var heroSection = $('#home');
            var countersAnimated = false;
            
            $(window).scroll(function() {
                if (!countersAnimated && $(window).scrollTop() + $(window).height() > heroSection.offset().top + heroSection.height() / 2) {
                    animateCounters();
                    countersAnimated = true;
                }
            });

            // Animate elements on scroll
            function animateOnScroll() {
                $('.animate-on-scroll').each(function() {
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();
                    
                    if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                        $(this).addClass('animated');
                    }
                });
            }

            // Trigger animations on scroll and page load
            $(window).on('scroll', animateOnScroll);
            animateOnScroll();

            // FAQ functionality
            $('.faq-question').click(function() {
                var faqItem = $(this).parent();
                var isActive = faqItem.hasClass('active');
                
                // Close all FAQ items
                $('.faq-item').removeClass('active');
                $('.faq-answer').slideUp(300);
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.addClass('active');
                    faqItem.find('.faq-answer').slideDown(300);
                }
            });

            // Service card hover effects
            $('.service-item').hover(
                function() {
                    $(this).find('.service-header').addClass('animate__pulse');
                },
                function() {
                    $(this).find('.service-header').removeClass('animate__pulse');
                }
            );

            // Initialize first FAQ as open
            $('.faq-item:first').addClass('active');
            $('.faq-item:first .faq-answer').show();
        });

        // Vanilla JavaScript for additional functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add loading animation
            document.body.style.opacity = '0';
            
            window.addEventListener('load', function() {
                document.body.style.transition = 'opacity 0.5s ease-in-out';
                document.body.style.opacity = '1';
            });

            // Mobile menu close on link click
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }
                });
            });
        });
  