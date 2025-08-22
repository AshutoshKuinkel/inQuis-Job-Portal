// utils/emails/generate_confirmation_email.ts

export const generate_confirmation_email = (application: any, job: any, user: any) => {
  const jobTitle = job?.title || "the job";
  const company = job?.companyName || "Company";
  const applicantName = user?.first_name || "Applicant";
  const applicantEmail = application?.contactEmail || "Not Provided";
  const status = application?.status || "PENDING";
  const resumePath = application?.resume?.path || "#";
  const coverLetterPath = application?.coverLetter?.path || "#";

  const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #2c3e50;
        }
        .section {
          margin-bottom: 20px;
        }
        .section h3 {
          margin-bottom: 10px;
          color: #444;
        }
        .details p {
          margin: 5px 0;
        }
        a.button {
          display: inline-block;
          padding: 10px 15px;
          background-color: #2c3e50;
          color: #fff !important;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received</h1>
          <p>Thank you for applying to the <strong>${jobTitle}</strong> position at <strong>${company}</strong>.</p>
        </div>

        <div class="section">
          <h3>Your Application Details</h3>
          <div class="details">
            <p><strong>Name:</strong> ${applicantName}</p>
            <p><strong>Email:</strong> ${applicantEmail}</p>
            <p><strong>Status:</strong> ${status}</p>
          </div>
        </div>

        <div class="section">
          <h3>Submitted Documents</h3>
          <p>
            <a class="button" href="${resumePath}" target="_blank">View Resume</a>
          </p>
          <p>
            <a class="button" href="${coverLetterPath}" target="_blank">View Cover Letter</a>
          </p>
        </div>

        <div class="footer">
          <p>We’ll notify you once the employer reviews your application.</p>
          <p><em>Good luck!</em></p>
        </div>
      </div>
    </body>
  </html>
  `;

  return html;
};

export const generate_status_update_email = (application: any, job: any, user: any) => {
  const jobTitle = job?.title || "the job";
  const company = job?.companyName || "Company";
  const applicantName = user?.first_name || "Applicant";
  const applicantEmail = application?.contactEmail || "Not Provided";
  const status = application?.status || "PENDING";
  const resumePath = application?.resume?.path || "#";
  const coverLetterPath = application?.coverLetter?.path || "#";

  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #4F46E5;">Application Status Update</h1>
        <p>Hello <strong>${applicantName}</strong>,</p>
        <p>Your application for <strong>${jobTitle}</strong> at <strong>${company}</strong> has been updated.</p>

        <h2>Application Details</h2>
        <p><strong>Email:</strong> ${applicantEmail}</p>
        <p><strong>New Status:</strong> <span style="color:${status === "ACCEPTED" ? "green" : "red"}">${status}</span></p>

        <h2>Submitted Documents</h2>
        <p>
          <a href="${resumePath}" target="_blank">View Resume</a><br/>
          <a href="${coverLetterPath}" target="_blank">View Cover Letter</a>
        </p>

        <p style="margin-top:20px;">Thank you for using <strong>inQuis Job Portal</strong>.</p>
      </body>
    </html>
  `;
};


export const generate_employer_application_email = (application: any, job: any) => {
  const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #2c3e50;
        }
        .section {
          margin-bottom: 20px;
        }
        .section h3 {
          margin-bottom: 10px;
          color: #444;
        }
        .details p {
          margin: 5px 0;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #777;
          margin-top: 30px;
        }
        a.button {
          display: inline-block;
          padding: 10px 15px;
          background-color: #2c3e50;
          color: #fff !important;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Job Application</h1>
          <p>An applicant has just applied for your job posting.</p>
        </div>

        <div class="section">
          <h3>Job Details</h3>
          <div class="details">
            <p><strong>Title:</strong> ${job.title}</p>
            <p><strong>Company:</strong> ${job.companyName}</p>
          </div>
        </div>

        <div class="section">
          <h3>Applicant Details</h3>
          <div class="details">
            <p><strong>Email:</strong> ${application.contactEmail}</p>
            <p><strong>Status:</strong> ${application.status}</p>
          </div>
        </div>

        <div class="section">
          <h3>Documents</h3>
          <p>
            <a class="button" href="${application.resume.path}" target="_blank">View Resume</a>
          </p>
          <p>
            <a class="button" href="${application.coverLetter.path}" target="_blank">View Cover Letter</a>
          </p>
        </div>

        <div class="footer">
          <p>Log in to your dashboard to review this application.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  return html;
};