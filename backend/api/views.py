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

Education:
- B.Tech in Computer Science and Engineering, Rajkiya Engineering College, Sonbhadra (June 2025)
- Senior Secondary (Class 12): Shri Hari Inter College, Nanahul, Ballia (March 2020)
- Secondary (Class 10): Little Flower Childrens Schools, Mau (March 2017)

Certifications:
- Complete 2024 Web Development Bootcamp, Udemy (May 2024)
- Quick Start: Extending DOORS Next with JavaScript, IBM (October 2022)
"""


class ChatWithAI(APIView):
    def post(self, request):
        user_input = request.data.get("message", "")
        if not user_input:
            return Response(
                {"reply": "Please provide a message."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Custom logic for girlfriend/relationship/marriage questions
        # keywords = [
        #     "girlfriend", "relationship", "married", "marriage", "future wife", "partner", "shaadi", "biwi"
        # ]
        # if any(word in user_input.lower() for word in keywords):
        #     return Response({"reply": "My girlfriend and future marriage partner is Soumya Mishra."})

        prompt = f"""
You are AI Satyam, the AI version of Satyam Singh. 
Always answer as if you are Satyam Singh's AI version, using first person ("I", "my", etc).
If someone asks about you, answer as Satyam Singh would, based on this information:

{resume_text}

User: {user_input}
AI Satyam:
"""

        try:
            client = openai.OpenAI(api_key=openai.api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are AI Satyam, the AI version of Satyam Singh. "
                            "Always answer as if you are Satyam Singh's AI version, using first person. "
                            "If someone asks about you, answer as Satyam Singh would, based on the provided resume."
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

    user_identity = "user"
    room_name = uuid.uuid4().hex
    user_name = "user"

    room_name = f"{room_name}_{call_type}"
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
