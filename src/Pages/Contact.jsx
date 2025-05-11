import React from "react";

const Contact = () => {
  return (
    <div className="max-w-[1600px] h-screen mx-auto px-4 py-6 grid grid-cols-2 items-center justify-center bg-[url('https://i.pinimg.com/1200x/38/f4/d6/38f4d6205c57fb2b4e63e70d087b9ad6.jpg')] bg-cover bg-center image-opacity-50">
      <div className="w-full col-span-1">
        <h1 className="text-3xl font-bold text-center text-gray-100">Contact Us</h1>
        <form className="mt-6 space-y-4 max-w-md mx-auto">
          <div>
            <label htmlFor="name" className="block text-gray-200">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-200">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-200">Message</label>
            <textarea
              id="message"
              placeholder="Your message"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </div>
      <div className="col-span-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019706383696!2d-122.42177848468141!3d37.774929279759794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6b0f52b9%3A0x5de7c9a4b9d5d53!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1614112378070!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          class="border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
