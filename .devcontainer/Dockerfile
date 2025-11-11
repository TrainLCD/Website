FROM node:20-bullseye

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    postgresql-client \
    redis-tools \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Allow node user to use sudo without password
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set working directory
WORKDIR /workspace

# Switch to node user for development
USER node

# Expose Next.js dev server port
EXPOSE 3000

# Default command - keep container running
CMD ["sleep", "infinity"]
