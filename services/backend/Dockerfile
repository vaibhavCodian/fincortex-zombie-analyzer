# ---- Backend (FastAPI) Dockerfile ----
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# The above environment variables are commonly used in Python Docker containers:
# PYTHONDONTWRITEBYTECODE=1 prevents Python from writing .pyc files to disk, which can save space and speed up container builds.
# PYTHONUNBUFFERED=1 ensures that Python output is sent straight to the terminal without being buffered, which is useful for logging.


# Set work directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend code
COPY backend/ .

# Expose port (default FastAPI port)
EXPOSE 8080

# Start FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]