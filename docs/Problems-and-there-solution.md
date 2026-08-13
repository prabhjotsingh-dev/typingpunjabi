# Problems and Solutions

This page logs the problems encountered during the development of TypingPunjabi and how they were solved. 

Before adding a new problem, please review the [Problem Template](Problem-Template.md) to maintain a consistent format.

---

## 📑 Table of Contents

- [Environment & Setup](#environment--setup)
- [Development & Coding](#development--coding)
- [Database & Storage](#database--storage)
- [Deployment & Hosting](#deployment--hosting)
- [Miscellaneous](#miscellaneous)

---

## 🛠️ Environment & Setup

*(Add setup-related issues here)*

---

## 💻 Development & Coding

*(Add code-related issues here)*

---

## 🗄️ Database & Storage

### Supabase Project Pausing After 7 Days of Inactivity

**Date:** 2026-07-26
**Category:** Database & Storage

**Problem Description:**
Supabase automatically pauses the database project after 7 days of no interaction (on the free tier). This causes the application to break or become unresponsive until the database is manually resumed from the Supabase dashboard.

**Root Cause:**
This is a standard behavior of Supabase's free tier policy to conserve resources for inactive projects.

**Solution:**
Created a cron job to automatically update a row in a specific table on a regular schedule. This scheduled operation simulates interaction with the database, keeping it active and preventing the 7-day auto-pause from triggering.

*(Add database-related issues here)*

---

## 🚀 Deployment & Hosting

*(Add deployment-related issues here)*

---

## ❓ Miscellaneous

*(Add any other issues here)*
