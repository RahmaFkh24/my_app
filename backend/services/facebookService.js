/*const axios = require('axios');

class FacebookService {
    constructor() {
        this.baseUrl = 'https://graph.facebook.com/v15.0';
        this.pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
        this.pageId = process.env.PAGE_ID;
    }

    async getPageInsights() {
        try {
            const response = await axios.get(`${this.baseUrl}/${this.pageId}/insights`, {
                params: {
                    access_token: this.pageAccessToken,
                    metric: 'page_impressions,page_engaged_users,page_fans,page_actions_post_reactions_total',
                    period: 'day'
                }
            });
            return this.formatInsights(response.data.data);
        } catch (error) {
            console.error('Error fetching Facebook insights:', error.response?.data || error.message);
            throw error;
        }
    }

    async getAudienceData() {
        try {
            const [ageGender, countries] = await Promise.all([
                this.getAgeGenderData(),
                this.getCountryData()
            ]);

            return {
                age: this.formatAgeData(ageGender),
                gender: this.formatGenderData(ageGender),
                countries: this.formatCountryData(countries)
            };
        } catch (error) {
            console.error('Error fetching audience data:', error);
            throw error;
        }
    }

    async getAgeGenderData() {
        const response = await axios.get(`${this.baseUrl}/${this.pageId}/insights`, {
            params: {
                access_token: this.pageAccessToken,
                metric: 'page_fans_gender_age',
                period: 'lifetime'
            }
        });
        return response.data.data[0]?.values[0]?.value || {};
    }

    async getCountryData() {
        const response = await axios.get(`${this.baseUrl}/${this.pageId}/insights`, {
            params: {
                access_token: this.pageAccessToken,
                metric: 'page_fans_country',
                period: 'lifetime'
            }
        });
        return response.data.data[0]?.values[0]?.value || {};
    }

    formatInsights(data) {
        const result = {};
        data.forEach(item => {
            result[item.name] = item.values[0].value;
        });
        return result;
    }

    formatAgeData(data) {
        const ageGroups = {
            '18-24': 0,
            '25-34': 0,
            '35-44': 0,
            '45-54': 0,
            '55-64': 0,
            '65+': 0
        };

        Object.entries(data).forEach(([key, value]) => {
            const age = parseInt(key.split('.')[1]);
            if (age >= 18 && age <= 24) ageGroups['18-24'] += value;
            else if (age <= 34) ageGroups['25-34'] += value;
            else if (age <= 44) ageGroups['35-44'] += value;
            else if (age <= 54) ageGroups['45-54'] += value;
            else if (age <= 64) ageGroups['55-64'] += value;
            else ageGroups['65+'] += value;
        });

        const total = Object.values(ageGroups).reduce((sum, val) => sum + val, 0);
        return Object.entries(ageGroups).map(([range, count]) => ({
            range,
            percent: total > 0 ? Math.round((count / total) * 100) : 0
        }));
    }

    formatGenderData(data) {
        const genders = { female: 0, male: 0 };

        Object.entries(data).forEach(([key, value]) => {
            const gender = key.split('.')[0];
            if (gender === 'F') genders.female += value;
            else if (gender === 'M') genders.male += value;
        });

        const total = genders.female + genders.male;
        return [
            { type: 'Female', percent: total > 0 ? Math.round((genders.female / total) * 100) : 50 },
            { type: 'Male', percent: total > 0 ? Math.round((genders.male / total) * 100) : 50 }
        ];
    }

    formatCountryData(data) {
        const total = Object.values(data).reduce((sum, val) => sum + val, 0);
        const countries = Object.entries(data)
            .map(([country, count]) => ({
                name: country,
                value: total > 0 ? Math.round((count / total) * 100) : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6); // Top 5 countries + "Other"

        // Group remaining countries as "Other"
        if (countries.length > 5) {
            const otherValue = countries.slice(5).reduce((sum, country) => sum + country.value, 0);
            countries.splice(5);
            countries.push({ name: 'Other', value: otherValue });
        }

        return countries;
    }
}

module.exports = new FacebookService();*/