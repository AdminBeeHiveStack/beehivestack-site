# Updated DNS Records for Namecheap

## Issue Identified
SendGrid generated new DNS records with different subdomain names. You need to add these additional records to Namecheap.

## Records to Add in Namecheap Advanced DNS

**New CNAME Records:**
```
Type: CNAME | Host: em4619 | Value: u55129637.wl138.sendgrid.net
Type: CNAME | Host: url5322 | Value: sendgrid.net
```

**Check Existing Records:**
Make sure these existing records are still there:
```
Type: CNAME | Host: s1._domainkey | Value: s1.domainkey.u55129637.wl138.sendgrid.net
Type: CNAME | Host: s2._domainkey | Value: s2.domainkey.u55129637.wl138.sendgrid.net
Type: CNAME | Host: 55129637 | Value: sendgrid.net
Type: TXT | Host: _dmarc | Value: v=DMARC1; p=none;
```

## Namecheap Instructions
1. Log into Namecheap
2. Go to Domain List → Manage beehivestack.net
3. Click "Advanced DNS" tab
4. Add the two new CNAME records:
   - Host: `em4619` → Value: `u55129637.wl138.sendgrid.net`
   - Host: `url5322` → Value: `sendgrid.net`
5. Verify all other records are still present

## After Adding Records
1. Wait 5-10 minutes for DNS propagation
2. Return to SendGrid and click "Verify"
3. Domain authentication should complete successfully