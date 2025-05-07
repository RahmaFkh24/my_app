const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ensure all required environment variables are available
const { FB_APP_ID, FB_APP_SECRET, FB_REDIRECT_URI, JWT_SECRET, FRONTEND_URL } = process.env;
if (!FB_APP_ID || !FB_APP_SECRET || !FB_REDIRECT_URI || !JWT_SECRET || !FRONTEND_URL) {
    throw new Error("Missing necessary environment variables.");
}

// Redirect to Facebook OAuth login
router.get('/login', (req, res) => {
    const fbLoginUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(FB_REDIRECT_URI)}&scope=pages_show_list,pages_read_engagement`;
    res.redirect(fbLoginUrl);
});

// Handle the OAuth callback from Facebook
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const tokenRes = await axios.get('https://graph.facebook.com/v22.0/oauth/access_token', {
            params: {
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                redirect_uri: FB_REDIRECT_URI,
                code
            }
        });

        const userToken = tokenRes.data.access_token;
        const pagesRes = await axios.get('https://graph.facebook.com/me/accounts', {
            params: { access_token: userToken }
        });

        const pages = pagesRes.data.data;

        const jwtToken = jwt.sign({
            fb_token: userToken,
            pages: pages.map(p => ({
                id: p.id,
                name: p.name,
                access_token: p.access_token
            }))
        }, JWT_SECRET, { expiresIn: '1h' });

        res.redirect(`${process.env.FRONTEND_URL}/pages?token=${jwtToken}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('OAuth failed');
    }
});

// Fetch statistics for the user's pages
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
                params: { access_token: page.access_token, limit: 100 }
            });

            const postIds = postsRes.data.data.map(p => p.id).slice(0, 50); // limit to 50 for performance
            const metrics = { reach: 0, likes: 0, comments: 0, shares: 0 };

            for (const postId of postIds) {
                const insightsRes = await axios.get(`https://graph.facebook.com/${postId}/insights`, {
                    params: { access_token: page.access_token }
                });

                insightsRes.data.data.forEach(metric => {
                    if (metric.name === 'post_impressions') {
                        metrics.reach += parseInt(metric.values[0].value) || 0;
                    } else if (metric.name === 'post_reactions_by_type_total') {
                        const values = metric.values[0].value;
                        for (const key in values) {
                            metrics.likes += values[key];
                        }
                    } else if (metric.name === 'post_comments') {
                        metrics.comments += parseInt(metric.values[0].value) || 0;
                    } else if (metric.name === 'post_shares') {
                        metrics.shares += parseInt(metric.values[0].value) || 0;
                    }
                });
            }

            results.push({
                id: page.id,
                name: page.name,
                totalPosts: postsRes.data.data.length,
                avgReachPerPost: postIds.length ? Math.round(metrics.reach / postIds.length) : 0,
                totalLikes: metrics.likes,
                totalComments: metrics.comments,
                totalShares: metrics.shares
            });
        }

        res.json(results);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send('Failed to fetch stats');
    }
});

module.exports = router;
