<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/djangbahevans/peg-case-study">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">PEG Africa Python Developer Case Study</h3>

  <p align="center">
    My solution to PEG AFrica's Python Developer Case Study
    <br />
    <a href="https://github.com/djangbahevans/peg-case-study"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/djangbahevans/peg-case-study">View Demo</a>
    ·
    <a href="https://github.com/djangbahevans/peg-case-study/issues">Report Bug</a>
    ·
    <a href="https://github.com/djangbahevans/peg-case-study/issues">Request Feature</a>
  </p>
</div>

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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

As part of my python developer job interview with PEG Africa, it was required that I completed a challenging case study and make some documentation on it. This repository is my attempt at the solution.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [FastAPI](https://fastapi.tiangolo.com/)
* [React.js](https://reactjs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To avoid having to install multiple dependencies to run the application, it is essential to have docker installed. Install it for your system by following the relevant instructions [here](https://docs.docker.com/get-docker/). All neccesary docker and docker-compose files have been provided.

### Prerequisites

This application installs all prerequisites with docker. Therefore verify that dockeris installed by running

  ```sh
  docker -v
  ```

### Installation

1. Open the project path in your terminal

2. Build the images with docker compose

   ```sh
   docker compose build
   ```

3. Run alembic migrations

   ```sh
   docker compose run backend alembic upgrade head
   ```

4. Stop and remove and running containers

   ```sh
   docker compose down
   ```

5. Start application with docker

   ```sh
   docker compose up -d
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Visit [http://localhost:80](http://localhost:80) on the browser to interact with the application. API documentation is available at [http://localhost:3000](http://localhost:3000/docs)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

Because this is a test application, no roadmap is available

See the [open issues](https://github.com/djangbahevans/peg-case-study/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Evans Djangbah - [@djangbahevans](https://twitter.com/djangbahevans) - djangbahevans@yahoo.com

Project Link: [https://github.com/djangbahevans/peg-case-study](https://github.com/djangbahevans/peg-case-study)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Sri Nemani](https://www.linkedin.com/in/kameswari-srivalli-nemani-41638aa8)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/djangbahevans/peg-case-study.svg?style=for-the-badge
[contributors-url]: https://github.com/djangbahevans/peg-case-study/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/djangbahevans/peg-case-study.svg?style=for-the-badge
[forks-url]: https://github.com/djangbahevans/peg-case-study/network/members
[stars-shield]: https://img.shields.io/github/stars/djangbahevans/peg-case-study.svg?style=for-the-badge
[stars-url]: https://github.com/djangbahevans/peg-case-study/stargazers
[issues-shield]: https://img.shields.io/github/issues/djangbahevans/peg-case-study.svg?style=for-the-badge
[issues-url]: https://github.com/djangbahevans/peg-case-study/issues
[license-shield]: https://img.shields.io/github/license/djangbahevans/peg-case-study.svg?style=for-the-badge
[license-url]: https://github.com/djangbahevans/peg-case-study/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/djangbahevans
[product-screenshot]: images/screenshot.png
