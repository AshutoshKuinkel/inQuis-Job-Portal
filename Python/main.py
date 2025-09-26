from sentence_transformers import SentenceTransformer,util
from fastapi import FastAPI,UploadFile,File,Form
from PyPDF2 import PdfReader
from io import BytesIO
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

#right so since we are taking file uploads and we don't want to save it to our disk we just use BytesIO. 
# We just take in raw binary input from the pdf file which user uploaded and treat it like a file object with our BytesIO(file_bytes)
# and then from there we can extract the text using our PYPdf as normal
def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text.strip()

#here we're using genAI SDK which makes use of google's gemini and creating a function to reccomend tips to user based on their resume.
async def resume_tips(resume_text:str):
    prompt = f"Analyze the following resume and provide three suggestions to improve it:\n\n{resume_text}\n\nSuggestions:\n1."
    try:
      response = client.models.generate_content_stream(
         model="gemini-2.0-flash-lite",
         contents=[resume_text, prompt]
      )

      end_response = ""
      for section in response:
         end_response += section.text
      
      tips = end_response.strip().split("\n")
      return tips
    except Exception as e:
       print("Could not generate improvement tips",e)
       return ['Could not generate any tips']

#Fast API route
#We defined our expected data in function param and then we are passing the resume file into our function above.
#Then from there it's just comparing similarity using our SBERT.
@app.post("/similarity")
async def score_resume(
    resume_file:UploadFile = File(),
    job_description: str = Form()
):
  file_bytes = await resume_file.read()
  resume_text = extract_text_from_pdf(file_bytes)
  resume_vector = model.encode(resume_text,convert_to_tensor=True)
  description_vector = model.encode(job_description,convert_to_tensor=True)

  tips = await resume_tips(resume_text)

  score = util.pytorch_cos_sim(resume_vector,description_vector).item()

  return {
     "score": round(score, 2)*100,
     "tips": tips if tips else ["No specific tips found. Please provide a more detailed resume."]
     }