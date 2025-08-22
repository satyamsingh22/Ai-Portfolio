# Create your views here.
import openai
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from livekit import api
import json
import jwt
import uuid
from rest_framework import status

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
print("openai.api.key", openai.api_key)

resume_text = """
Name: Satyam Singh
Email: satyamsinghss2203@gmail.com
Phone: +91-8957820454
LinkedIn: linkedin.com/in/satyam-singh-bb1751259
GitHub: github.com/satyamsingh22

Career Objective:
To work for an organization which provides me the opportunity to improve my skills and knowledge to grow along with the organization objectives.

Skills:
- Programming Languages: Java, C/C++, JavaScript
- Technologies: HTML, CSS, React, Django, NodeJS, ExpressJS, Kafka, Docker, SQL, PHP, PostgreSQL, MongoDB, RESTful APIs, Celery Beat, Redis, Generative AI
- Tools: Git, Figma, VS Code, Jira, Cursor
- Technical Skills: Data Structures and Algorithms, Problem Solving
- Soft Skills: Teamwork, Communication, Adaptability, Critical Thinking, Time Management

Experience:
- Kipps.AI (Feb 2025 – Present), Senior Software Developer, Udaipur
  * Built and integrated intelligent chatbots trained on custom data for client-specific use cases.
  * Implemented WhatsApp integration using Meta’s API.
  * Used Celery, Django, Redis, and OpenAI for background tasks and AI-powered conversations.
  * Worked with TypeScript and Python to create scalable real-time chatbot solutions.

- Mediversal Pvt. Ltd. (Aug 2024 – Jan 2025), Web Developer Intern, Patna
  * Developed LMS, lab report management, and loyalty systems from scratch.
  * Built full-stack projects, integrated databases, and implemented OTP-based authentication.
  * Worked on secure user login and collaborated with cross-functional teams.

Projects:
- Chatting Application (Oct 2024)
  * MERN stack with real-time messaging using Socket.IO, Redux for state management.

- Job Portal (Jan 2025)
  * MERN stack job portal with JWT authentication and role-based access control.
  * Developed Admin Panel for managing job postings and user data.

- Doctor Appointment System (June 2024)
  * MERN stack appointment booking platform with role-based access and Redux.

Education:
- B.Tech in Computer Science and Engineering, Rajkiya Engineering College, Sonbhadra (Expected June 2025)
- Class 12: Shri Hari Inter College, Ballia (2020)
- Class 10: LFCS Mau (2017)

Certifications:
- Complete 2024 Web Development Bootcamp (Udemy)
- IBM: Quick Start Extending DOORS Next with JavaScript

Portfolio Links:
- Live Projects: 
  * https://satyam-chat.onrender.com
  * https://job-portal-hchg.onrender.com
  * https://doctor-appoitment.onrender.com
  
RelationShip:
- I have a girlfriend named Soumya Mishra and we are in relationship and dating each other for 3 year and we are planning to get married in 2030. for future and she is currently doing MSC Zoology Master Degree from AU.
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
    token = api.AccessToken(api_key, api_secret)\
        .with_identity(user_identity)\
        .with_name(user_name)\
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room_name,
        )).to_jwt()

    return JsonResponse({
        "token": token,
        "room": room_name,
        "url": url
    }, status=status.HTTP_200_OK)

@csrf_exempt
def increment_voicebot_view(request, voicebot_id):
    print(f"Incrementing view for voicebot ID: {voicebot_id}")
    try:
        voicebot = VoiceBot.objects.get(id=voicebot_id)
        voicebot.views += 1
        voicebot.save()
        return JsonResponse({"message": "View count incremented", "views": voicebot.views}, status=200)
    except VoiceBot.DoesNotExist:
        return JsonResponse({"error": "VoiceBot not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

