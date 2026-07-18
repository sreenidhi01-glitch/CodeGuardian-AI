def generate_secure_fix(finding):
    finding_type = finding["type"]

    fixes = {

        # ==========================================================
        # HARDCODED PASSWORD
        # ==========================================================

        "Hardcoded Password": {
            "vulnerable": '''password = "admin123"''',

            "secure": '''import os

password = os.getenv("PASSWORD")''',

            "explanation": "Passwords should never be hardcoded. Store them in environment variables or a secrets manager."
        },

        # ==========================================================
        # API KEY
        # ==========================================================

        "API Key": {
            "vulnerable": '''api_key = "1234567890abcdef"''',

            "secure": '''import os

api_key = os.getenv("API_KEY")''',

            "explanation": "API keys should never be committed into source code."
        },

        # ==========================================================
        # GITHUB TOKEN
        # ==========================================================

        "GitHub Token": {
            "vulnerable": '''github_token = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"''',

            "secure": '''import os

github_token = os.getenv("GITHUB_TOKEN")''',

            "explanation": "Store GitHub Personal Access Tokens securely using environment variables."
        },

        # ==========================================================
        # AWS ACCESS KEY
        # ==========================================================

        "AWS Access Key": {
            "vulnerable": '''aws_key = "AKIAIOSFODNN7EXAMPLE"''',

            "secure": '''import boto3

session = boto3.Session()''',

            "explanation": "Use IAM Roles or environment variables instead of hardcoded AWS credentials."
        },

        # ==========================================================
        # HARDCODED SECRET
        # ==========================================================

        "Hardcoded Secret": {
            "vulnerable": '''secret = "mysecret"''',

            "secure": '''import os

secret = os.getenv("SECRET_KEY")''',

            "explanation": "Secrets should never be stored directly in source code."
        },

        # ==========================================================
        # SQL INJECTION
        # ==========================================================

        "SQL Injection": {
            "vulnerable": '''query = "SELECT * FROM users WHERE id=" + user_input''',

            "secure": '''cursor.execute(
    "SELECT * FROM users WHERE id=%s",
    (user_input,)
)''',

            "explanation": "Parameterized queries prevent SQL Injection attacks."
        },

        # ==========================================================
        # COMMAND INJECTION
        # ==========================================================

        "Command Injection": {
            "vulnerable": '''os.system(user_input)''',

            "secure": '''import subprocess

subprocess.run(
    ["ls", user_input],
    shell=False,
    check=True
)''',

            "explanation": "Never execute user input through the shell."
        },
                # ==========================================================
        # DANGEROUS EVAL
        # ==========================================================

        "Dangerous eval()": {
            "vulnerable": '''eval(user_input)''',

            "secure": '''import ast

result = ast.literal_eval(user_input)''',

            "explanation": "Avoid eval() on untrusted input. Use ast.literal_eval() when parsing Python literals."
        },

        # ==========================================================
        # UNSAFE DESERIALIZATION
        # ==========================================================

        "Unsafe Deserialization": {
            "vulnerable": '''import pickle

data = pickle.loads(user_data)''',

            "secure": '''import json

data = json.loads(user_data)''',

            "explanation": "Avoid pickle for untrusted data. Prefer JSON or other safe serialization formats."
        },

        # ==========================================================
        # WEAK HASHING (MD5)
        # ==========================================================

        "Weak Hashing (MD5)": {
            "vulnerable": '''hashlib.md5(password.encode()).hexdigest()''',

            "secure": '''import bcrypt

hashed = bcrypt.hashpw(
    password.encode(),
    bcrypt.gensalt()
)''',

            "explanation": "MD5 is cryptographically broken. Use bcrypt or Argon2 for password hashing."
        },

        # ==========================================================
        # DEBUG MODE ENABLED
        # ==========================================================

        "Debug Mode Enabled": {
            "vulnerable": '''debug = True''',

            "secure": '''debug = False''',

            "explanation": "Disable debug mode in production to prevent leaking stack traces and sensitive information."
        },

        # ==========================================================
        # HTTP URL DETECTED
        # ==========================================================

        "HTTP URL Detected": {
            "vulnerable": '''url = "http://example.com"''',

            "secure": '''url = "https://example.com"''',

            "explanation": "Use HTTPS to encrypt network traffic and protect against interception."
        },

        # ==========================================================
        # HARDCODED DATABASE URL
        # ==========================================================

        "Hardcoded Database URL": {
            "vulnerable": '''DATABASE_URL = "postgres://admin:password@localhost/db"''',

            "secure": '''import os

DATABASE_URL = os.getenv("DATABASE_URL")''',

            "explanation": "Store database connection strings securely in environment variables."
        },

        # ==========================================================
        # DISABLED SSL VERIFICATION
        # ==========================================================

        "Disabled SSL Verification": {
            "vulnerable": '''requests.get(url, verify=False)''',

            "secure": '''requests.get(url, verify=True)''',

            "explanation": "Always verify SSL certificates to prevent man-in-the-middle attacks."
        },

        # ==========================================================
        # WILDCARD HOST BINDING
        # ==========================================================

        "Wildcard Host Binding": {
            "vulnerable": '''host = "0.0.0.0"''',

            "secure": '''host = "127.0.0.1"''',

            "explanation": "Bind services to localhost or trusted interfaces unless public exposure is required."
        },
            }

    return fixes.get(
        finding_type,
        {
            "vulnerable": "Example unavailable for this vulnerability.",

            "secure": "Follow language-specific secure coding practices.",

            "explanation": (
                f"No predefined remediation template exists for "
                f"'{finding_type}'. Review the finding and apply secure "
                "coding principles such as input validation, least privilege, "
                "secure secret management, safe API usage, and encryption."
            ),
        },
    )