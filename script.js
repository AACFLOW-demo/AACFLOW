// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动导航
    initSmoothScrolling();
    
    // 音频播放器功能
    initAudioPlayers();
    
    // 滚动动画
    initScrollAnimations();
    
    // 导航栏滚动效果
    initNavbarScroll();
});

// 平滑滚动导航
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 音频播放器功能
function initAudioPlayers() {
    const audioItems = document.querySelectorAll('.audio-item-compact');
    
    audioItems.forEach((item, index) => {
        const playBtn = item.querySelector('.play-btn-mini');
        const progressBar = item.querySelector('.progress-mini');
        
        let isPlaying = false;
        let currentTime = 0;
        let duration = 30; // 示例时长（秒）
        let interval;
        
        // 播放/暂停按钮
        if (playBtn) {
            playBtn.addEventListener('click', function() {
                if (isPlaying) {
                    pauseAudio();
                } else {
                    playAudio();
                }
            });
        }
        
        function playAudio() {
            isPlaying = true;
            playBtn.textContent = '⏸';
            playBtn.style.background = '#dc3545';
            
            interval = setInterval(() => {
                currentTime += 1;
                updateProgress();
                
                if (currentTime >= duration) {
                    pauseAudio();
                    currentTime = 0;
                    updateProgress();
                }
            }, 1000);
        }
        
        function pauseAudio() {
            isPlaying = false;
            playBtn.textContent = '▶';
            playBtn.style.background = '#667eea';
            clearInterval(interval);
        }
        
        function updateProgress() {
            const progressPercent = (currentTime / duration) * 100;
            if (progressBar) {
                progressBar.style.width = progressPercent + '%';
            }
        }
        
        // 初始化显示
        updateProgress();
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.audio-item-compact, .abstract-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 响应式导航菜单（移动端）
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(hamburger);
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 点击菜单项后关闭移动菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// 初始化移动端功能
if (window.innerWidth <= 768) {
    initMobileMenu();
}

// 窗口大小改变时重新检查
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
        initMobileMenu();
    }
});

// 添加键盘导航支持
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // 空格键播放/暂停第一个音频
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            const firstPlayBtn = document.querySelector('.play-btn-mini');
            if (firstPlayBtn) {
                firstPlayBtn.click();
            }
        }
        
        // 方向键导航
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy(0, 100);
        }
        
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy(0, -100);
        }
    });
}

// 初始化键盘导航
initKeyboardNavigation();