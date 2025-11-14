// 中文取名神器核心系统
class ChineseNameGenerator {
    constructor() {
        this.currentNames = [];
        this.initializeData();
        this.bindEvents();
    }

    // 初始化数据
    initializeData() {
        // 男孩名字用字数据库
        this.maleWords = {
            classical: [
                { word: '轩', pinyin: 'xuān', meaning: '高远、气宇轩昂', wuxing: '土', score: 95 },
                { word: '宇', pinyin: 'yǔ', meaning: '天地宇宙、胸怀宽广', wuxing: '土', score: 92 },
                { word: '泽', pinyin: 'zé', meaning: '恩泽、润泽万物', wuxing: '水', score: 90 },
                { word: '峰', pinyin: 'fēng', meaning: '山峰、志向高远', wuxing: '土', score: 88 },
                { word: '豪', pinyin: 'háo', meaning: '豪迈、英雄气概', wuxing: '水', score: 87 },
                { word: '俊', pinyin: 'jùn', meaning: '俊秀、才能出众', wuxing: '火', score: 93 },
                { word: '杰', pinyin: 'jié', meaning: '杰出、人中豪杰', wuxing: '木', score: 91 },
                { word: '智', pinyin: 'zhì', meaning: '智慧、聪明伶俐', wuxing: '火', score: 94 },
                { word: '文', pinyin: 'wén', meaning: '文雅、学识渊博', wuxing: '水', score: 89 },
                { word: '武', pinyin: 'wǔ', meaning: '武艺、刚强勇敢', wuxing: '水', score: 86 },
                { word: '辰', pinyin: 'chén', meaning: '时光、星辰大海', wuxing: '土', score: 90 },
                { word: '昊', pinyin: 'hào', meaning: '广阔、苍天昊日', wuxing: '火', score: 92 },
                { word: '瑞', pinyin: 'ruì', meaning: '祥瑞、吉祥如意', wuxing: '金', score: 88 },
                { word: '梓', pinyin: 'zǐ', meaning: '梓树、栋梁之材', wuxing: '木', score: 85 },
                { word: '煜', pinyin: 'yù', meaning: '光耀、熠熠生辉', wuxing: '火', score: 91 }
            ],
            modern: [
                { word: '凯', pinyin: 'kǎi', meaning: '胜利、凯旋而归', wuxing: '木', score: 90 },
                { word: '航', pinyin: 'háng', meaning: '航行、勇往直前', wuxing: '水', score: 88 },
                { word: '晨', pinyin: 'chén', meaning: '早晨、朝气蓬勃', wuxing: '火', score: 87 },
                { word: '阳', pinyin: 'yáng', meaning: '阳光、积极向上', wuxing: '土', score: 89 },
                { word: '睿', pinyin: 'ruì', meaning: '睿智、聪明睿智', wuxing: '金', score: 93 },
                { word: '乐', pinyin: 'lè', meaning: '快乐、乐观开朗', wuxing: '火', score: 85 },
                { word: '安', pinyin: 'ān', meaning: '安宁、平安喜乐', wuxing: '土', score: 86 },
                { word: '晟', pinyin: 'shèng', meaning: '光明、前程似锦', wuxing: '火', score: 90 },
                { word: '恒', pinyin: 'héng', meaning: '持久、持之以恒', wuxing: '水', score: 88 }
            ],
            poetry: [
                { word: '墨', pinyin: 'mò', meaning: '墨香、文采斐然', wuxing: '土', score: 87, source: '腹有诗书气自华' },
                { word: '竹', pinyin: 'zhú', meaning: '竹节、高洁品质', wuxing: '木', score: 85, source: '咬定青山不放松' },
                { word: '松', pinyin: 'sōng', meaning: '松树、坚韧不拔', wuxing: '木', score: 86, source: '大雪压青松' },
                { word: '云', pinyin: 'yún', meaning: '云彩、自由自在', wuxing: '水', score: 84, source: '行到水穷处，坐看云起时' },
                { word: '风', pinyin: 'fēng', meaning: '清风、潇洒不羁', wuxing: '水', score: 83, source: '大风起兮云飞扬' }
            ]
        };

        // 女孩名字用字数据库
        this.femaleWords = {
            classical: [
                { word: '雅', pinyin: 'yǎ', meaning: '优雅、温文尔雅', wuxing: '木', score: 94 },
                { word: '慧', pinyin: 'huì', meaning: '智慧、聪慧过人', wuxing: '水', score: 93 },
                { word: '婷', pinyin: 'tíng', meaning: '婷婷、娉婷袅娜', wuxing: '火', score: 90 },
                { word: '语', pinyin: 'yǔ', meaning: '语言、伶牙俐齿', wuxing: '木', score: 88 },
                { word: '琳', pinyin: 'lín', meaning: '美玉、珍贵美好', wuxing: '木', score: 89 },
                { word: '萱', pinyin: 'xuān', meaning: '萱草、快乐忘忧', wuxing: '木', score: 87 },
                { word: '瑶', pinyin: 'yáo', meaning: '美玉、珍贵如玉', wuxing: '火', score: 91 },
                { word: '涵', pinyin: 'hán', meaning: '涵养、包容万物', wuxing: '水', score: 92 },
                { word: '颖', pinyin: 'yǐng', meaning: '聪颖、脱颖而出', wuxing: '木', score: 90 },
                { word: '馨', pinyin: 'xīn', meaning: '馨香、品德高尚', wuxing: '金', score: 88 },
                { word: '怡', pinyin: 'yí', meaning: '怡然、心情愉悦', wuxing: '土', score: 86 },
                { word: '心', pinyin: 'xīn', meaning: '心灵、纯洁善良', wuxing: '金', score: 89 },
                { word: '梦', pinyin: 'mèng', meaning: '梦想、追求理想', wuxing: '木', score: 85 },
                { word: '诗', pinyin: 'shī', meaning: '诗歌、才华横溢', wuxing: '金', score: 91 },
                { word: '雨', pinyin: 'yǔ', meaning: '雨水、润泽万物', wuxing: '水', score: 84 }
            ],
            modern: [
                { word: '欣', pinyin: 'xīn', meaning: '欣喜、欣欣向荣', wuxing: '木', score: 87 },
                { word: '悦', pinyin: 'yuè', meaning: '喜悦、心情愉悦', wuxing: '金', score: 88 },
                { word: '晴', pinyin: 'qíng', meaning: '晴天、阳光明媚', wuxing: '火', score: 86 },
                { word: '暖', pinyin: 'nuǎn', meaning: '温暖、温柔体贴', wuxing: '火', score: 85 },
                { word: '宁', pinyin: 'níng', meaning: '宁静、内心平和', wuxing: '火', score: 87 },
                { word: '星', pinyin: 'xīng', meaning: '星星、闪闪发光', wuxing: '金', score: 89 },
                { word: '月', pinyin: 'yuè', meaning: '月亮、温柔如水', wuxing: '木', score: 84 },
                { word: '乐', pinyin: 'lè', meaning: '快乐、乐观向上', wuxing: '火', score: 85 }
            ],
            poetry: [
                { word: '兰', pinyin: 'lán', meaning: '兰花、高洁品质', wuxing: '木', score: 88, source: '气若幽兰' },
                { word: '莲', pinyin: 'lián', meaning: '莲花、出淤泥而不染', wuxing: '木', score: 87, source: '莲花出淤泥而不染' },
                { word: '梅', pinyin: 'méi', meaning: '梅花、坚强不屈', wuxing: '木', score: 86, source: '梅花香自苦寒来' },
                { word: '雪', pinyin: 'xuě', meaning: '雪花、纯洁无瑕', wuxing: '水', score: 85, source: '雪花飞舞' },
                { word: '冰', pinyin: 'bīng', meaning: '冰雪、纯洁清冷', wuxing: '水', score: 83, source: '冰清玉洁' }
            ]
        };

        // 常用姓氏拼音数据
        this.surnameData = {
            '王': 'wáng', '李': 'lǐ', '张': 'zhāng', '刘': 'liú', '陈': 'chén',
            '杨': 'yáng', '赵': 'zhào', '黄': 'huáng', '周': 'zhōu', '吴': 'wú',
            '徐': 'xú', '孙': 'sūn', '胡': 'hú', '朱': 'zhū', '高': 'gāo',
            '林': 'lín', '何': 'hé', '郭': 'guō', '马': 'mǎ', '罗': 'luó'
        };

        // 五行相生相克
        this.wuxingRelations = {
            '金': { generates: '水', restrains: '木', restrainedBy: '火' },
            '木': { generates: '火', restrains: '土', restrainedBy: '金' },
            '水': { generates: '木', restrains: '火', restrainedBy: '土' },
            '火': { generates: '土', restrains: '金', restrainedBy: '水' },
            '土': { generates: '金', restrains: '水', restrainedBy: '木' }
        };

        // 诗词名句数据库
        this.poetryQuotes = [
            { quote: '海内存知己，天涯若比邻', author: '王勃', suitable: ['知', '邻', '海', '涯'] },
            { quote: '山重水复疑无路，柳暗花明又一村', author: '陆游', suitable: ['明', '路', '村', '花'] },
            { quote: '会当凌绝顶，一览众山小', author: '杜甫', suitable: ['凌', '顶', '览', '山'] },
            { quote: '落红不是无情物，化作春泥更护花', author: '龚自珍', suitable: ['春', '护', '花', '红'] },
            { quote: '长风破浪会有时，直挂云帆济沧海', author: '李白', suitable: ['风', '浪', '帆', '海'] }
        ];
    }

