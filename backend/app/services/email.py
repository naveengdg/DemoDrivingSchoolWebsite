"""
Vetri Driving Academy — Automated Email Notification Service
============================================================
Role & Purpose:
- Delivers instant real-time email alerts to the driving academy owner whenever a learner
  submits an enrolment enquiry on the website.
- Builds a responsive, branded HTML email template complete with applicant name, phone,
  course selected, optional message, and instant 1-click WhatsApp/Call action buttons.
- Connects securely via Gmail SMTP (STARTTLS on port 587) with UTF-8 header encoding.
- Dispatches asynchronously in a background thread executor so student form submissions
  experience zero latency or blocking.
"""

import asyncio
from datetime import datetime, timezone, timedelta
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import logging
import os
from pathlib import Path
import smtplib

from app.core.config import settings

logger = logging.getLogger("uvicorn.error")

IST = timezone(timedelta(hours=5, minutes=30))


# ---------------------------------------------------------------------------
# HTML Builders
# ---------------------------------------------------------------------------

def _build_owner_notification_html(enquiry: dict, timestamp_str: str) -> str:
    """Build a professional HTML email notification for the driving academy owner."""
    name = enquiry.get("name", "Unknown Learner")
    phone = enquiry.get("phone", "Not Provided")
    email = enquiry.get("email") or "Not Provided"
    course = enquiry.get("course_interest", "General Enquiry")
    message = enquiry.get("message") or "No additional message provided."
    source = enquiry.get("source_page", "Website")

    # Clean 10-digit phone for WhatsApp
    clean_phone = "".join(filter(str.isdigit, phone))
    if len(clean_phone) == 10:
        whatsapp_phone = f"91{clean_phone}"
    else:
        whatsapp_phone = clean_phone

    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Enrolment Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 28px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
      <div style="display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
        Vetri Driving Academy • Madurai
      </div>
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
        🚗 New Enrolment Lead Received!
      </h1>
      <p style="color: #cbd5e1; font-size: 13px; margin: 6px 0 0 0;">
        Received on {timestamp_str} (IST)
      </p>
    </div>

    <!-- Content Body -->
    <div style="padding: 28px 24px;">
      <p style="font-size: 15px; line-height: 1.5; color: #334155; margin-top: 0;">
        Hello <strong>Owner &amp; Admissions Team</strong>,
      </p>
      <p style="font-size: 14px; line-height: 1.5; color: #475569;">
        A new student has applied for driving training on the website. Below are the enquiry details:
      </p>

      <!-- Key Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 38%;">Student Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 16px;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
            <td style="padding: 8px 0; font-weight: 700;">
              <a href="tel:{phone}" style="color: #d97706; text-decoration: none; font-size: 15px;">📞 {phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a;">
              {f'<a href="mailto:{email}" style="color: #2563eb; text-decoration: none;">{email}</a>' if email != 'Not Provided' else '<span style="color: #94a3b8;">Not provided</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Course Requested:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">
              <span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; border: 1px solid #fde68a;">
                {course}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Source Page:</td>
            <td style="padding: 8px 0; color: #64748b;">{source}</td>
          </tr>
        </table>

        <!-- Student Message -->
        <div style="margin-top: 14px; pt-3; border-top: 1px dashed #cbd5e1; padding-top: 12px;">
          <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">
            Student Notes / Requirements:
          </div>
          <div style="background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-style: italic; color: #334155; font-size: 13px;">
            "{message}"
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="margin: 24px 0 16px 0; text-align: center;">
        <a href="tel:{phone}" style="display: inline-block; background-color: #f59e0b; color: #0f172a; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 4px; font-size: 14px; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);">
          📞 Call {name}
        </a>
        <a href="https://wa.me/{whatsapp_phone}?text=Hello%20{name},%20this%20is%20Vetri%20Driving%20Academy%20following%20up%20on%20your%20enrolment%20for%20{course}." style="display: inline-block; background-color: #25d366; color: #ffffff; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 4px; font-size: 14px; box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);">
          💬 WhatsApp Student
        </a>
      </div>

      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        This automated lead notification was generated by the Vetri Driving Academy Admissions System.<br>
        Direct notifications to: <strong>{settings.admin_email}</strong>
      </p>
    </div>
  </div>
</body>
</html>"""


def _build_student_confirmation_html(enquiry: dict, timestamp_str: str) -> str:
    """Build a warm acknowledgement email for the student who submitted the enquiry."""
    name = enquiry.get("name", "there")
    course = enquiry.get("course_interest", "Driving Course")
    phone = enquiry.get("phone", "Not Provided")
    message = enquiry.get("message") or ""

    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Enquiry Received – Vetri Driving Academy</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
      <div style="display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
        Vetri Driving Academy • Madurai
      </div>
      <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 700;">
        Thank You, {name}! 🎉
      </h1>
      <p style="color: #cbd5e1; font-size: 14px; margin: 0;">
        Your enquiry has been received successfully.
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px 24px;">
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">
        Hi <strong>{name}</strong>,
      </p>
      <p style="font-size: 14px; line-height: 1.7; color: #475569;">
        We have received your enquiry for the <strong style="color: #0f172a;">{course}</strong> at Vetri Driving Academy, Madurai.
        Our admissions team will review your details and reach out to you shortly on <strong style="color: #d97706;">{phone}</strong>.
      </p>

      <!-- Summary Card -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
          Your Enquiry Summary
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 7px 0; color: #64748b; font-weight: 600; width: 40%;">Course Interest:</td>
            <td style="padding: 7px 0; font-weight: 700;">
              <span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; border: 1px solid #fde68a;">{course}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #64748b; font-weight: 600;">Contact Number:</td>
            <td style="padding: 7px 0; color: #0f172a;">{phone}</td>
          </tr>
          <tr>
            <td style="padding: 7px 0; color: #64748b; font-weight: 600;">Submitted On:</td>
            <td style="padding: 7px 0; color: #0f172a;">{timestamp_str} (IST)</td>
          </tr>
          {"<tr><td style='padding: 7px 0; color: #64748b; font-weight: 600; vertical-align: top;'>Your Message:</td><td style='padding: 7px 0; color: #334155; font-style: italic;'>" + message + "</td></tr>" if message else ""}
        </table>
      </div>

      <!-- What Happens Next -->
      <div style="background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 0 0 24px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #92400e; margin-bottom: 10px;">⏱️ What Happens Next?</div>
        <ul style="margin: 0; padding-left: 18px; color: #78350f; font-size: 13px; line-height: 1.8;">
          <li>Our team will call you within <strong>24 hours</strong> on the number provided.</li>
          <li>We'll discuss the course schedule, fees, and batch availability.</li>
          <li>You'll receive all details to begin your training journey!</li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 13px; margin: 0 0 12px 0;">Have questions? Reach us directly:</p>
        <a href="tel:+914422334455" style="display: inline-block; background-color: #f59e0b; color: #0f172a; font-weight: 700; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin: 4px; font-size: 13px;">
          📞 Call Us
        </a>
        <a href="https://wa.me/914422334455" style="display: inline-block; background-color: #25d366; color: #ffffff; font-weight: 700; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin: 4px; font-size: 13px;">
          💬 WhatsApp Us
        </a>
      </div>

      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        This is an automated confirmation from Vetri Driving Academy.<br>
        Please do not reply directly to this email.
      </p>
    </div>
  </div>
</body>
</html>"""


# ---------------------------------------------------------------------------
# SMTP Transport
# ---------------------------------------------------------------------------

def _send_smtp_sync(subject: str, html_content: str, recipient: str) -> None:
    """Synchronous worker that connects to SMTP server and delivers the message."""
    recipient_list = [r.strip() for r in recipient.split(",") if r.strip()]
    if not recipient_list:
        logger.warning("No valid recipient specified for SMTP dispatch.")
        return

    smtp_host = settings.smtp_host.strip()
    smtp_port = int(settings.smtp_port)
    smtp_user = settings.smtp_user.strip()
    smtp_password = settings.smtp_password.strip()
    smtp_from = settings.smtp_from_email.strip()

    msg = MIMEMultipart("alternative")
    msg["Subject"] = Header(subject, "utf-8")
    msg["From"] = f"Vetri Driving Academy <{smtp_from}>"
    msg["To"] = ", ".join(recipient_list)

    part = MIMEText(html_content, "html", "utf-8")
    msg.attach(part)

    # Direct port 465 if configured
    if smtp_port == 465:
        with smtplib.SMTP_SSL(smtp_host, 465, timeout=20) as server:
            if smtp_user and smtp_password:
                server.login(smtp_user, smtp_password)
            server.sendmail(smtp_from, recipient_list, msg.as_string())
            return

    # Try standard port (587 STARTTLS) with automatic fallback to port 465 SSL
    last_error = None
    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
            if settings.smtp_use_tls:
                server.starttls()
            if smtp_user and smtp_password:
                server.login(smtp_user, smtp_password)
            server.sendmail(smtp_from, recipient_list, msg.as_string())
            return
    except Exception as primary_err:
        last_error = primary_err
        logger.warning(f"SMTP via port {smtp_port} failed: {primary_err}. Attempting port 465 SSL fallback...")

    # Fallback to port 465 SSL
    try:
        with smtplib.SMTP_SSL(smtp_host, 465, timeout=20) as ssl_server:
            if smtp_user and smtp_password:
                ssl_server.login(smtp_user, smtp_password)
            ssl_server.sendmail(smtp_from, recipient_list, msg.as_string())
            logger.info("✅ SMTP dispatched successfully via port 465 SSL fallback.")
            return
    except Exception as fallback_err:
        logger.error(f"SMTP port 465 fallback also failed: {fallback_err}")
        raise last_error or fallback_err


def _send_resend_http(subject: str, html_content: str, recipient: str) -> None:
    """Send email via Resend REST API over standard HTTPS (Port 443).
    Bypasses cloud provider egress blocks on SMTP ports 25, 465, and 587.
    """
    import json
    import urllib.request

    recipient_list = [r.strip() for r in recipient.split(",") if r.strip()]
    if not recipient_list:
        return

    url = "https://api.resend.com/emails"
    from_addr = "Vetri Driving Academy <onboarding@resend.dev>"
    payload = {
        "from": from_addr,
        "to": recipient_list,
        "subject": subject,
        "html": html_content,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {settings.resend_api_key.strip()}",
            "Content-Type": "application/json",
            "User-Agent": "VetriDrivingAcademy/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        if resp.status not in (200, 201):
            body = resp.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"Resend API error {resp.status}: {body}")


# Resolve log path next to the backend .env file (absolute, not relative to CWD)
_LOG_PATH = Path(__file__).resolve().parent.parent.parent / "enquiry_dispatches.log"


# ---------------------------------------------------------------------------
# Public notification functions
# ---------------------------------------------------------------------------

async def send_enquiry_notification_to_owner(enquiry: dict) -> bool:
    """Deliver an enquiry notification to the business owner/admin email.

    1. Logs the formatted enquiry to local journal.
    2. Dispatches via Resend REST API (over HTTPS Port 443) if RESEND_API_KEY is configured.
    3. Otherwise falls back to SMTP if SMTP credentials are provided.
    """
    now_ist = datetime.now(IST).strftime("%d %b %Y, %I:%M %p")
    student_name = enquiry.get("name", "Student")
    course = enquiry.get("course_interest", "Driving Course")
    subject = f"[Vetri Driving] New Enrolment Lead: {course} - {student_name}"

    html_content = _build_owner_notification_html(enquiry, now_ist)

    # 1. Log lead to local dispatches journal file (leads are never lost)
    try:
        with open(_LOG_PATH, "a", encoding="utf-8") as f:
            f.write(
                f"[{now_ist}] DISPATCH TO: {settings.admin_email} | "
                f"NAME: {student_name} | PHONE: {enquiry.get('phone')} | "
                f"COURSE: {course} | EMAIL: {enquiry.get('email')} | "
                f"SOURCE: {enquiry.get('source_page')}\n"
            )
    except Exception as log_err:
        logger.warning(f"Could not append to enquiry_dispatches.log: {log_err}")

    # 2. Try Resend HTTP API first (works over standard HTTPS Port 443, never blocked by Render)
    if settings.resend_api_key:
        try:
            logger.info(
                f"Dispatching owner notification via Resend HTTP API to {settings.admin_email}..."
            )
            await asyncio.to_thread(_send_resend_http, subject, html_content, settings.admin_email)
            logger.info(f"✅ Owner notification email sent to {settings.admin_email} via Resend HTTP API")
            return True
        except Exception as resend_err:
            logger.error(f"❌ Resend HTTP API dispatch failed: {resend_err}", exc_info=True)

    # 3. Fallback to SMTP
    if settings.smtp_host and settings.smtp_user and settings.smtp_password:
        try:
            logger.info(
                f"Sending owner notification to {settings.admin_email} via {settings.smtp_host}..."
            )
            await asyncio.to_thread(_send_smtp_sync, subject, html_content, settings.admin_email)
            logger.info(f"✅ Owner notification email sent to {settings.admin_email}")
            return True
        except Exception as smtp_err:
            logger.error(f"❌ Failed to send owner notification via SMTP: {smtp_err}", exc_info=True)
            return False
    else:
        logger.warning(
            f"=== [DEV MODE] ENQUIRY NOTIFICATION (owner: {settings.admin_email}) ===\n"
            f"Subject: {subject}\n"
            f"Student: {student_name} ({enquiry.get('phone')})\n"
            f"Course: {course}\n"
            f"Logged to: {_LOG_PATH}\n"
            f"NOTE: Set RESEND_API_KEY (recommended for cloud) or SMTP_HOST in .env to send real emails.\n"
            f"======================================================================"
        )
        return False


async def send_enquiry_confirmation_to_student(enquiry: dict) -> bool:
    """Send an automated confirmation email to the student who submitted the enquiry.

    Only fires if the student provided a valid email address.
    """
    student_email = enquiry.get("email", "").strip()
    if not student_email or "@" not in student_email:
        logger.info("Student did not provide an email — skipping confirmation email.")
        return False

    now_ist = datetime.now(IST).strftime("%d %b %Y, %I:%M %p")
    student_name = enquiry.get("name", "there")
    course = enquiry.get("course_interest", "Driving Course")
    subject = f"[Vetri Driving Academy] Enquiry Received - {course}"

    html_content = _build_student_confirmation_html(enquiry, now_ist)

    if settings.smtp_host and settings.smtp_user and settings.smtp_password:
        try:
            logger.info(f"Sending confirmation email to student: {student_email}...")
            await asyncio.to_thread(_send_smtp_sync, subject, html_content, student_email)
            logger.info(f"✅ Confirmation email sent to student: {student_email}")
            return True
        except Exception as smtp_err:
            logger.error(f"❌ Failed to send student confirmation: {smtp_err}", exc_info=True)
            return False
    else:
        logger.info(
            f"=== [DEV MODE] STUDENT CONFIRMATION (to: {student_email}) ===\n"
            f"Subject: {subject}\n"
            f"Student: {student_name}\n"
            f"NOTE: Set SMTP_HOST, SMTP_USER & SMTP_PASSWORD in .env to send real emails.\n"
            f"============================================================="
        )
        return False


def send_enquiry_confirmation_to_student_sync(enquiry: dict) -> bool:
    """Synchronous wrapper for BackgroundTasks compatibility.

    FastAPI BackgroundTasks runs sync callables in a thread pool, which is
    more reliable than trying to run async functions that internally use
    asyncio.to_thread (which needs a running event loop).
    """
    student_email = (enquiry.get("email") or "").strip()
    if not student_email or "@" not in student_email:
        logger.info("Student did not provide an email — skipping confirmation email.")
        return False

    now_ist = datetime.now(IST).strftime("%d %b %Y, %I:%M %p")
    student_name = enquiry.get("name", "there")
    course = enquiry.get("course_interest", "Driving Course")
    subject = f"[Vetri Driving Academy] Enquiry Received - {course}"

    html_content = _build_student_confirmation_html(enquiry, now_ist)

    if settings.resend_api_key:
        try:
            logger.info(f"Sending confirmation email to student via Resend: {student_email}...")
            _send_resend_http(subject, html_content, student_email)
            logger.info(f"✅ Confirmation email sent to student via Resend: {student_email}")
            return True
        except Exception as resend_err:
            logger.warning(f"Student confirmation via Resend failed: {resend_err}")

    if settings.smtp_host and settings.smtp_user and settings.smtp_password:
        try:
            logger.info(f"Sending confirmation email to student: {student_email}...")
            _send_smtp_sync(subject, html_content, student_email)
            logger.info(f"✅ Confirmation email sent to student: {student_email}")
            return True
        except Exception as smtp_err:
            logger.error(f"❌ Failed to send student confirmation: {smtp_err}", exc_info=True)
            return False
    else:
        logger.info(
            f"=== [DEV MODE] STUDENT CONFIRMATION (to: {student_email}) ===\n"
            f"Subject: {subject}\n"
            f"Student: {student_name}\n"
            f"NOTE: Set SMTP_HOST, SMTP_USER & SMTP_PASSWORD in .env to send real emails.\n"
            f"============================================================="
        )
        return False

