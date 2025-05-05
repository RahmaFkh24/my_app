// models/SocialAccount.js
const socialAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    platform: { type: String, enum: ['facebook'], required: true },
    pageId: { type: String, required: true },
    pageName: { type: String, required: true },
    accessToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    lastRefreshed: { type: Date },
});