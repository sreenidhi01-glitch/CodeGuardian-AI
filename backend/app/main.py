from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.scanners.static_analysis import scan_static
from app.scanners.secrets import scan_secrets
from app.services.risk_engine import calculate_risk

app = FastAPI(
    title="CodeGuardian AI",
    description="AI-Powered Secure Code Review Assistant",
    version="1.0.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "project": "CodeGuardian AI",
        "status": "Backend Running Successfully",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/upload")
async def upload_code(file: UploadFile = File(...)):
    content = await file.read()

    return {
        "filename": file.filename,
        "size": len(content),
        "message": "File uploaded successfully"
    }


@app.post("/scan")
async def scan_code(file: UploadFile = File(...)):
    content = await file.read()

    code = content.decode("utf-8", errors="ignore")

    secret_findings = scan_secrets(code)
    static_findings = scan_static(code)

    findings = secret_findings + static_findings
    risk=calculate_risk(findings)
    return {
        "status": "success",
        "security_score": risk["security_score"],
        "risk_level": risk["risk_level"],
        "total_findings": len(findings),
        "findings": findings
    }