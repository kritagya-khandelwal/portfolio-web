# Docker Setup for Portfolio Website

This document explains how to run the portfolio website using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### Production Build

To run the portfolio website in production mode:

```bash
# Build and start the production container
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

The website will be available at `http://localhost:3001`

### Development Mode

To run the portfolio website in development mode with hot reloading:

```bash
# Build and start the development container
docker compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker compose -f docker-compose.dev.yml up -d --build
```

## Docker Commands

### Building Images

```bash
# Build production image
docker build -t portfolio-web:latest .

# Build development image
docker build -f Dockerfile.dev -t portfolio-web:dev .
```

### Running Containers

```bash
# Run production container
docker run -p 3001:3001 portfolio-web:latest

# Run development container
docker run -p 3001:3001 -v $(pwd):/app portfolio-web:dev
```

### Managing Containers

```bash
# Stop containers
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs -f

# Rebuild without cache
docker compose build --no-cache
```

## Environment Variables

The following environment variables can be configured:

- `NODE_ENV`: Set to `production` or `development`
- `NEXT_TELEMETRY_DISABLED`: Set to `1` to disable Next.js telemetry
- `PORT`: Port number (default: 3001)

## Health Check

The application includes a health check endpoint at `/api/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "portfolio-web"
}
```

## Production Deployment

For production deployment, consider:

1. Using a reverse proxy (nginx) in front of the Next.js app
2. Setting up SSL/TLS certificates
3. Configuring environment variables for production
4. Setting up monitoring and logging
5. Using a container orchestration platform (Kubernetes, Docker Swarm)

### Example with Nginx

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - portfolio-web

  portfolio-web:
    build: .
    expose:
      - "3001"
    environment:
      - NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in docker-compose.yml
2. **Build fails**: Check if all dependencies are properly listed in package.json
3. **Permission issues**: Ensure Docker has proper permissions to access the project directory

### Debugging

```bash
# Access container shell
docker compose exec portfolio-web sh

# View container logs
docker compose logs portfolio-web

# Check container status
docker compose ps
```

## Performance Optimization

The production Dockerfile uses multi-stage builds to:
- Minimize image size
- Separate build and runtime dependencies
- Use Alpine Linux for smaller base images
- Leverage Next.js standalone output

## Security Considerations

- The production container runs as a non-root user (nextjs)
- Only necessary files are copied to the container
- Environment variables are used for configuration
- Health checks are implemented for monitoring 