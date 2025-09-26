from sentence_transformers import SentenceTransformer,util
from fastapi import FastAPI,UploadFile,File,Form
from PyPDF2 import PdfReader
from io import BytesIO

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")

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
  score = util.pytorch_cos_sim(resume_vector,description_vector).item()
  return {"score": round(score, 2)*100}