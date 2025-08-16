# BeeHiveStack.net Deployment Checklist
*Professional Website Launch Guide*

---

## Overview
**Domain**: beehivestack.net (owned via Namecheap)  
**Platform**: Replit Autoscale Deployment  
**Application**: Node.js/Express with React frontend  
**Estimated Time**: 1-2 hours (mostly DNS propagation wait)  
**Estimated Cost**: ~$2/month base + usage scaling  

---

## Pre-Deployment Requirements ✓
- [x] **Replit Account**: Access to BeeHiveStack workspace
- [x] **Domain Owned**: beehivestack.net purchased through Namecheap
- [x] **Application Ready**: Professional site built and tested
- [x] **SSL Ready**: Replit provides automatic SSL certificates
- [x] **Stripe Preparation**: Site optimized for payment processor approval

---

## Step 1: Deploy on Replit (5-10 minutes)
- [ ] **Click "Deploy" button** in your Replit workspace toolbar
- [ ] **Select "Autoscale"** deployment type (recommended for Express apps)
- [ ] **Choose deployment name**: `beehivestack-production`
- [ ] **Verify build command**: `npm run build` (if build step needed)
- [ ] **Verify start command**: `npm start`
- [ ] **Wait for deployment** to complete successfully
- [ ] **Test deployment URL**: Visit the generated `.replit.app` URL
- [ ] **Confirm functionality**: Email signup, navigation, policy modals

**Notes**: Autoscale automatically handles traffic spikes and scales to zero when idle, making it cost-effective for new launches.

---

## Step 2: Configure Custom Domain (10-15 minutes)
- [ ] **Navigate to Deployments tab** in your Replit workspace
- [ ] **Click Settings** → **"Link a domain"**
- [ ] **Enter domain name**: `beehivestack.net`
- [ ] **Copy DNS records** provided by Replit:
  - A Record: `@` pointing to IP address: `_______________`
  - TXT Record: `@` with verification value: `_______________`
- [ ] **Save the IP address** for next step

**Important**: Write down the exact IP address and TXT value - you'll need these for Namecheap.

---

## Step 3: Update DNS at Namecheap (5-10 minutes)
- [ ] **Log into Namecheap** account at namecheap.com
- [ ] **Navigate to Domain List** → Click "Manage" next to beehivestack.net
- [ ] **Click "Advanced DNS"** tab
- [ ] **DELETE existing A records** pointing to beehivestack.net
- [ ] **ADD new A record**:
  - Host Record: `@` (or leave blank)
  - Value/IP Address: [IP from Replit Step 2]
  - TTL: `Automatic`
- [ ] **ADD TXT record** for domain verification:
  - Host: `@` (or leave blank)
  - Value: [TXT value from Replit Step 2]
  - TTL: `Automatic`
- [ ] **OPTIONAL - ADD CNAME for www**:
  - Host: `www`
  - Value: `beehivestack.net`
  - TTL: `Automatic`
- [ ] **Save all changes**

**Critical**: Ensure old A records are deleted to prevent conflicts. Only one set of A records should exist.

---

## Step 4: Wait for DNS Propagation (30 minutes - 48 hours)
- [ ] **Return to Replit** Deployment Settings
- [ ] **Monitor domain status** - wait for "Verified" status
- [ ] **Test primary domain**: `https://beehivestack.net`
- [ ] **Test www subdomain**: `https://www.beehivestack.net` (if CNAME added)
- [ ] **Verify SSL certificate**: Look for padlock icon in browser
- [ ] **Check DNS propagation**: Use tools like whatsmydns.net if needed

**Patience Required**: DNS can take up to 48 hours, but usually completes in 30 minutes to 2 hours.

---

## Step 5: Final Testing & Go-Live (10 minutes)
### Functionality Testing
- [ ] **Email signup form**: Test with real email address
- [ ] **Navigation links**: All sections scroll correctly
- [ ] **Policy modals**: Privacy, Terms, Refund policies open properly
- [ ] **Mobile responsiveness**: Test on phone and tablet
- [ ] **Contact information**: Verify support@beehivestack.net mentioned correctly

### Technical Testing  
- [ ] **Page load speed**: Site loads in under 3 seconds
- [ ] **SSL security**: HTTPS works without warnings
- [ ] **Form submission**: Email capture works and shows success message
- [ ] **Error handling**: Test invalid email addresses

### Business Readiness
- [ ] **Content accuracy**: All business information is correct
- [ ] **Legal compliance**: Policies reference BeeHiveStack LLC properly
- [ ] **Contact details**: Business hours and support email accurate
- [ ] **Stripe readiness**: Site presents professional business image

---

## Step 6: Post-Launch Monitoring (Ongoing)
### Weekly Tasks
- [ ] **Monitor deployment logs** in Replit for any errors
- [ ] **Check email signups** are being captured properly
- [ ] **Review site performance** and loading times
- [ ] **Test email signup flow** periodically

### Monthly Tasks  
- [ ] **Review deployment costs** and usage patterns
- [ ] **Check domain expiration date** (yearly Namecheap renewal)
- [ ] **Backup email subscriber list** from storage
- [ ] **Monitor site uptime** and availability

### Business Milestones
- [ ] **Apply for Stripe account** once site is live and stable
- [ ] **Set up Google Analytics** for traffic monitoring (optional)
- [ ] **Plan Phase 2** rollout per roadmap
- [ ] **Update contact information** if business details change

---

## Troubleshooting Common Issues

### Domain Not Resolving
- **Check**: DNS propagation using whatsmydns.net
- **Solution**: Wait longer (up to 48 hours) or contact Namecheap support

### SSL Certificate Error
- **Check**: Domain verification status in Replit
- **Solution**: Ensure TXT record is properly configured

### Site Not Loading
- **Check**: Deployment logs in Replit for errors
- **Solution**: Redeploy if needed, check start command configuration

### Email Form Not Working  
- **Check**: Network tab in browser for API errors
- **Solution**: Verify API endpoints are working in deployment logs

---

## Emergency Contacts & Resources
- **Replit Support**: Available through workspace help system
- **Namecheap Support**: Available 24/7 through live chat
- **Domain Registrar**: Namecheap (login required for DNS changes)
- **Backup Plan**: Can revert DNS to previous settings if needed

---

## Success Checklist - Launch Complete ✓
- [ ] **beehivestack.net loads** with HTTPS and no warnings
- [ ] **Email signup functional** and captures leads
- [ ] **Professional appearance** suitable for Stripe application  
- [ ] **All policies accessible** and legally compliant
- [ ] **Mobile-friendly** and fast loading
- [ ] **Business contact information** accurate and professional
- [ ] **Ready for Phase 2** development and payment integration

**Congratulations!** Your professional website is now live and ready for business growth.

---

*Generated: January 2025*  
*For: BeeHiveStack LLC Professional Website Launch*  
*Platform: Replit Autoscale Deployment*