# Google Apps Script Auto-Responder & Live Metrics

This directory contains the production backend script for the **Vishv Bhavsar Portfolio**.

### File: `Code.gs`

#### Capabilities:
1. **Live Metrics (`doGet`)**: Tracks real portfolio visits and contact inquiries stored safely in Google Cloud `PropertiesService`.
2. **Auto-Responder Email (`doPost`)**: Automatically delivers a confirmation email to the sender from your Gmail, containing:
   - A copy of the subject & message submitted
   - Direct button to **Visit Portfolio** pointing to `https://vishv05.github.io/Portfolio-2026/`
   - Direct button to **Connect on LinkedIn**

### How to update Google Apps Script in 1 minute:
1. Go to **[script.google.com](https://script.google.com/)** and open your portfolio project.
2. Select `Code.gs` and replace its contents with the code in [`Code.gs`](./Code.gs).
3. Click **Save** (`Ctrl + S`).
4. Click **Deploy** &rarr; **Manage deployments**.
5. Click the **Pencil (Edit)** icon on your active deployment:
   - Under **Version**, choose **New version**.
   - Ensure **Who has access** is set to **Anyone**.
6. Click **Deploy**.
