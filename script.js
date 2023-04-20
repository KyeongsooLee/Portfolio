// Header toggle

let MenuBtn = document.getElementById('MenuBtn')

MenuBtn.addEventListener('click', function(e) {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('fa-xmark')
})


// Typing Effect

let typed = new Typed('.auto-input',{
    strings: ['Front-End and Back-End Developer', 'Passionate about learning new things', 'Dedicated to continuous learning and growth', 'Focused on meeting project deadlines'],
    typeSpeed: 25,
    backSpeed: 10,
    backDelay: 2000,
    loop: true,
})

// Active Link State On Scroll

// Get All Links
let navLinks = document.querySelectorAll('nav ul li a')
// Get All Sections
let sections = document.querySelectorAll('section')

window.addEventListener('scroll', function(){
    const scrollPos = window.scrollY + 20
    sections.forEach(section => {
        if(scrollPos > section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)){
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(section.getAttribute('id') === link.getAttribute('href').substring(1)){
                    link.classList.add('active')
                }
            });
        }
    });
});


// EmailJS initialization
// Save the values from GitHub Secrets to variables
const emailjsPublicKey = '<%=process.env.EMAILJS_PUBLIC_KEY%>';
const emailjsServiceID = '<%=process.env.EMAILJS_SERVICE_ID%>';
const emailjsTemplateID = '<%=process.env.EMAILJS_TEMPLATE_ID%>';
emailjs.init(emailjsPublicKey);

// Function to handle form submission
function sendEmail(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('msg').value.trim();

  // Check if all fields are filled out
  if (!name || !email || !subject || !message) {
    alert('Please fill out all fields.');
    return;
  }

  // Prepare the email template parameters
  const templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };
  
  // Send the email using EmailJS
  emailjs.send(emailjsServiceID, emailjsTemplateID, templateParams)
  .then(function(response) {
    alert('Email sent successfully!');
    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('msg').value = '';
  }, function(error) {
    alert('Failed to send email: ' + error);
  });
}

// Add event listener to the form submit button
document.getElementById('contact-form').addEventListener('submit', sendEmail);