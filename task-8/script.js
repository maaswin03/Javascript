const data = {
  home: `
          <section class="hero-section" id="home">
        <div class="hero-container">
          <div>
            <!-- Hero section badge and description -->
            <p class="hero-badge">We build the future</p>
            <h1 class="hero-name">Build smarter.</h1>
            <h1 class="hero-name" id="secondary-hero-name">Scale faster.</h1>
            <p class="hero-description">
              Stop wrestling with fragile tech stacks and slow delivery. We
              build production-ready cloud platforms, AI products & full-stack
              apps — so you ship faster and scale without breaking.
            </p>
          </div>

          <!-- Hero section buttons for contact and work -->
          <div class="hero-button-container">
            <button class="primary-btn">Get in touch</button>

            <button class="primary-btn" style="background-color: transparent">
              See our work
            </button>
          </div>

          <!-- Metrics section with company achievements -->
          <div>
            <div class="metrics-container">
              <div class="metric-item">
                <h2 class="metric-value">100+</h2>
                <p class="metric-label">Projects completed</p>
              </div>
              <div class="metric-item">
                <h2 class="metric-value">24/7</h2>
                <p class="metric-label">Support</p>
              </div>
              <div class="metric-item">
                <h2 class="metric-value">3x</h2>
                <p class="metric-label">Delivery</p>
              </div>
              <div class="metric-item">
                <h2 class="metric-value">100%</h2>
                <p class="metric-label">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  services: `
          <section class="services-section" id="services">
        <div class="about-section-1">
          <p class="card-badge">SERVICES</p>
          <h1 class="card-header">What we do best</h1>
        </div>
        <div class="about-section-2">
          <div class="cards-container">
            <!-- Service Card - 1 contains cloud computing services -->
            <div class="card">
              <h3 class="card-name">Cloud Computing</h3>
              <p class="card-description">
                Scalable cloud architectures on AWS, Azure & GCP with migration,
                optimization and managed infra.
              </p>
              <div class="card-tags">
                <span class="tag">AWS</span>
                <span class="tag">Azure</span>
                <span class="tag">GCP</span>
              </div>
            </div>

            <!-- Service Card - 2 contains web development services -->
            <div class="card">
              <h3 class="card-name">Web Development</h3>
              <p class="card-description">
                High-performance web apps built with modern frameworks —
                responsive, accessible and fast.
              </p>
              <div class="card-tags">
                <span class="tag">Next.js</span>
                <span class="tag">React</span>
                <span class="tag">Vue.js</span>
              </div>
            </div>

            <!-- Service Card - 3 contains mobile app development services -->
            <div class="card">
              <h3 class="card-name">Mobile Apps</h3>
              <p class="card-description">
                Cross-platform mobile experiences for iOS and Android — built
                for engagement and scale.
              </p>
              <div class="card-tags">
                <span class="tag">React Native</span>
                <span class="tag">Flutter</span>
                <span class="tag">IOS</span>
              </div>
            </div>

            <!-- Service Card - 4 contains AI & Machine Learning services -->
            <div class="card">
              <h3 class="card-name">AI & Machine Learning</h3>
              <p class="card-description">
                Intelligent systems with ML, NLP and generative AI to automate
                workflows and surface insights.
              </p>
              <div class="card-tags">
                <span class="tag">Python</span>
                <span class="tag">TensorFlow</span>
                <span class="tag">PyTorch</span>
              </div>
            </div>

            <!-- Service Card - 5 contains DevOps & CI/CD services -->
            <div class="card">
              <h3 class="card-name">DevOps & CI/CD</h3>
              <p class="card-description">
                End-to-end pipelines with automated testing, containerization
                and continuous delivery at speed.
              </p>
              <div class="card-tags">
                <span class="tag">Docker</span>
                <span class="tag">Kubernetes</span>
                <span class="tag">Jenkins</span>
              </div>
            </div>

            <!-- Service Card - 6 contains UI/UX Design services -->
            <div class="card">
              <h3 class="card-name">UI/UX Design</h3>
              <p class="card-description">
                Research-driven design systems and interfaces — from wireframes
                to pixel-perfect production code.
              </p>
              <div class="card-tags">
                <span class="tag">Figma</span>
                <span class="tag">Sketch</span>
                <span class="tag">Adobe XD</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  about: `
    <section class="about-section" id="about">
        <!-- About section header with badges , header and description -->
        <div class="about-section-1">
          <p class="card-badge">ABOUT US</p>
          <h1 class="card-header">Our mission and values</h1>
          <p class="about-description">
            Saas is a technology startup on a mission to engineer intelligent,
            scalable digital products. Our team of architects, engineers, and AI
            specialists delivers cloud-native platforms and full-stack solutions
            built for real-world scale.
          </p>
        </div>
        <div class="about-section-2">
          <div class="cards-container">
            <!-- About  Card - 1 contains innovation values -->
            <div class="card">
              <div class="logo">I</div>
              <h3 class="card-name" style="margin-top: 5%">Innovation First</h3>
              <p class="card-description">
                We push boundaries with cutting-edge tech - from AI to
                cloud-native architectures.
              </p>
            </div>

            <!-- About  Card - 2 contains client-focused values -->
            <div class="card">
              <div class="logo">C</div>
              <h3 class="card-name" style="margin-top: 5%">Client Obsessed</h3>
              <p class="card-description">
                Every decision is driven by measurable impact and real business
                outcomes for you.
              </p>
            </div>

            <!-- About Card - 3 contains scalability values -->
            <div class="card">
              <div class="logo">B</div>
              <h3 class="card-name" style="margin-top: 5%">Built to Scale</h3>
              <p class="card-description">
                Our solutions are engineered for growth - resilient systems that
                evolve with you.
              </p>
            </div>

            <!-- About Card - 4 contains relentless focus values -->
            <div class="card">
              <div class="logo">R</div>
              <h3 class="card-name" style="margin-top: 5%">Relentless Focus</h3>
              <p class="card-description">
                We ship fast without cutting corners - quality and speed aren't
                mutually exclusive.
              </p>
            </div>
          </div>
        </div>
      </section>
    `,
  team: `
          <!-- Team section with team members and their roles -->
      <section class="team-section" id="team">
        <!-- Team section header with badges and header -->
        <div class="about-section-1">
          <p class="card-badge">OUR TEAM</p>
          <h1 class="card-header">Meet our experts</h1>
        </div>

        <div class="about-section-3">
          <div class="grid-container">
            <!-- Team Member - 1 about project manager-->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/57.png"
                  alt="MS Dhoni"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>M S Dhoni</h1>
                <p>Project Manager</p>
                <div class="extra-content">
                  <p>
                    Leads teams with strategic planning and ensures timely
                    project delivery.
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Member - 2 about full stack developer -->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"
                  alt="Virat Kohli"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>Virat Kohli</h1>
                <p>Full Stack Developer</p>
                <div class="extra-content">
                  <p>
                    Builds scalable web applications with modern technologies.
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Member - 3 about UI/UX Designer -->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png"
                  alt="Rohit Sharma"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>Rohit Sharma</h1>
                <p>UI/UX Designer</p>
                <div class="extra-content">
                  <p>
                    Designs intuitive user experiences and visually appealing
                    interfaces.
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Member - 4 about backend developer -->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/12.png"
                  alt="Shreyas Iyer"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>Shreyas Iyer</h1>
                <p>Backend Developer (Java)</p>
                <div class="extra-content">
                  <p>
                    Develops robust backend systems, ensuring scalability, and
                    reliability.
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Member - 5 about DevOps Engineer -->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png"
                  alt="Hardik Pandya"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>Hardik Pandya</h1>
                <p>DevOps Engineer</p>
                <div class="extra-content">
                  <p>
                    Manages deployment pipelines, and ensures smooth CI/CD
                    processes.
                  </p>
                </div>
              </div>
            </div>

            <!-- Team Member - 6 about Frontend Developer -->
            <div class="grid">
              <div class="grid-image-container">
                <img
                  src="https://documents.iplt20.com/ipl/IPLHeadshot2025/62.png"
                  alt="Shubman Gill"
                  class="grid-image"
                />
              </div>
              <div class="grid-contents">
                <h1>Shubman Gill</h1>
                <p>Frontend Developer</p>
                <div class="extra-content">
                  <p>
                    Builds responsive and interactive user interfaces with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  contact: `
    <section class="contact-section" id="contact">
        <!-- Contact section (left side) with contact information -->
        <div class="contact-main-container">
          <div class="about-section-3">
            <!-- Contact section header with badges and header -->
            <p class="card-badge">CONTACT US</p>
            <h1 class="card-header">Let's build something great together</h1>
            <p class="contact-description">
              Whether you're ready to start your project or just want to learn
              more, we're here to help. Reach out and let's discuss how we can
              bring your vision to life.
            </p>

            <!-- Contact information with phone number and email -->
            <div class="contact-info">
              <div class="contact-phone">
                <div class="logo">P</div>
                <p>+91 9876543210</p>
              </div>
              <div class="contact-email">
                <div class="logo">E</div>
                <p>info@saas.com</p>
              </div>
            </div>
          </div>

          <!-- Contact section (right side) with contact form -->
          <div class="about-section-4">
            <div class="contact-container">
              <h2 class="contact-heading">Send a message</h2>
              <p class="contact-description">
                We'll reply with a plan, timeline, and proposal.
              </p>
              <form class="contact-form">
                <label for="name" class="contact-label">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  class="contact-input"
                  required
                />
                <label for="email" class="contact-label">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  class="contact-input"
                  required
                />
                <label for="message" class="contact-label">Message</label>
                <textarea
                  placeholder="Your Message"
                  class="contact-textarea"
                  cols="30"
                  rows="5"
                  required
                ></textarea>

                <!-- Contact form submit button -->
                <button type="submit" class="primary-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `,
};

function render() {
  const hash = window.location.hash.replace("#", "") || "home";
  const section = document.getElementById("app");

  section.innerHTML = data[hash] || `<h1>Page not found</h1>`;
}

window.onload = render;
window.onhashchange = render;
