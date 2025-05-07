# Step 1: Use an official Python runtime as a parent image
FROM python:3.9-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements.txt file into the container at /app
COPY requirements.txt /app/

# Step 4: Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the application code into the container
COPY . /app

# Step 6: Set environment variable to tell Flask to listen on all interfaces
ENV FLASK_RUN_HOST=0.0.0.0

# Step 7: Expose the Flask app port (default Flask port is 5000)
EXPOSE 8080

# Step 8: Define the command to run your app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]
