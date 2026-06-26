/* ========================================
   猫咪行业数据统计网站 - 交互脚本
   ======================================== */

// ---------- 导航栏滚动效果 ----------
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 高亮当前区块对应的导航链接
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 80;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ---------- CountUp 数字滚动动画 ----------
function initCountUp() {
    if (typeof CountUp === 'undefined') return;

    const countUpOptions = {
        duration: 2.5,
        enableScrollSpy: true,
        scrollSpyOnce: true,
        scrollSpyDelay: 200,
    };

    // 全球家猫数量：6
    new CountUp('count1', 6, { ...countUpOptions, suffix: '' }).start();

    // 全球宠物食品市场：1132
    new CountUp('count2', 1132, { ...countUpOptions, suffix: '' }).start();

    // 中国宠物猫数量：5800
    new CountUp('count3', 5800, { ...countUpOptions, suffix: '' }).start();

    // 互联网猫图片总量：65
    new CountUp('count4', 65, { ...countUpOptions, suffix: '' }).start();
}

// ---------- Chart.js 全局配置 ----------
Chart.defaults.color = '#7F8C8D';
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(44, 62, 80, 0.9)';
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

// 辅助函数：创建 canvas 渐变
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ---------- 全球宠物食品市场增长图 (折线图) ----------
function initPetFoodChart() {
    const ctx = document.getElementById('petFoodChart')?.getContext('2d');
    if (!ctx) return;

    const gradient = createGradient(ctx, 'rgba(244, 164, 96, 0.4)', 'rgba(244, 164, 96, 0.02)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024(E)'],
            datasets: [{
                label: '全球宠物食品市场 (亿美元)',
                data: [870.9, 912, 960, 1008, 1060, 1132],
                borderColor: '#F4A460',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#F4A460',
                pointBorderColor: '#FFF',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 9,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        pointStyleWidth: 10,
                        boxWidth: 10,
                        color: '#2C3E50',
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 800,
                    ticks: {
                        callback: v => v + '亿$',
                        color: '#7F8C8D',
                    },
                    grid: { color: 'rgba(0,0,0,0.04)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ---------- 各国猫数量对比图 (柱状图) ----------
function initCatCountChart() {
    const ctx = document.getElementById('catCountChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['中国', '美国', '英国', '意大利'],
            datasets: [{
                label: '宠物猫数量 (万只)',
                data: [5800, 8640, 1090, 750],
                backgroundColor: [
                    'rgba(244, 164, 96, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                ],
                borderColor: [
                    '#F4A460',
                    '#3498DB',
                    '#2ECC71',
                    '#9B59B6',
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: v => v + '万',
                        color: '#7F8C8D',
                    },
                    grid: { color: 'rgba(0,0,0,0.04)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ---------- 中国宠物市场增长图 (折线图) ----------
function initChinaMarketChart() {
    const ctx = document.getElementById('chinaMarketChart')?.getContext('2d');
    if (!ctx) return;

    const gradient = createGradient(ctx, 'rgba(231, 76, 60, 0.3)', 'rgba(231, 76, 60, 0.02)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            datasets: [{
                label: '市场规模 (亿美元)',
                data: [31.2, 42, 58, 82, 105, 135, 170, 210, 250],
                borderColor: '#E74C3C',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#E74C3C',
                pointBorderColor: '#FFF',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: '#2C3E50',
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: v => v + '亿$',
                        color: '#7F8C8D',
                    },
                    grid: { color: 'rgba(0,0,0,0.04)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ---------- YouTube 猫内容统计图 (柱状图) ----------
function initYoutubeCatChart() {
    const ctx = document.getElementById('youtubeCatChart')?.getContext('2d');
    if (!ctx) return;

    Chart.defaults.color = '#AAA';

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['猫视频总量', '平均观看量', '首支视频观看'],
            datasets: [{
                label: '数量',
                data: [2000000, 12000, 1200000],
                backgroundColor: [
                    'rgba(244, 164, 96, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                ],
                borderColor: [
                    '#F4A460',
                    '#2ECC71',
                    '#3498DB',
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const val = ctx.raw;
                            if (val >= 1000000) return (val / 10000).toFixed(0) + '万';
                            return val.toLocaleString() + '次';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        callback: v => v >= 1000000 ? (v / 10000).toFixed(0) + '万' : v.toLocaleString(),
                        color: '#AAA',
                    },
                    grid: { color: 'rgba(255,255,255,0.06)' }
                },
                y: {
                    ticks: { color: '#CCC' },
                    grid: { display: false }
                }
            }
        }
    });

    // 恢复默认颜色
    Chart.defaults.color = '#7F8C8D';
}

// ---------- 细分市场饼图 ----------
function initMarketPieChart() {
    const ctx = document.getElementById('marketPieChart')?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['猫粮', '猫砂与清洁', '宠物医疗', '猫咖文化', '智能猫设备', '猫咪IP授权'],
            datasets: [{
                data: [35, 12, 28, 5, 8, 12],
                backgroundColor: [
                    'rgba(244, 164, 96, 0.8)',
                    'rgba(149, 165, 166, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                ],
                borderColor: '#FFF',
                borderWidth: 3,
                hoverBorderColor: '#FFF',
                hoverBorderWidth: 3,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        usePointStyle: true,
                        pointStyleWidth: 12,
                        boxWidth: 12,
                        color: '#2C3E50',
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: ctx => ctx.label + ': 约' + ctx.raw + '%'
                    }
                }
            }
        }
    });
}

// ---------- 初始化所有图表 ----------
function initAllCharts() {
    initPetFoodChart();
    initCatCountChart();
    initChinaMarketChart();
    initYoutubeCatChart();
    initMarketPieChart();
}

// ---------- 页面加载完成后初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    initCountUp();
    initAllCharts();
});