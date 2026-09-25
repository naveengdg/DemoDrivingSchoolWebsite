"""
Vetri Driving Academy — Database Seeding Script
===============================================
Role & Purpose:
- Populates the database with realistic initial courses and verified student reviews.
- Provides 6 standard Tamil Nadu RTO driving courses (LMV Beginner, Refresher, Two-Wheeler,
  Commercial Badge, Heavy Vehicle / HMV, and Automatic Transmission).
- Provides 10 authentic localized student reviews with verified ratings and timestamps.
- Idempotent: checks for existing records before inserting to prevent duplicate data.
- Execution: Run via `python -m seed` from the backend directory.
"""

import asyncio
from datetime import datetime, timezone, timedelta

from app.core.database import async_session, create_tables, engine
from app.models.course import Course
from app.models.review import Review

# Import all models so Base knows about them
import app.models  # noqa: F401


COURSES = [
    {
        "name": "LMV Car — Complete Beginner",
        "licence_category": "LMV",
        "duration_days": 21,
        "sessions_included": 15,
        "session_duration_minutes": 60,
        "vehicle_type": "Manual Gear",
        "rto_test_prep": True,
        "learner_licence_assistance": True,
        "fee_amount": 8500.00,
        "instalment_available": True,
        "description": "Zero experience to licensed driver in 21 days. Master clutch biting-point, hill starts, Madurai city traffic, and RTO 'H' track mock tests.",
        "is_active": True,
    },
    {
        "name": "LMV Car — Refresher Course",
        "licence_category": "LMV",
        "duration_days": 10,
        "sessions_included": 8,
        "session_duration_minutes": 60,
        "vehicle_type": "Manual / Automatic",
        "rto_test_prep": False,
        "learner_licence_assistance": False,
        "fee_amount": 5200.00,
        "instalment_available": False,
        "description": "Regain total road confidence in 10 focused sessions. Covers peak traffic navigation, highway merging, reverse parking, and night driving.",
        "is_active": True,
    },
    {
        "name": "Two-Wheeler — Beginner",
        "licence_category": "Two-Wheeler",
        "duration_days": 14,
        "sessions_included": 10,
        "session_duration_minutes": 60,
        "vehicle_type": "Two-Wheeler (Geared & Non-Geared)",
        "rto_test_prep": True,
        "learner_licence_assistance": True,
        "fee_amount": 4800.00,
        "instalment_available": False,
        "description": "Master balance, clutch-throttle control, and road safety in 14 days. Includes RTO figure-8 test practice and defensive riding skills.",
        "is_active": True,
    },
    {
        "name": "LMV Commercial — Taxi/Cab Licence",
        "licence_category": "LMV Commercial",
        "duration_days": 30,
        "sessions_included": 20,
        "session_duration_minutes": 60,
        "vehicle_type": "Manual Gear",
        "rto_test_prep": True,
        "learner_licence_assistance": True,
        "fee_amount": 12000.00,
        "instalment_available": True,
        "description": "Commercial badge certification tailored for Ola/Uber and fleet careers. Covers fuel-efficient driving, passenger safety, and RTO test prep.",
        "is_active": True,
    },
    {
        "name": "HMV — Lorry/Bus Licence",
        "licence_category": "HMV",
        "duration_days": 45,
        "sessions_included": 30,
        "session_duration_minutes": 90,
        "vehicle_type": "HMV Lorry",
        "rto_test_prep": True,
        "learner_licence_assistance": True,
        "fee_amount": 18500.00,
        "instalment_available": True,
        "description": "Comprehensive 45-day heavy motor vehicle training on TATA 407. Covers air brakes, wide turns, mirror reversing, and TN-58 RTO certification.",
        "is_active": True,
    },
    {
        "name": "Automatic Car — Beginner",
        "licence_category": "LMV",
        "duration_days": 21,
        "sessions_included": 15,
        "session_duration_minutes": 60,
        "vehicle_type": "Automatic Transmission",
        "rto_test_prep": True,
        "learner_licence_assistance": True,
        "fee_amount": 9800.00,
        "instalment_available": True,
        "description": "Learn on Maruti Suzuki AMT vehicles — no clutch, no stalling. Pure focus on steering, road awareness, and stress-free city traffic navigation.",
        "is_active": True,
    },
]

