# Nextastra-task-app

# NextAstra Task Manager

A simple task management web application deployed on a local Ubuntu virtual machine as part of the NextAstra Technologies Junior DevOps assignment.

The project demonstrates application deployment using Node.js, process management with PM2, reverse proxy configuration with Nginx, and CI/CD automation using Jenkins integrated with GitHub.

## Project Overview

The application allows users to:
- Create tasks.
- View all tasks.
- Update task details and status.
- Delete tasks.
- Check application health through an API endpoint.

SQLite is used as the lightweight database.

## Technology Stack

| Component | Technology |
|---|---|
| Operating System | Ubuntu Linux |
| Backend | Node.js, Express.js |
| Frontend | HTML, CSS, JavaScript |
| Database | SQLite |
| Process Manager | PM2 |
| Web Server / Reverse Proxy | Nginx |
| CI/CD | Jenkins |
| Version Control | Git and GitHub |
| Public HTTPS Access | Cloudflare Quick Tunnel |

## Architecture

```text
                  User / Internet
                         |
                         v
                Public HTTPS URL
                 Cloudflare Tunnel
                         |
                         v
                    Nginx :80
                         |
                         v
                Node.js App :3000
                    (PM2)
                         |
                         v
                   SQLite Database


       GitHub Repository
              |
              v
           Jenkins
              |
       Checkout Source
              |
       Install Dependencies
              |
          Run Tests
              |
       Execute Deployment
              |
       Restart App with PM2
              |
       Health Check
```

## Application Details

**Application Name:** NextAstra Task Manager

**Repository:** https://github.com/dattarajchindarkar/Nextastra-task-app

**Public Application URL:** https://major-capabilities-separately-largely.trycloudflare.com

**Local Application URL:** http://localhost

**Node.js Application Port:** 3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Application health check |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a specific task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Deployment and Configuration

### 1. Clone the repository

```bash
git clone https://github.com/dattarajchindarkar/Nextastra-task-app.git
cd Nextastra-task-app
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Run the application

```bash
npm start
```

The application runs on port 3000.

### 4. Manage the application with PM2

Start the application:

```bash
pm2 start npm --name nextastra-task-app -- start
```

Check application status:

```bash
pm2 status
```

View application logs:

```bash
pm2 logs nextastra-task-app
```

Restart the application:

```bash
pm2 restart nextastra-task-app
```

### 5. Nginx Reverse Proxy

Nginx listens on port 80 and forwards incoming HTTP requests to the Node.js application running on port 3000.

Configuration file:

`/etc/nginx/sites-available/nextastra`

Validate and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Jenkins CI/CD Pipeline

A Jenkins pipeline is configured to connect to the GitHub repository using the `Jenkinsfile`.

The pipeline contains the following stages:

1. **Checkout:** Retrieves the latest source code from GitHub.
2. **Install Dependencies:** Runs `npm ci`.
3. **Test:** Executes the configured Node.js syntax checks using `npm test`.
4. **Deploy:** Executes the deployment script, installs dependencies, restarts the application through PM2, and checks application health.

Deployment script:

`/usr/local/bin/deploy-nextastra`

### 7. Public HTTPS Access

Cloudflare Quick Tunnel provides public HTTPS access to the locally hosted application.

The tunnel forwards external requests to the local Nginx server.

**Note:** The Quick Tunnel URL is temporary and can change when the tunnel is restarted. Keep the tunnel process running during the demonstration.

## Monitoring

The following commands are used for basic system and application monitoring.

Check PM2 processes:

```bash
pm2 status
```

View application logs:

```bash
pm2 logs nextastra-task-app
```

Check memory usage:

```bash
free -h
```

Check disk usage:

```bash
df -h
```

Check Nginx status:

```bash
sudo systemctl status nginx
```

Check application health:

```bash
curl http://localhost:3000/health
```

## Testing

The project includes a basic test script that performs JavaScript syntax checks on the application files.

Run:

```bash
npm test
```

The application was also manually verified through its web interface, including task creation and deletion.

## Project Limitations

- This is an assignment-level demonstration, not a production-ready deployment.
- SQLite is used as a lightweight local database.
- Cloudflare Quick Tunnel provides a temporary public URL.
- The application runs on a local Ubuntu virtual machine and depends on the VM and tunnel remaining active.
- Automated deployment is demonstrated through Jenkins and PM2.

## Conclusion

This project demonstrates a basic DevOps deployment workflow involving GitHub, Jenkins CI/CD, Node.js, PM2, Nginx, and public HTTPS access through Cloudflare Tunnel on a local Ubuntu virtual machine.
