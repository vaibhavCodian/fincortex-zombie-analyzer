# ---- Cloud Run Job Dockerfile ----
FROM python:3.11-slim

WORKDIR /job

# Install dependencies
COPY jobs/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy job code
COPY jobs/ .

# Set entrypoint (replace main.py with your job's entrypoint)
ENTRYPOINT ["python", "zombie_scanner.py"]
