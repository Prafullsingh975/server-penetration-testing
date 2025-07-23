# Backend & Penetration Testing

**Topics:** `API rate limiting, DDOS protection, and captcha`
**Description:** `This repository is focused on APIs vulnerability and api security. In this project we focus what are the api vulnerability and how we secure it.`

---

# 1. Brute force

## Project Structure

- Attack Folder: `It contain code for penetration testing and otp bypass against brut force approach`

- Backend Folder: `It contain two types of APIs vulnerability and secure. APIs which have vulnerability are bypass by attack script but attack script can not bypass secure api`

---

## Problem

### Let's understand the problem statement:

You have a api for reset user password that api needs a new password and a 4-digit otp from the user.You are trying to reset the password of you account but you don't have the `opt` but you can `guess` it because otp is of 4-digit which lies between `0000 to 9999`. you can easily write a for loop from 0 to 9999 and start hitting the api with different otp and new password. It will work for one password.

This is the exactly same what i implemented.

we have two api one for generating otp and other for reset password.

```bash
POST /generate-otp
body:{"email":""}
```

```bash
POST /reset-password
body:{"otp":"",email:"",newPassword:""}
```

You can use above api and implement the above seniors with the help of attack script inside attack folder.
`The above api get bypass`

### Solution:

I fixed the vulnerability. If i restrict the attacker to do continuous api call then i can secure the end point.

I implement a rate limit and create tow new api for the same generate otp and reset password but this time i added rate limit to both of the apis.

```bash
POST /rate-limit/generate-otp
body:{"email":""}
```

```bash
POST /rate-limit/reset-password
body:{"otp":"",email:"",newPassword:""}
```

You can use above api and implement the above seniors with the help of attack script inside attack folder.
`The above api block attacker after 5 request and he is not able to bypass the api`

---

# 2. DDoS (Distributed Denial of Service)

DDoS (Distributed Denial of Service) is a type of cyber attack where multiple compromised systems (often part of a botnet) send an overwhelming amount of traffic to a target server, application, or network.
The goal is to exhaust resources (bandwidth, CPU, memory, database connections) so that legitimate users can’t access the service.

### Impact of DDoS Attacks

- Service downtime → loss of customers and revenue.
- Increased server/cloud costs due to spike in traffic.
- Reputational damage (users see the service as unreliable).
- Possible chain reaction failures in other systems (databases, APIs).

### Solution:

- You can use cloudflare proxy on your domain both on frontend and backend.
- Captcha (Cloudflare also provide this service)
