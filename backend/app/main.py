from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from io import BytesIO

from app.github.github_client import get_pr_files
from app.models.github_review import GitHubReviewRequest

from app.scanners.secrets import scan_secrets
from app.scanners.static_analysis import scan_static
from app.scanners.dependency_scanner import scan_dependencies
from app.scanners.architecture import scan_architecture

from app.services.risk_engine import calculate_risk
from app.reports.pdf_generator import generate_pdf
from app.ai.advisor import get_advice
from app.ai.pr_reviewer import generate_pr_review
from app.ai.fix_generator import generate_secure_fix

app = FastAPI(
    title="CodeGuardian AI",
    description="AI-Powered Secure Code Review Assistant",
    version="1.0.0",
)

# CORS
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://codeguardian-ai-five.vercel.app",
        "https://code-guardian-ai-wine.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "project": "CodeGuardian AI",
        "status": "Backend Running Successfully",
        "version": "1.0.0",
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
        "message": "File uploaded successfully",
    }


@app.post("/scan")
async def scan_code(file: UploadFile = File(...)):
    content = await file.read()
    code = content.decode("utf-8", errors="ignore")

    # -------------------------------
    # Run All Security Scanners
    # -------------------------------
    secret_findings = scan_secrets(code)
    static_findings = scan_static(code)
    dependency_findings = scan_dependencies(code)
    architecture_findings = scan_architecture(code)

    findings = (
        secret_findings
        + static_findings
        + dependency_findings
        + architecture_findings
    )

    # -------------------------------
    # AI Security Advisor
    # -------------------------------
    for finding in findings:
        advice = get_advice(finding["type"])

        finding["why"] = advice["why"]
        finding["fix"] = advice["fix"]
        finding["example"] = advice["example"]
        finding["best_practice"] = advice["best_practice"]
        fix = generate_secure_fix(finding)

        finding["vulnerable_code"] = fix["vulnerable"]
        finding["secure_code"] = fix["secure"]
        finding["fix_explanation"] = fix["explanation"]
    # -------------------------------
    # Risk Engine
    # -------------------------------
    risk = calculate_risk(findings)
    review = generate_pr_review(findings, risk["security_score"])
    return {
        "status": "success",
        "security_score": risk["security_score"],
        "risk_level": risk["risk_level"],
        "total_findings": len(findings),
        "findings": findings,
        "review": review
    }
    
@app.post("/report")
async def generate_report(file: UploadFile = File(...)):
    content = await file.read()
    code = content.decode("utf-8", errors="ignore")

    secret_findings = scan_secrets(code)
    static_findings = scan_static(code)
    dependency_findings = scan_dependencies(code)
    architecture_findings = scan_architecture(code)

    findings = (
        secret_findings
        + static_findings
        + dependency_findings
        + architecture_findings
    )

    for finding in findings:
        advice = get_advice(finding["type"])

        finding["why"] = advice["why"]
        finding["fix"] = advice["fix"]
        finding["example"] = advice["example"]
        finding["best_practice"] = advice["best_practice"]

        fix = generate_secure_fix(finding)

        finding["vulnerable_code"] = fix["vulnerable"]
        finding["secure_code"] = fix["secure"]
        finding["fix_explanation"] = fix["explanation"]

    risk = calculate_risk(findings)

    review = generate_pr_review(
        findings,
        risk["security_score"]
    )

    result = {
        "security_score": risk["security_score"],
        "risk_level": risk["risk_level"],
        "total_findings": len(findings),
        "findings": findings,
        "review": review,
    }

    pdf = generate_pdf(result)

    return StreamingResponse(
        BytesIO(pdf),
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=CodeGuardian_Report.pdf"
        },
    )

@app.post("/github/review")
async def github_review(request: GitHubReviewRequest):

    try:

        files = get_pr_files(
            request.repo,
            request.pr_number,
            request.github_token,
        )


        if not files:

            return {
                "status": "error",
                "message": "No files found. Check repository name and PR number."
            }


        all_findings = []


        for file in files:

            code = file.get("content", "")


            if not code:
                continue


            print(
                f"Scanning file: {file.get('filename')}"
            )


            findings = []


            # Security scanners

            findings += scan_secrets(code)

            findings += scan_static(code)

            findings += scan_dependencies(code)

            findings += scan_architecture(code)



            for finding in findings:


                advice = get_advice(
                    finding["type"]
                )


                finding["file"] = file.get(
                    "filename",
                    "unknown"
                )


                finding["why"] = advice.get(
                    "why",
                    ""
                )


                finding["fix"] = advice.get(
                    "fix",
                    ""
                )


                finding["example"] = advice.get(
                    "example",
                    ""
                )


                finding["best_practice"] = advice.get(
                    "best_practice",
                    ""
                )


                # AI secure fix generation

                fix = generate_secure_fix(
                    finding
                )


                finding["vulnerable_code"] = fix.get(
                    "vulnerable",
                    ""
                )


                finding["secure_code"] = fix.get(
                    "secure",
                    ""
                )


                finding["fix_explanation"] = fix.get(
                    "explanation",
                    ""
                )


            all_findings.extend(findings)



        # Calculate security risk

        risk = calculate_risk(
            all_findings
        )



        # AI PR Review

        review = generate_pr_review(
            all_findings,
            risk["security_score"]
        )
        print("FINAL REVIEW OUTPUT:")
        print(review)


        return {

            "status": "success",

            "repository": request.repo,

            "pull_request": request.pr_number,

            "files_scanned": len(files),

            "security_score": risk["security_score"],

            "risk_level": risk["risk_level"],

            "total_findings": len(all_findings),

            "findings": all_findings,

            "review": review

        }



    except Exception as e:


        print(
            "GitHub Review Error:",
            e
        )


        return {

            "status": "error",

            "message": str(e)

        }

@app.post("/github/report")
async def github_report(request: GitHubReviewRequest):

    files = get_pr_files(
        request.repo,
        request.pr_number,
        request.github_token,
    )
    if isinstance(files, dict) and files.get("error"):

            return {
               "status": "error",
               "message": files["message"]
          }

    all_findings = []

    for file in files:

        code = file["content"]

        if not code:
            continue

        findings = []

        findings += scan_secrets(code)
        findings += scan_static(code)
        findings += scan_dependencies(code)
        findings += scan_architecture(code)

        for finding in findings:

            advice = get_advice(finding["type"])

            finding["file"] = file["filename"]
            finding["why"] = advice["why"]
            finding["fix"] = advice["fix"]
            finding["example"] = advice["example"]
            finding["best_practice"] = advice["best_practice"]

            fix = generate_secure_fix(finding)

            finding["vulnerable_code"] = fix["vulnerable"]
            finding["secure_code"] = fix["secure"]
            finding["fix_explanation"] = fix["explanation"]

        all_findings.extend(findings)

    risk = calculate_risk(all_findings)

    review = generate_pr_review(
        all_findings,
        risk["security_score"],
    )

    result = {
        "repository": request.repo,
        "pull_request": request.pr_number,
        "files_scanned": len(files),
        "security_score": risk["security_score"],
        "risk_level": risk["risk_level"],
        "total_findings": len(all_findings),
        "findings": all_findings,
        "review": review,
    }

    pdf = generate_pdf(result)

    return StreamingResponse(
        BytesIO(pdf),
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=GitHub_PR_Report.pdf"
        },
    )    