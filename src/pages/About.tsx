import React from 'react';
import { User } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600&h=600" 
                alt="Profile" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <User className="text-blue-600" />
                About Me
              </h2>
              <p className="text-gray-600 mb-6">
                I'm a passionate Full Stack Developer with expertise in modern web technologies.
                With a strong foundation in both frontend and backend development, I create
                scalable and efficient web solutions that solve real-world problems.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-gray-600">Bachelor's in Computer Science</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p className="text-gray-600">JavaScript, TypeScript, Python, SQL</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Interests</h3>
                  <p className="text-gray-600">Web Development, Cloud Computing, AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}