# 42labs-rampup

<div id="top"></div>

<!-- PROJECT SHIELDS -->
<br/>
<p align="center">
    <img src="https://github.com/vinicius507/42labs-rampup/blob/main/resources/repo/42-labs-logo.png" alt="Logo" width="150" height="150">

  <p align="center">
    A simple to-do app written in Javascriptm using the NestJS framework. Developed as the ramp up project for the Soulloop Labs.
    <br/>
    <img src="https://img.shields.io/badge/Testing%20Coverage-100%25-brightgreen"/>
    <img src="https://img.shields.io/badge/Docker%20Build-passed-blue"/>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project was developed as an introdutory project with the goal of teaching us concepts and technologies that will be used during our time working at [Soulloop](https://soulloop.com/) during the Labs project.

The project requirements were:

1. Build a NestJS api with the following endpoints:
    * GET /tasks: List all tasks
    * POST /tasks: Create a new task
    * PUT /tasks/:id Update an existing task
    * DELETE /tasks/:id Delete an existing task

2. Implement a database that:
    * Uses PostgreSQL as a DB
    * Uses TypeORM to establish a connection and interface with the DB

3. Testing:
    * Implement unitary tests for the app services
    * Implement integration tests (e2e) for all API endpoints
    * Reach a test coverage of at least 80%

4. Docker:
    * Create a Dockerfile for the application
    * Create a docker-compose.yml file that builds the application and the database.

5. Setup GitHub Actions so that it:
    * Executes all unitery and integration tests
    * Verifies test coverage
    * Build and test the application Docker image

Besides the aforementioned mandatory requisites. We could also implement the following bonus features:

* Implement JWT authentication
* Add data validation using class validators
* Setup automatic deploy and staging for a live enviroment using Heroku or DigitalOcean.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Nest.js](https://nestjs.com/)
* [Swagger](https://swagger.io/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

Make sure you have Node.js and Docker installed on your machine. Follow the instructions on Nodes and Dockers website or download them using your Linux distribution package manager.

Use Node's package manager to install NestJS:

  ```sh
  npm i -g @nestjs/cli
  ```

Then simply run docker-compose to build the app image and deploy it locally to your machine:
  ```sh
  docker compose up --build
  ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This project do not contain a front-end aspect to it. Because of it, you need to use a Rest API client like Postman or Thunder Client to interact with it. The appication will be listening to port 3000.

Alternativaly, you may access the ```http://localhost:3000/docs``` endpoint view Swagger documentation and interact with the API through it.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the [GNU General Public License version 3 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html). 

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Authors

* [vgoncalv | Vinícius Gonçalves de Oliveira](https://github.com/vinicius507)
* [ccamargo | Christian Camargo Del Moro](https://github.com/chrisdelmoro)

<p align="right">(<a href="#top">back to top</a>)</p>