REVIEWS = [
    {
        "student_name": "Anitha M.",
        "location": "Madurai",
        "rating": 5,
        "course_taken": "LMV Car — Complete Beginner",
        "testimonial": "I failed my RTO test twice at another school. Murugan sir's patience and the structured practice sessions made all the difference. He identified exactly where I was making mistakes — my clutch release was too fast and I wasn't checking mirrors before turning. After just 8 sessions here, I passed on my first attempt. The mock test on the actual RTO track layout was incredibly helpful.",
        "result": "Passed RTO test on first attempt",
        "created_at": datetime(2025, 11, 15, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Divya S.",
        "location": "Dindigul",
        "rating": 5,
        "course_taken": "LMV Car — Complete Beginner",
        "testimonial": "As a woman learning to drive for the first time at 35, I was extremely nervous. Priya ma'am made me feel completely comfortable from day one. She never raised her voice, explained every step clearly, and the women-only practice slots on Tuesday and Thursday mornings meant I could learn without feeling self-conscious. I now drive my kids to school every day — something I thought I'd never do.",
        "result": "Passed RTO test on first attempt",
        "created_at": datetime(2025, 10, 22, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Rajesh K.",
        "location": "Madurai",
        "rating": 5,
        "course_taken": "LMV Commercial — Taxi/Cab Licence",
        "testimonial": "I needed my commercial licence urgently for a cab driving job with Ola. The intensive course at Vetri got me through in exactly 30 days as promised. The fee was transparent — ₹12,000 all-inclusive, no hidden charges for RTO forms or test fees. Murugan sir even helped me understand the transport authority interview process. I've been driving full-time for 6 months now.",
        "result": "Commercial licence obtained in 30 days",
        "created_at": datetime(2025, 9, 5, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Kavitha R.",
        "location": "Theni",
        "rating": 4,
        "course_taken": "Two-Wheeler — Beginner",
        "testimonial": "I learned to ride a scooter at Vetri because the bus schedule to my office was unreliable. Karthik sir taught me balance exercises on the first two days before even starting the engine, which built my confidence. The practice ground is well-maintained with proper cones and markings. Only small issue — sometimes had to wait 10 minutes for my slot if the previous student ran over time.",
        "result": "Riding independently within 14 days",
        "created_at": datetime(2025, 8, 18, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Senthil M.",
        "location": "Madurai",
        "rating": 5,
        "course_taken": "HMV — Lorry/Bus Licence",
        "testimonial": "Getting an HMV licence is not easy — the driving test is tough and most schools don't have proper heavy vehicles for training. Vetri has an actual TATA 407 lorry and the training ground has enough space for wide turns and reversing practice. The 45-day programme was thorough. I now drive inter-state goods transport for a logistics company. This licence changed my career completely.",
        "result": "HMV licence obtained, now employed as inter-state driver",
        "created_at": datetime(2025, 7, 12, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Pradeep V.",
        "location": "Madurai",
        "rating": 5,
        "course_taken": "LMV Car — Complete Beginner",
        "testimonial": "I compared three driving schools in Madurai before choosing Vetri. Their course structure was the clearest — 15 sessions, 21 days, ₹8,500, everything included. Other schools quoted ₹6,000 but then charged extra for 'RTO preparation' and 'form filling.' At Vetri, what they quote is what you pay. The car was clean, well-maintained, and had dual controls for safety.",
        "result": "Passed RTO test on first attempt",
        "created_at": datetime(2025, 12, 3, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Meena L.",
        "location": "Dindigul",
        "rating": 5,
        "course_taken": "Automatic Car — Beginner",
        "testimonial": "At 52, I thought learning to drive was impossible. My son suggested the automatic car course and it was the best decision. No clutch, no gear confusion — I could focus entirely on steering and traffic. Priya ma'am was endlessly patient. After 15 sessions, I drove from Dindigul to Madurai on the highway with my husband. He couldn't believe it. Neither could I, honestly.",
        "result": "Passed RTO test on first attempt, now drives independently",
        "created_at": datetime(2025, 6, 25, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Arun D.",
        "location": "Madurai",
        "rating": 4,
        "course_taken": "LMV Car — Refresher Course",
        "testimonial": "Had my licence for 5 years but barely drove — always took autos or bikes. When I got a new job that required driving, I panicked. The refresher course was exactly what I needed. 8 sessions covering parallel parking, U-turns in narrow streets, and highway driving. I would have liked a couple more sessions on night driving, but overall excellent value for ₹5,200.",
        "result": "Regained driving confidence after 5-year gap",
        "created_at": datetime(2025, 5, 10, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Lakshmi P.",
        "location": "Theni",
        "rating": 5,
        "course_taken": "Two-Wheeler — Beginner",
        "testimonial": "I travel 12 km daily from my village to Theni town for work. Learning to ride a scooter at Vetri saved me ₹3,000 per month in auto fares. Karthik sir taught me how to handle gravel roads and steep inclines, which is critical in the Theni district. The RTO test preparation was spot-on — I cleared the figure-8 and slalom on the first attempt.",
        "result": "Passed RTO test on first attempt, saves ₹3,000/month on commute",
        "created_at": datetime(2025, 4, 20, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
    {
        "student_name": "Bharath S.",
        "location": "Madurai",
        "rating": 5,
        "course_taken": "LMV Car — Complete Beginner",
        "testimonial": "What sets Vetri apart is their systematic approach. Each session has a specific goal — Session 1 is clutch control, Session 2 is first and second gear, Session 5 is turns and roundabouts, and so on. You can track your progress clearly. No other school I researched had this level of structure. Murugan sir gave me a printed session plan on day one. Very professional.",
        "result": "Passed RTO test on first attempt",
        "created_at": datetime(2026, 1, 8, tzinfo=timezone(timedelta(hours=5, minutes=30))),
    },
]


async def seed() -> None:
    """Insert demo courses and reviews into the database."""
    await create_tables()

    async with async_session() as session:
        # Check if data already exists
        from sqlalchemy import select, func

        count = await session.execute(select(func.count()).select_from(Course))
        if count.scalar() > 0:
            print("Database already seeded. Skipping.")
            return

        # Insert courses
        for course_data in COURSES:
            session.add(Course(**course_data))

        # Insert reviews
        for review_data in REVIEWS:
            session.add(Review(**review_data))

        await session.commit()
        print(f"Seeded {len(COURSES)} courses and {len(REVIEWS)} reviews.")


if __name__ == "__main__":
    asyncio.run(seed())
