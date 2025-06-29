#!/bin/bash

# Docker scripts for Portfolio Website

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build and run production
production() {
    print_status "Building and starting production container..."
    docker-compose up --build
}

# Function to build and run development
development() {
    print_status "Building and starting development container..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Function to stop containers
stop() {
    print_status "Stopping containers..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    print_success "Containers stopped"
}

# Function to clean up
clean() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v --remove-orphans
    docker-compose -f docker-compose.dev.yml down -v --remove-orphans
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to view logs
logs() {
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Function to rebuild without cache
rebuild() {
    print_status "Rebuilding without cache..."
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml build --no-cache
    else
        docker-compose build --no-cache
    fi
    print_success "Rebuild completed"
}

# Function to show status
status() {
    print_status "Container status:"
    docker-compose ps
    echo ""
    print_status "Development container status:"
    docker-compose -f docker-compose.dev.yml ps
}

# Function to show help
help() {
    echo "Portfolio Website Docker Scripts"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  prod, production    Build and run production container"
    echo "  dev, development    Build and run development container"
    echo "  stop                Stop all containers"
    echo "  clean               Stop containers and clean up Docker resources"
    echo "  logs [dev]          View logs (add 'dev' for development logs)"
    echo "  rebuild [dev]       Rebuild without cache (add 'dev' for development)"
    echo "  status              Show container status"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 prod             # Start production"
    echo "  $0 dev              # Start development"
    echo "  $0 logs dev         # View development logs"
    echo "  $0 rebuild          # Rebuild production"
}

# Main script logic
case "${1:-help}" in
    "prod"|"production")
        check_docker
        production
        ;;
    "dev"|"development")
        check_docker
        development
        ;;
    "stop")
        check_docker
        stop
        ;;
    "clean")
        check_docker
        clean
        ;;
    "logs")
        check_docker
        logs "$2"
        ;;
    "rebuild")
        check_docker
        rebuild "$2"
        ;;
    "status")
        check_docker
        status
        ;;
    "help"|*)
        help
        ;;
esac 