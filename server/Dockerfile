# Build Stage
FROM golang:1.21-alpine AS builder

# Set environment variables
ENV GO111MODULE=on \
  CGO_ENABLED=0 \
  GOOS=linux \
  GOARCH=amd64

# Create an app directory
WORKDIR /app

# Copy go.mod and go.sum for dependency resolution
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o server .

# Final Stage (for running the built application)
FROM alpine:latest

# Create a directory for the app
WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/server .

# Expose the port on which the app will run
EXPOSE 8080

# Command to run the app
CMD ["./server"]
