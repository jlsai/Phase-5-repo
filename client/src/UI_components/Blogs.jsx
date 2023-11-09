import React from 'react';
import "/src/UI_components/Blogs.css"
import John from '/src/assets/John.jpg';
import talktome from '/src/assets/talktome.jpg';
import ken from '/src/assets/ken.jpeg';
import robert from '/src/assets/robert.jpeg';


const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'A Film Lover’s Paradise',
      author: 'John Doe',
      date: 'Nov 3, 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in placerat odio. Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod. Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod.',
      imageUrl: {ken},
    },
    {
      id: 2,
      title: 'Top 10 Must-See Movies of 2023',
      author: 'Jane Smith',
      date: 'Oct 25, 2023',
      content: 'Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod. Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod. Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod.',
      imageUrl: {John},
    },
    {
      id: 3,
      title: 'Scariest movies this year',
      author: 'Dan Kray',
      date: 'Oct 25, 2023',
      content: 'Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod. Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod.',
      imageUrl: {talktome},
    },
    {
      id: 4,
      title: 'Who was the best batman?',
      author: 'Joe York',
      date: 'Oct 25, 2023',
      content: 'Sed id justo in arcu cursus consectetur a nec ex. In vel metus at leo cursus euismod.',
      imageUrl: {robert},
    },
    // Add more blog posts here
  ];

  return (
    <div className="blog-section">
      <h2 className="section-title">Featured Blogs</h2>
      <div className="blog-columns">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-box">
            <div className="blog-image-container">
              <img src={post.imageUrl} alt="Blog Image" className="blog-image" />
            </div>
            <div className="blog-content-container">
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-info">
                By {post.author} - {post.date}
              </p>
              <p className="blog-content">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
