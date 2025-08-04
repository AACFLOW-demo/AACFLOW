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
    const playBtns = document.querySelectorAll('.play-btn-mini');
    let currentAudio = null;
    let currentBtn = null;
    
    playBtns.forEach(playBtn => {
        const progressBar = playBtn.parentElement.querySelector('.progress-mini');
        const audioSrc = playBtn.getAttribute('data-audio');
        
        if (!audioSrc) return;
        
        playBtn.addEventListener('click', function() {
            // 如果点击的是当前播放的按钮，则暂停/恢复播放
            if (currentBtn === playBtn && currentAudio) {
                if (currentAudio.paused) {
                    // 恢复播放
                    currentAudio.play().then(() => {
                        playBtn.textContent = '⏸';
                        playBtn.style.background = '#dc3545';
                    }).catch(error => {
                        console.error('音频播放失败:', error);
                    });
                } else {
                    // 暂停播放
                    currentAudio.pause();
                    playBtn.textContent = '▶';
                    playBtn.style.background = '#667eea';
                }
                return;
            }
            
            // 停止当前播放的音频（如果是不同的按钮）
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentBtn) {
                    currentBtn.textContent = '▶';
                    currentBtn.style.background = '#667eea';
                }
                const currentProgress = currentBtn.parentElement.querySelector('.progress-mini');
                if (currentProgress) currentProgress.style.setProperty('--progress', '0%');
            }
            
            // 创建新的音频对象
            currentAudio = new Audio(audioSrc);
            currentBtn = playBtn;
            
            // 播放音频
            currentAudio.play().then(() => {
                playBtn.textContent = '⏸';
                playBtn.style.background = '#dc3545';
            }).catch(error => {
                console.error('音频播放失败:', error);
                alert('音频文件加载失败，请检查文件路径');
            });
            
            // 更新进度条
            currentAudio.addEventListener('timeupdate', function() {
                if (progressBar && currentAudio.duration) {
                    const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
                    progressBar.style.setProperty('--progress', progressPercent + '%');
                }
            });
            
            // 音频结束时重置
            currentAudio.addEventListener('ended', function() {
                playBtn.textContent = '▶';
                playBtn.style.background = '#667eea';
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
                currentAudio = null;
                currentBtn = null;
            });
            
            // 音频加载失败时处理
            currentAudio.addEventListener('error', function() {
                playBtn.textContent = '▶';
                playBtn.style.background = '#667eea';
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
                console.error('音频加载失败:', audioSrc);
                currentAudio = null;
                currentBtn = null;
            });
        });
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