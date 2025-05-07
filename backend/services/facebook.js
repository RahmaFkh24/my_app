// routes/facebook.js
/*const express = require('express');
const router = express.Router();
const Facebook = require('facebook-nodejs-business-sdk');

const processAudienceData = (insights) => {
    const ageData = [];
    const genderData = [];
    let total = 0;

    // Process age and gender data
    insights.forEach(insight => {
        if (insight.name === 'page_fans_gender_age') {
            insight.values[0].value.forEach((item, key) => {
                const [gender, ageRange] = key.split('.');
                const count = parseInt(item);
                total += count;

                // Aggregate age ranges
                const ageEntry = ageData.find(a => a.range === ageRange);
                if (ageEntry) {
                    ageEntry.count += count;
                } else {
                    ageData.push({ range: ageRange, count });
                }

                // Aggregate gender data
                const genderType = gender === 'F' ? 'Female' : 'Male';
                const genderEntry = genderData.find(g => g.type === genderType);
                if (genderEntry) {
                    genderEntry.count += count;
                } else {
                    genderData.push({ type: genderType, count });
                }
            });
        }
    });

    // Convert counts to percentages
    return {
        age: ageData.map(item => ({
            range: item.range.replace('U', 'Under').replace('O', 'Over'),
            percent: ((item.count / total) * 100).toFixed(1)
        })),
        gender: genderData.map(item => ({
            type: item.type,
            percent: ((item.count / total) * 100).toFixed(1)
        }))
    };
};

router.get('/audience', async (req, res) => {
    try {
        const pageId = process.env.PAGE_ID;
        const accessToken = process.env.PAGE_ACCESS_TOKEN;

        Facebook.Api.init(accessToken);
        const page = new Facebook.Page(pageId);

        const insights = await page.getInsights(
            ['page_fans_gender_age'],
            { period: 'lifetime' }
        );

        const audienceData = processAudienceData(insights);
        res.json(audienceData);
    } catch (error) {
        console.error('Facebook API Error:', error);
        res.status(500).json({ error: 'Failed to fetch audience data' });
    }
});

module.exports = router;*/