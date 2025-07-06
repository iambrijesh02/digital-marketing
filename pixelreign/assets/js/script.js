// Custom JavaScript for Pixelreign Website

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
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Counter animation for stats
    function animateCounters() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.closest('#why-us')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.service-card, .testimonial-card, .portfolio-item, .why-item, .stat-card').each(function() {
        observer.observe(this);
    });

    // Add animation classes
    $('.service-card, .testimonial-card, .portfolio-item, .why-item, .stat-card').addClass('animate-on-scroll');

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-bg');
        var speed = scrolled * 0.5;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // 3D tilt effect for service cards
    $('.service-card').on('mousemove', function(e) {
        var card = $(this);
        var cardRect = this.getBoundingClientRect();
        var cardCenterX = cardRect.left + cardRect.width / 2;
        var cardCenterY = cardRect.top + cardRect.height / 2;
        
        var mouseX = e.clientX - cardCenterX;
        var mouseY = e.clientY - cardCenterY;
        
        var rotateX = (mouseY / cardRect.height) * 10;
        var rotateY = (mouseX / cardRect.width) * -10;
        
        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`);
    });

    $('.service-card').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    });

    // Portfolio item hover effects
    $('.portfolio-item').hover(
        function() {
            $(this).find('.portfolio-overlay').addClass('animate__animated animate__fadeIn');
        },
        function() {
            $(this).find('.portfolio-overlay').removeClass('animate__animated animate__fadeIn');
        }
    );

    // Testimonial carousel auto-play (if needed)
    setInterval(function() {
        $('.testimonial-card').each(function(index) {
            $(this).delay(index * 200).queue(function() {
                $(this).addClass('animate__animated animate__pulse').dequeue();
                setTimeout(() => {
                    $(this).removeClass('animate__animated animate__pulse');
                }, 1000);
            });
        });
    }, 10000);

    // Form validation and submission (if contact form is added)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.text();
        submitBtn.html('<span class="loading"></span> Sending...');
        
        // Simulate form submission
        setTimeout(function() {
            submitBtn.text('Message Sent!');
            setTimeout(function() {
                submitBtn.text(originalText);
            }, 2000);
        }, 2000);
    });

    // Mobile menu close on link click
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Add loading animation to buttons
    $('.btn').on('click', function() {
        var btn = $(this);
        if (!btn.hasClass('no-loading')) {
            var originalText = btn.text();
            btn.html('<span class="loading"></span>');
            
            setTimeout(function() {
                btn.text(originalText);
            }, 1000);
        }
    });

    // Floating animation for hero cards
    function randomFloat() {
        $('.floating-card').each(function() {
            var randomDelay = Math.random() * 2;
            var randomDuration = 4 + Math.random() * 4;
            
            $(this).css({
                'animation-delay': randomDelay + 's',
                'animation-duration': randomDuration + 's'
            });
        });
    }

    randomFloat();

    // Refresh floating animation every 10 seconds
    setInterval(randomFloat, 10000);

    // Add scroll indicator
    var scrollIndicator = $('<div class="scroll-indicator"></div>');
    $('body').append(scrollIndicator);

    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent * 100);
        
        $('.scroll-indicator').css('width', scrollPercentRounded + '%');
    });

    // Add CSS for scroll indicator
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .scroll-indicator {
                position: fixed;
                top: 0;
                left: 0;
                height: 4px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                z-index: 9999;
                transition: width 0.3s ease;
            }
        `)
        .appendTo('head');

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add custom cursor effect
    var cursor = $('<div class="custom-cursor"></div>');
    $('body').append(cursor);

    $(document).mousemove(function(e) {
        cursor.css({
            left: e.clientX,
            top: e.clientY
        });
    });

    $('a, button, .service-card, .portfolio-item').hover(
        function() {
            cursor.addClass('cursor-hover');
        },
        function() {
            cursor.removeClass('cursor-hover');
        }
    );

    // Add CSS for custom cursor
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .custom-cursor {
                width: 20px;
                height: 20px;
                border: 2px solid #6366f1;
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.3s ease;
                transform: translate(-50%, -50%);
            }
            
            .cursor-hover {
                width: 40px;
                height: 40px;
                background: rgba(99, 102, 241, 0.1);
            }
            
            @media (max-width: 768px) {
                .custom-cursor {
                    display: none;
                }
            }
        `)
        .appendTo('head');

    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debounce to scroll events
    $(window).scroll(debounce(function() {
        // Scroll-dependent functions here
    }, 10));

    // Add page transition effect
    $('body').addClass('page-loaded');

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .page-loaded {
                opacity: 1;
            }
        `)
        .appendTo('head');

});

// Additional utility functions
function showNotification(message, type = 'success') {
    var notification = $(`
        <div class="notification notification-${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(function() {
        notification.addClass('show');
    }, 100);
    
    setTimeout(function() {
        notification.removeClass('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #10b981;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification i {
            color: #10b981;
        }
        
        .notification-error i {
            color: #ef4444;
        }
    `)
    .appendTo('head');