    // 绑定事件
    bindEvents() {
        const form = document.getElementById('namingForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateNames();
            });
        }

        // 平滑滚动到结果区域
        document.addEventListener('click', (e) => {
            if (e.target.closest('.name-card')) {
                const nameCard = e.target.closest('.name-card');
                this.showNameDetail(nameCard.dataset.name);
            }
        });
    }

    // 生成名字主函数
    generateNames() {
        const formData = this.getFormData();
        if (!this.validateForm(formData)) {
            return;
        }

        this.showLoading();

        // 模拟加载时间，增强用户体验
        setTimeout(() => {
            const names = this.createNames(formData);
            this.displayResults(names);
            this.hideLoading();
            this.scrollToResults();
        }, 1500);
    }

    // 获取表单数据
    getFormData() {
        const form = document.getElementById('namingForm');
        const formData = new FormData(form);

        return {
            surname: formData.get('surname').trim(),
            gender: formData.get('gender'),
            birthDate: formData.get('birthDate'),
            birthTime: formData.get('birthTime'),
            methods: formData.getAll('method'),
            requirements: formData.get('requirements').trim()
        };
    }

    // 验证表单
    validateForm(data) {
        if (!data.surname) {
            alert('请输入姓氏');
            return false;
        }

        if (data.surname.length > 2) {
            alert('姓氏最多2个字');
            return false;
        }

        if (data.methods.length === 0) {
            alert('请至少选择一种取名方式');
            return false;
        }

        return true;
    }

    // 创建名字
    createNames(formData) {
        const names = [];
        const wordBank = formData.gender === 'male' ? this.maleWords : this.femaleWords;

        // 根据选择的方法生成名字
        formData.methods.forEach(method => {
            if (wordBank[method]) {
                const methodNames = this.generateNamesByMethod(formData, wordBank[method], method);
                names.push(...methodNames);
            }
        });

        // 如果启用了五行取名，进行五行平衡
        if (formData.methods.includes('wuxing') && formData.birthDate) {
            names.forEach(name => {
                name.wuxingAnalysis = this.analyzeWuxing(name, formData.birthDate);
            });
        }

        // 按评分排序并返回前12个
        return names.sort((a, b) => b.totalScore - a.totalScore).slice(0, 12);
    }

    // 根据方法生成名字
    generateNamesByMethod(formData, words, method) {
        const names = [];
        const surname = formData.surname;

        // 单字名
        words.forEach(word => {
            if (this.isWordSuitable(word, formData.requirements)) {
                const name = {
                    fullName: surname + word.word,
                    surname: surname,
                    givenName: word.word,
                    pinyin: this.getPinyin(surname, word.word),
                    meaning: word.meaning,
                    method: method,
                    wuxing: word.wuxing,
                    score: word.score,
                    totalScore: this.calculateScore(surname, word.word, word.score),
                    source: word.source || null,
                    analysis: this.generateAnalysis(surname, word.word, method)
                };
                names.push(name);
            }
        });

        // 双字名（组合）
        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                const word1 = words[i];
                const word2 = words[j];

                if (this.isWordCombinationSuitable(word1, word2, formData.requirements)) {
                    const givenName = word1.word + word2.word;
                    const name = {
                        fullName: surname + givenName,
                        surname: surname,
                        givenName: givenName,
                        pinyin: this.getPinyin(surname, givenName),
                        meaning: this.combineMeanings(word1.meaning, word2.meaning),
                        method: method,
                        wuxing: [word1.wuxing, word2.wuxing],
                        score: Math.round((word1.score + word2.score) / 2),
                        totalScore: this.calculateScore(surname, givenName, (word1.score + word2.score) / 2),
                        source: word1.source || word2.source || null,
                        analysis: this.generateAnalysis(surname, givenName, method)
                    };
                    names.push(name);
                }
            }
        }

        return names.slice(0, 4); // 每种方法最多4个名字
    }

    // 检查字是否适合
    isWordSuitable(word, requirements) {
        if (!requirements) return true;

        const keywords = requirements.toLowerCase();
        const meaning = word.meaning.toLowerCase();

        // 简单的关键词匹配
        const positiveKeywords = ['聪明', '智慧', '健康', '快乐', '成功', '幸福', '平安'];
        return positiveKeywords.some(keyword =>
            keywords.includes(keyword) && meaning.includes(keyword)
        );
    }

    // 检查字组合是否适合
    isWordCombinationSuitable(word1, word2, requirements) {
        return this.isWordSuitable(word1, requirements) || this.isWordSuitable(word2, requirements);
    }

    // 组合含义
    combineMeanings(meaning1, meaning2) {
        return `${meaning1}，${meaning2}`;
    }

    // 获取拼音
    getPinyin(surname, givenName) {
        const surnamePin = this.surnameData[surname] || surname;
        return `${surnamePin} ${givenName}`;
    }

    // 计算总分
    calculateScore(surname, givenName, baseScore) {
        let score = baseScore;

        // 音律评分
        score += this.evaluatePhonetics(surname, givenName);

        // 字形评分
        score += this.evaluateForm(surname, givenName);

        // 重名率评分（模拟）
        score += this.evaluateRarity(givenName);

        return Math.min(100, Math.round(score));
    }

    // 音律评分
    evaluatePhonetics(surname, givenName) {
        // 简化的音律评分：避免相同声母
        const surnameInitial = this.getInitial(surname);
        let score = 5;

        for (let char of givenName) {
            if (this.getInitial(char) === surnameInitial) {
                score -= 2;
            }
        }

        return Math.max(0, score);
    }

    // 获取声母（简化）
    getInitial(char) {
        const initials = {
            '王': 'w', '李': 'l', '张': 'zh', '刘': 'l', '陈': 'ch',
            '杨': 'y', '赵': 'zh', '黄': 'h', '周': 'zh', '吴': 'w'
        };
        return initials[char] || char.charAt(0);
    }

    // 字形评分
    evaluateForm(surname, givenName) {
        // 简化的字形评分：笔画平衡
        let score = 3;
        const surnameStrokes = this.getStrokeCount(surname);

        for (let char of givenName) {
            const strokes = this.getStrokeCount(char);
            if (Math.abs(strokes - surnameStrokes) > 10) {
                score -= 1;
            }
        }

        return Math.max(0, score);
    }

    // 获取笔画数（简化）
    getStrokeCount(char) {
        const strokes = {
            '王': 4, '李': 7, '张': 11, '刘': 15, '陈': 16,
            '杨': 13, '赵': 14, '黄': 12, '周': 8, '吴': 7
        };
        return strokes[char] || char.length * 6; // 简化计算
    }

    // 重名率评分
    evaluateRarity(givenName) {
        // 简化的重名率评分
        const commonNames = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋'];
        let score = 5;

        for (let char of givenName) {
            if (commonNames.includes(char)) {
                score -= 2;
            }
        }

        return Math.max(0, score);
    }

    // 生成分析
    generateAnalysis(surname, givenName, method) {
        const methodNames = {
            classical: '经典取名',
            modern: '现代取名',
            poetry: '诗词取名',
            wuxing: '五行取名'
        };

        return {
            method: methodNames[method],
            phoneticScore: this.evaluatePhonetics(surname, givenName) + 5,
            formScore: this.evaluateForm(surname, givenName) + 7,
            rarityScore: this.evaluateRarity(givenName) + 5,
            culturalScore: method === 'poetry' ? 10 : 8
        };
    }

    // 五行分析
    analyzeWuxing(name, birthDate) {
        // 简化的五行分析
        const birth = new Date(birthDate);
        const month = birth.getMonth() + 1;

        // 根据出生月份简化推算缺失五行
        const seasonWuxing = {
            spring: '金', // 春季多木，缺金
            summer: '水', // 夏季多火，缺水
            autumn: '木', // 秋季多金，缺木
            winter: '火'  // 冬季多水，缺火
        };

        let season;
        if (month >= 3 && month <= 5) season = 'spring';
        else if (month >= 6 && month <= 8) season = 'summer';
        else if (month >= 9 && month <= 11) season = 'autumn';
        else season = 'winter';

        const neededWuxing = seasonWuxing[season];
        const nameWuxing = Array.isArray(name.wuxing) ? name.wuxing : [name.wuxing];

        return {
            needed: neededWuxing,
            nameHas: nameWuxing,
            balanced: nameWuxing.includes(neededWuxing),
            advice: nameWuxing.includes(neededWuxing) ?
                '五行平衡，有助运势' :
                `建议补充${neededWuxing}属性字`
        };
    }

    // 显示加载状态
    showLoading() {
        const button = document.querySelector('.generate-btn');
        if (button) {
            button.innerHTML = '<div class="loading"></div> 正在生成...';
            button.disabled = true;
        }
    }

    // 隐藏加载状态
    hideLoading() {
        const button = document.querySelector('.generate-btn');
        if (button) {
            button.innerHTML = '<i class="fas fa-sparkles"></i><span>生成好名字</span>';
            button.disabled = false;
        }
    }

    // 显示结果
    displayResults(names) {
        this.currentNames = names;
        const resultsSection = document.getElementById('results');
        const namesGrid = document.getElementById('namesGrid');

        if (!resultsSection || !namesGrid) return;

        namesGrid.innerHTML = '';

        names.forEach((name, index) => {
            const nameCard = this.createNameCard(name, index);
            namesGrid.appendChild(nameCard);
        });

        resultsSection.style.display = 'block';
    }

    // 创建名字卡片
    createNameCard(name, index) {
        const card = document.createElement('div');
        card.className = 'name-card';
        card.dataset.name = index;

        const wuxingDisplay = Array.isArray(name.wuxing) ?
            name.wuxing.join('·') : name.wuxing;

        card.innerHTML = `
            <div class="name-display">${name.fullName}</div>
            <div class="name-pinyin">${name.pinyin}</div>
            <div class="name-meaning">${name.meaning}</div>
            <div class="name-tags">
                <span class="name-tag">${name.method === 'classical' ? '经典' :
                    name.method === 'modern' ? '现代' :
                    name.method === 'poetry' ? '诗词' : '五行'}</span>
                <span class="name-tag wuxing">${wuxingDisplay}</span>
                <span class="name-tag">评分: ${name.totalScore}</span>
            </div>
        `;

        return card;
    }

    // 显示名字详情
    showNameDetail(nameIndex) {
        const name = this.currentNames[nameIndex];
        if (!name) return;

        const modal = document.getElementById('nameDetailModal');
        const title = document.getElementById('modalNameTitle');
        const details = document.getElementById('modalNameDetails');

        if (!modal || !title || !details) return;

        title.textContent = name.fullName;

        const wuxingAnalysis = name.wuxingAnalysis ? `
            <div class="detail-section">
                <h4><i class="fas fa-yin-yang"></i> 五行分析</h4>
                <p><strong>所需五行：</strong>${name.wuxingAnalysis.needed}</p>
                <p><strong>姓名五行：</strong>${name.wuxingAnalysis.nameHas.join('、')}</p>
                <p><strong>平衡性：</strong>${name.wuxingAnalysis.advice}</p>
            </div>
        ` : '';

        const poetrySource = name.source ? `
            <div class="detail-section">
                <h4><i class="fas fa-quote-left"></i> 典故出处</h4>
                <p>${name.source}</p>
            </div>
        ` : '';

        details.innerHTML = `
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> 基本信息</h4>
                <p><strong>拼音：</strong>${name.pinyin}</p>
                <p><strong>含义：</strong>${name.meaning}</p>
                <p><strong>取名方式：</strong>${name.analysis.method}</p>
            </div>

            <div class="detail-section">
                <h4><i class="fas fa-chart-bar"></i> 评分详情</h4>
                <div class="score-item">
                    <span>音律和谐</span>
                    <span>${name.analysis.phoneticScore}/10</span>
                </div>
                <div class="score-item">
                    <span>字形美观</span>
                    <span>${name.analysis.formScore}/10</span>
                </div>
                <div class="score-item">
                    <span>重名度低</span>
                    <span>${name.analysis.rarityScore}/10</span>
                </div>
                <div class="score-item">
                    <span>文化内涵</span>
                    <span>${name.analysis.culturalScore}/10</span>
                </div>
                <div class="score-total">
                    <span><strong>综合评分</strong></span>
                    <span><strong>${name.totalScore}/100</strong></span>
                </div>
            </div>

            ${wuxingAnalysis}
            ${poetrySource}

            <div class="detail-section">
                <h4><i class="fas fa-lightbulb"></i> 寓意解读</h4>
                <p>${this.generateDetailedMeaning(name)}</p>
            </div>
        `;

        modal.style.display = 'block';
    }

    // 生成详细寓意
    generateDetailedMeaning(name) {
        const meanings = [
            `${name.fullName}这个名字寓意深远，体现了父母对孩子的美好期望。`,
            `${name.givenName}字意为${name.meaning}，与${name.surname}姓搭配和谐。`,
            `从音律上看，这个名字读音悦耳，朗朗上口。`,
            `整体而言，这是一个既有文化底蕴又不失现代感的好名字。`
        ];
        return meanings.join('');
    }

    // 滚动到结果区域
    scrollToResults() {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // 保存名字结果
    saveNames() {
        if (this.currentNames.length === 0) {
            alert('暂无可保存的结果');
            return;
        }

        const data = {
            timestamp: new Date().toISOString(),
            names: this.currentNames
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `取名结果_${new Date().toLocaleDateString()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('nameDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 重新生成名字
function generateNames() {
    if (window.nameGenerator) {
        window.nameGenerator.generateNames();
    }
}

// 保存名字结果
function saveNames() {
    if (window.nameGenerator) {
        window.nameGenerator.saveNames();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.nameGenerator = new ChineseNameGenerator();

    // 点击模态框外部关闭
    document.getElementById('nameDetailModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'nameDetailModal') {
            closeModal();
        }
    });

    // 添加一些页面交互效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有section元素
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    console.log('中文取名神器已加载完成 ✨');
});