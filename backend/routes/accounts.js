// backend/routes/auth.js
/*const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { FB_APP_ID, FB_APP_SECRET, FB_REDIRECT_URI, JWT_SECRET } = process.env;

router.get('/login', (req, res) => {
    const fbLoginUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${FB_REDIRECT_URI}&scope=pages_show_list,pages_read_engagement,pages_read_user_content,read_insights`;
    res.redirect(fbLoginUrl);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const tokenRes = await axios.get(`https://graph.facebook.com/v22.0/oauth/access_token`, {
            params: {
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                redirect_uri: FB_REDIRECT_URI,
                code
            }
        });

        // Step 1: Extend the short-lived user token
        const userToken = tokenRes.data.access_token;
        const longTokenRes = await axios.get('https://graph.facebook.com/v22.0/oauth/access_token', {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                fb_exchange_token: userToken
            }
        });

        const longLivedToken = longTokenRes.data.access_token;

        // Step 2: Get pages with extra fields
        const pagesRes = await axios.get(`https://graph.facebook.com/me/accounts`, {
            params: {
                access_token: longLivedToken,
                fields: 'id,name,access_token,category,picture'
            }
        });

        const pages = pagesRes.data.data.map(p => ({
            id: p.id,
            name: p.name,
            access_token: p.access_token,
            category: p.category,
            picture: p.picture?.data?.url
        }));

        const jwtToken = jwt.sign({
            fb_token: longLivedToken,
            pages
        }, JWT_SECRET, { expiresIn: '1h' });

        res.redirect(`${process.env.FRONTEND_URL}/pages?token=${jwtToken}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('OAuth failed');
    }
});

router.get('/pages/stats', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Unauthorized');

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const pages = decoded.pages;

        const results = [];
        for (const page of pages) {
            const postsRes = await axios.get(`https://graph.facebook.com/${page.id}/posts`, {
                params: { access_token: page.access_token, limit: 100, fields: 'id' }
            });

            const posts = postsRes.data.data;
            const postIds = posts.map(p => p.id);

            let totalReach = 0;
            let totalLikes = 0;
            let totalComments = 0;
            let totalShares = 0;

            for (const postId of postIds) {
                try {
                    const insightsRes = await axios.get(`https://graph.facebook.com/${postId}/insights`, {
                        params: {
                            metric: 'post_impressions_unique,post_reactions_by_type_total,post_comments,post_shares',
                            access_token: page.access_token
                        }
                    });

                    for (const insight of insightsRes.data.data) {
                        switch (insight.name) {
                            case 'post_impressions_unique':
                                totalReach += insight.values[0].value || 0;
                                break;
                            case 'post_reactions_by_type_total':
                                totalLikes += (insight.values[0].value?.like || 0);
                                break;
                            case 'post_comments':
                                totalComments += insight.values[0].value || 0;
                                break;
                            case 'post_shares':
                                totalShares += insight.values[0].value || 0;
                                break;
                        }
                    }
                } catch (err) {
                    console.warn(`Failed to fetch insights for post ${postId}`);
                }
            }

            results.push({
                id: page.id,
                name: page.name,
                picture: page.picture,
                category: page.category,
                totalPosts: posts.length,
                avgReachPerPost: posts.length ? Math.round(totalReach / posts.length) : 0,
                totalLikes,
                totalComments,
                totalShares
            });
        }

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch stats');
    }
});

module.exports = router;*/