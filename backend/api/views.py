# Create your views here.
import openai
import os
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv

# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from livekit import api
import uuid

import requests

from rest_framework import status
from .models import Blog, Contact , DailyUpdate
from .serializer import BlogSerializer, DailyUpdateSerializer

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

resume_text = """
Name: Satyam Singh
Email: satyamsinghss2203@gmail.com
Phone: +91-8957820454
LinkedIn: linkedin.com/in/satyam-singh-bb1751259
GitHub: github.com/satyamsingh22

Skills:
- Programming Languages: Java, C/C++, Python, JavaScript
- Technologies: HTML, CSS, JavaScript, React, Django, NodeJS, ExpressJS, Kafka, Docker, SQL, PHP, PostgreSQL, MongoDB, RESTful APIs, Celery Beat, Redis, Generative AI, LiveKit, Pinecone, LLM Models
- Cloud & Automation Tools: Google Cloud Platform (GCP), Amazon Web Services (AWS), n8n
- Tools: Git, Figma, Visual Studio Code, Jira, Cursor
- Technical Skills: Data Structures and Algorithms, Problem Solving
- Soft Skills: Teamwork, Communication, Adaptability, Critical Thinking, Time Management

Experience:
- Fawks.AI (April 2026 – Present), Founding Engineer, Remote
  * Built an AI-powered Voice, Chat, and WhatsApp automation platform from scratch using Django, Redis, Celery, LiveKit, Qdrant, and Meta WhatsApp APIs.
  * Developed scalable VoiceBot systems using LiveKit for real-time, two-way voice communication.
  * Implemented a knowledge base using Qdrant for semantic search and intelligent response generation.
  * Built WhatsApp automation agents using Meta APIs for lead handling and automated customer interactions.
  * Designed a campaign automation engine for lead nurturing, outreach, and conversion workflows.
  * Led product ideation, market research, and problem-solving to deliver business-focused solutions.
  * Deployed and scaled applications on GCP and Docker ensuring high availability and performance.

- Kipps.AI (Feb 2025 – April 2026), Senior Software Developer, Udaipur, Rajasthan
  * Contributed to the development of an advanced VoiceBot system using LiveKit, enabling real-time, two-way voice communication between users and AI agents.
  * Worked on intelligent ChatBot solutions using Pinecone to automate client interactions and improve response accuracy.
  * Involved in building a Meta WhatsApp Agent powered by a centralized Knowledge Base for automated replies, lead handling, and campaign execution.
  * Collaborated on the design and enhancement of a Campaign System for WhatsApp and VoiceBot leads to improve customer engagement and outreach efficiency.
  * Implemented automation workflows using n8n for lead processing, campaign scheduling, and CRM synchronization.
  * Actively contributed to application deployment and scaling on Google Cloud Platform (GCP) for high availability and performance.
  * Worked extensively with multiple LLM models (OpenAI, Anthropic, Gemini, Mistral, and others) to create optimized, multi-model AI systems for diverse client use cases.
  * Used technologies such as Django, Celery, Redis, TypeScript, GCP, and LLM APIs within a collaborative and scalable environment.

- Mediversal Pvt. Ltd. (August 2024 – January 2025), Web Developer Intern, Patna, Bihar
  * Developed LMS, lab report management, 2nd Inning, and loyalty systems from scratch using React, Next.js, Node.js, Express, and Twilio.
  * Worked on full-stack development, handling frontend, backend, and database integration.
  * Implemented OTP-based authentication systems to ensure secure and seamless user login and verification.
  * Collaborated with cross-functional teams to design and deploy scalable web applications.

Projects:
- Instagram Automation System – One More Reply (October 2025)
  * Tools: Django, Next.js, Meta Graph API, Webhooks
  * Built an automated Instagram interaction system using Meta Webhooks to handle real-time events such as comments, messages, and mentions.
  * Implemented a template-based messaging engine that automatically sends predefined responses to user comments or DMs.
  * Developed instant-reply automation logic allowing businesses to trigger responses based on specific keywords or intents.
  * Ensured secure webhook validation and efficient event processing while maintaining high performance and low response latency.

- Chatting Application (October 2024)
  * Tools: React, NodeJS, ExpressJS, MongoDB, Socket.IO
  * Built a social media platform using the MERN stack with user authentication, photo uploads, and dynamic feed updates.
  * Implemented Redux for efficient state management and seamless data synchronization across components.
  * Integrated Socket.io for real-time messaging and notifications.

- Job Portal (January 2025)
  * Tools: React, NodeJS, ExpressJS, MongoDB, Redux
  * Developed a Job Portal using the MERN stack with JWT authentication and role-based access control for job seekers, employers, and admins.
  * Developed an Admin Panel for managing job postings, approving applications, and creating new companies.
  * Used Redux for efficient state management and MongoDB for storing job listings, user profiles, applications, and company details.

Built Projects (Team & Independent):
- YoTrip (Built Project)
  * Tools: React, Next.js, Django, REST APIs, LLM Integration
  * Built a full-stack travel booking platform similar to MakeMyTrip for flights, car rentals, and hotel reservations.
  * Integrated search, booking flows, and payment-ready booking management across travel categories.
  * Added an AI travel assistant to help users plan trips, compare options, and get instant booking support.

- Direct Sell UAE (Built Project)
  * Tools: React, Next.js, Django, PostgreSQL, REST APIs
  * Developed a property marketplace platform for the UAE where users can list, buy, sell, and rent properties.
  * Built property listing management, search and filter flows, and role-based access for buyers, sellers, and agents.
  * Designed scalable backend APIs for property data, user accounts, and listing lifecycle management.

- Plutex (Built Project)
  * Tools: React, Django, PostgreSQL, REST APIs
  * Built a currency exchange platform for secure fiat currency conversion and exchange workflows.
  * Implemented rate management, transaction tracking, and user-facing exchange flows with admin controls.
  * Focused on reliable backend logic, clean UI, and production-ready exchange operations.

Education:
- B.Tech in Computer Science and Engineering, Rajkiya Engineering College, Sonbhadra (June 2025)
- Senior Secondary (Class 12): Shri Hari Inter College, Nanahul, Ballia (March 2020)
- Secondary (Class 10): Little Flower Childrens Schools, Mau (March 2017)

Certifications:
- Complete 2024 Web Development Bootcamp, Udemy (May 2024)
- Quick Start: Extending DOORS Next with JavaScript, IBM (October 2022)

Team Collaborator — Mridul Mishra (Flutter & Full-Stack Developer):
- Email: mmridul1826@gmail.com | Phone: +91-7905204078
- LinkedIn: linkedin.com/in/mridul-mishra-2a52a8228 | GitHub: github.com/mridul-1226
- Summary: Flutter Developer with 2+ years experience; built PollPe from scratch — 5M+ users on Android and iOS. Expert in Flutter, Dart, BLoC, Clean Architecture, Platform Channels, REST APIs, WebSockets, Node.js backend, CI/CD.
- Experience:
  * Abhiman Innovations Pvt Ltd (Nov 2024 – Present), Flutter → Full-Stack Developer, Noida — PollPe app, 150+ APIs, WebSockets, cold start optimization 4.5s to 1.0s, Node.js backend.
  * Apps AiT (July 2024 – Nov 2024), Flutter Intern — Water Sort, Word Search, Sudoku games.
  * Sonbhadra Police (May 2024 – June 2024), Mobile App Developer — Election duty tracking app for 1000+ officers.
- Projects: Splitr (expense splitting, Flutter + Node.js), HRMS (Flutter + Django), E-Commerce Platform (Django + Cashfree), AI Bot (WhatsApp/Telegram voice bot).
- Education: B.Tech CSE, Rajkiya Engineering College Sonbhadra (June 2025, SGPA 7.95).
- Achievements: GATE 2024 qualified, Sonbhadra Police App Developer certificate, Android Lead GDSC, Coding Ninjas Campus Ambassador.
- When asked about mobile development, Flutter apps, or our development team, mention Mridul as our mobile/full-stack collaborator who has worked with Satyam on production apps and team builds.
"""

