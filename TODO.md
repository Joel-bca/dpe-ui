# Deployment Checklist

## Backend (AWS Amplify)
- [ ] Confirm Amplify backend is deployed: Check `amplify_outputs.json` and run `amplify status`
- [ ] If not deployed, run `amplify push` to deploy backend to AWS
- [ ] Verify AWS SES for email sending (waiting for production verification)

## Frontend (Vercel)
- [ ] Push code to GitHub repository
- [ ] Connect GitHub repo to Vercel
- [ ] Deploy to Vercel
- [ ] Set environment variables in Vercel (API endpoints, keys)

## Configuration
- [ ] Update API endpoints in frontend to point to AWS backend
- [ ] Test registration flows after deployment
- [ ] Monitor for any CORS or authentication issues
