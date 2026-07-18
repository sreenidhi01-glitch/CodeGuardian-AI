def get_advice(vulnerability_type):
    advice = {

        "Hardcoded Password": {
            "why": "Hardcoded passwords expose sensitive credentials if the source code is leaked.",
            "fix": "Store passwords in environment variables or a secure secrets manager.",
            "example": 'password = os.getenv("DB_PASSWORD")',
            "best_practice": "Never commit passwords or credentials to source control."
        },

        "API Key": {
            "why": "API keys embedded in source code can be abused by attackers.",
            "fix": "Move API keys to environment variables.",
            "example": 'api_key = os.getenv("API_KEY")',
            "best_practice": "Rotate API keys regularly and never expose them publicly."
        },

        "GitHub Token": {
            "why": "A leaked GitHub Personal Access Token can allow attackers to access repositories and perform unauthorized actions.",
            "fix": "Revoke the exposed token immediately and generate a new one.",
            "example": 'github_token = os.getenv("GITHUB_TOKEN")',
            "best_practice": "Never commit GitHub tokens to source code."
        },

        "AWS Access Key": {
            "why": "Exposed AWS credentials can give attackers access to cloud resources.",
            "fix": "Store AWS credentials securely using IAM Roles or environment variables.",
            "example": 'aws_key = os.getenv("AWS_ACCESS_KEY_ID")',
            "best_practice": "Use IAM roles instead of hardcoded credentials whenever possible."
        },

        "JWT Token": {
            "why": "Hardcoded JWT tokens may allow unauthorized access if leaked.",
            "fix": "Generate JWTs dynamically after user authentication.",
            "example": "jwt.encode(payload, SECRET_KEY)",
            "best_practice": "Never expose JWTs in source code or public repositories."
        },

        "Private Key": {
            "why": "Private keys provide direct access to encrypted systems and should never be exposed.",
            "fix": "Remove the key immediately and rotate it.",
            "example": "Load private keys from a secure vault or key management service.",
            "best_practice": "Store private keys in a secure secrets manager."
        },

        "Command Injection": {
            "why": "Executing user input directly can allow attackers to run arbitrary system commands.",
            "fix": "Avoid os.system() with user input. Use subprocess with safe arguments.",
            "example": 'subprocess.run(["ls", directory], check=True)',
            "best_practice": "Always validate and sanitize user input."
        },

        "Dangerous eval()": {
            "why": "eval() executes arbitrary code and can lead to remote code execution.",
            "fix": "Use safer alternatives like ast.literal_eval() for parsing data.",
            "example": "ast.literal_eval(user_input)",
            "best_practice": "Avoid eval() on untrusted input."
        },

        "Unsafe Deserialization": {
            "why": "Deserializing untrusted data may execute malicious code.",
            "fix": "Use safe serialization formats like JSON.",
            "example": "json.loads(data)",
            "best_practice": "Never deserialize data from untrusted sources."
        },

        "Weak Hashing (MD5)": {
            "why": "MD5 is vulnerable to collisions and is unsuitable for secure hashing.",
            "fix": "Use SHA-256 or bcrypt for password hashing.",
            "example": "hashlib.sha256(password.encode()).hexdigest()",
            "best_practice": "Use bcrypt or Argon2 for storing passwords."
        },

        "Vulnerable Dependency": {
            "why": "Outdated dependencies may contain publicly known security vulnerabilities (CVEs) that attackers can exploit.",
            "fix": "Upgrade the package to the latest stable version and regularly monitor dependency vulnerabilities.",
            "example": "django>=5.2\nrequests>=2.32.0",
            "best_practice": "Use tools like Dependabot, Renovate, Safety, or pip-audit to keep dependencies secure."
        },

        "Debug Mode Enabled": {
            "why": "Debug mode can expose sensitive application information and stack traces to attackers.",
            "fix": "Disable debug mode in production.",
            "example": "debug = False",
            "best_practice": "Run production applications with debug mode disabled."
        },

        "HTTP URL Detected": {
            "why": "Using HTTP transmits data without encryption, allowing attackers to intercept or modify network traffic.",
            "fix": "Replace HTTP URLs with HTTPS wherever possible.",
            "example": 'url = "https://example.com"',
            "best_practice": "Always use HTTPS/TLS for communication with external services."
        },

        "Hardcoded Database URL": {
            "why": "Embedding database connection strings in source code exposes credentials and infrastructure details.",
            "fix": "Store the database URL in environment variables or a secure secrets manager.",
            "example": 'DATABASE_URL = os.getenv("DATABASE_URL")',
            "best_practice": "Never commit database credentials or connection strings into version control."
        },

        "Disabled SSL Verification": {
            "why": "Disabling SSL certificate verification allows Man-in-the-Middle attacks by accepting untrusted certificates.",
            "fix": "Enable SSL verification for all HTTPS requests.",
            "example": "requests.get(url, verify=True)",
            "best_practice": "Never disable SSL verification in production applications."
        },

        "Wildcard Host Binding": {
            "why": "Binding a service to 0.0.0.0 exposes it on all network interfaces, increasing the attack surface.",
            "fix": "Bind the service to localhost or a trusted interface whenever possible.",
            "example": 'host = "127.0.0.1"',
            "best_practice": "Expose services publicly only through secure reverse proxies or firewalls."
        }

    }

    return advice.get(
        vulnerability_type,
        {
            "why": "No explanation available.",
            "fix": "Review this vulnerability manually.",
            "example": "",
            "best_practice": "Follow secure coding practices."
        },
    )