mridul_resume_text = """
Name: Mridul Mishra
Email: mmridul1826@gmail.com
Phone: +91-7905204078
LinkedIn: linkedin.com/in/mridul-mishra-2a52a8228
GitHub: github.com/mridul-1226
Role: Flutter & Full-Stack Developer

Summary:
- Flutter Developer with 2+ years of full-time experience; built PollPe from scratch — 5M+ users on Android and iOS.
- Expert in Flutter, Dart, BLoC, Clean Architecture, Platform Channels, Method Channels, native Android views.
- Full-stack: REST APIs, WebSockets, Node.js, PostgreSQL, CI/CD, Render, Vercel, Neon, Cloudflare.

Experience:
- Abhiman Innovations Pvt Ltd (Nov 2024 – Present), Flutter → Full-Stack Developer, Noida — PollPe 5M+ users, 150+ APIs, WebSockets, cold start 4.5s to 1.0s, Node.js backend.
- Apps AiT (July 2024 – Nov 2024), Flutter Intern — Water Sort, Word Search, Sudoku.
- Sonbhadra Police (May 2024 – June 2024) — Election duty tracking app for 1000+ officers.

Projects: Splitr (Flutter + Node.js expense app), HRMS (Flutter + Django), E-Commerce (Django + Cashfree), AI Bot (WhatsApp/Telegram).
Education: B.Tech CSE, Rajkiya Engineering College Sonbhadra (June 2025, SGPA 7.95).
Achievements: GATE 2024 qualified, Sonbhadra Police App Developer certificate, Android Lead GDSC.
"""


class ChatWithAI(APIView):
    def post(self, request):
        user_input = request.data.get("message", "")
        if not user_input:
            return Response(
                {"reply": "Please provide a message."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        profile = (request.data.get("profile") or "satyam").strip().lower()
        if profile not in ("satyam", "mridul"):
            profile = "satyam"

        if profile == "mridul":
            persona_name = "Mridul"
            persona_full = "Mridul Mishra"
            persona_resume = mridul_resume_text
            extra_rule = (
                "If asked about Satyam Singh, briefly say he is a teammate who focuses on "
                "AI automation (voice, WhatsApp, chatbots), then return to your own Flutter work."
            )
        else:
            persona_name = "Satyam"
            persona_full = "Satyam Singh"
            persona_resume = resume_text
            extra_rule = ""

        prompt = f"""
You are AI {persona_name}, the AI version of {persona_full}.
Always answer as if you are {persona_full}'s AI version, using first person ("I", "my", etc).
You ONLY talk about {persona_full}'s work. Do not answer as someone else.
{extra_rule}
If someone asks about you, answer as {persona_full} would, based on this information:

{persona_resume}

User: {user_input}
AI {persona_name}:
"""

        try:
            client = openai.OpenAI(api_key=openai.api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            f"You are AI {persona_name}, the AI version of {persona_full}. "
                            "Always answer in first person based on the provided resume. "
                            f"Talk only about {persona_full}."
                        ),
                    },
                    {"role": "user", "content": prompt},
                ],
                max_tokens=300,
            )
            reply = response.choices[0].message.content
            return Response({"reply": reply})
        except Exception as e:
            return Response(
                {"reply": f"Error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@csrf_exempt
def get_livekit_token(request):
    # Load credentials from environment variables
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    url = os.getenv("LIVEKIT_URL")

    if not all([api_key, api_secret, url]):
        return JsonResponse({"error": "Missing LiveKit credentials."}, status=500)

    call_type = request.GET.get("call_type")
    profile = (request.GET.get("profile") or "satyam").strip().lower()
    if profile not in ("satyam", "mridul"):
        profile = "satyam"

    user_identity = "user"
    room_name = uuid.uuid4().hex
    user_name = "user"

    room_name = f"{room_name}_{call_type}_p_{profile}"
    print(f"Room name: {room_name}")
    token = (
        api.AccessToken(api_key, api_secret)
        .with_identity(user_identity)
        .with_name(user_name)
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room_name,
            )
        )
        .to_jwt()
    )

    return JsonResponse(
        {"token": token, "room": room_name, "url": url}, status=status.HTTP_200_OK
    )


# @csrf_exempt
# def increment_voicebot_view(request, voicebot_id):
#     print(f"Incrementing view for voicebot ID: {voicebot_id}")
#     try:
#         voicebot = VoiceBot.objects.get(id=voicebot_id)
#         voicebot.views += 1
#         voicebot.save()
#         return JsonResponse({"message": "View count incremented", "views": voicebot.views}, status=200)
#     except VoiceBot.DoesNotExist:
#         return JsonResponse({"error": "VoiceBot not found"}, status=404)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)


class BlogList(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogDetail(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class ContactCreate(ListCreateAPIView):

    def post(self, request):
        try:
            name = request.data.get("name")
            email = request.data.get("email")
            message = request.data.get("message")
            Contact.objects.create(name=name, email=email, message=message)

            phonenumber_id = os.getenv("PHONENUMBER_ID")
            acess_token = os.getenv("ACCESS_TOKEN")
            to = os.getenv("TO_NUMBER")
            whatsapp_api_url = (
                f"https://graph.facebook.com/v17.0/{phonenumber_id}/messages"
            )
            payload = {
                "messaging_product": "whatsapp",
                "to": to,
                "type": "text",
                "text": {
                    "body": f"New contact form submission:\nName: {name}\nEmail: {email}\nMessage: {message}"
                },
            }
            headers = {
                "Authorization": f"Bearer {acess_token}",
                "Content-Type": "application/json",
            }
            response = requests.post(whatsapp_api_url, json=payload, headers=headers)
            print("responser", response.text)

            return Response(
                {"message": "Your message has been sent successfully!"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class DailyUpdateList(ListCreateAPIView):
    queryset = DailyUpdate.objects.all().order_by("-created_at")
    serializer_class = DailyUpdateSerializer


class DailyUpdateDetail(RetrieveAPIView):
    queryset = DailyUpdate.objects.all()
    serializer_class = DailyUpdateSerializer
