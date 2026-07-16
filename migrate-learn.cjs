const fs = require('fs');
const path = require('path');
const dir = 'src/pages/learn';
const files = fs.readdirSync(dir);

files.forEach(f => {
  if (f.endsWith('.jsx')) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    
    // Replace imports
    content = content.replace(
      /import '\.\.\/\.\.\/styles\/debt\.css';/,
      "import { Link } from 'react-router-dom';\nimport Navbar from '../../components/Navbar';\nimport '../../styles/learn.css';"
    );
    
    // Wrap main content
    content = content.replace(
      /return \(\s*<>\s*(<div className="head">[\s\S]*?)<\/>/m,
      `return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          $1
        </div>
      </div>
    </>
  )`
    );
    
    // Clean up old classes
    content = content.replace(/<div className="head">/g, '<div>');
    
    // Update image and iframe styles
    content = content.replace(/<img src="([^"]+)" alt="([^"]+)" style={{ height: '300px' }} \/>/g, '<img src="$1" alt="$2" className="article-image" />');
    
    content = content.replace(/<iframe([\s\S]*?)><\/iframe>|<iframe([\s\S]*?)\/>/g, (match) => {
      return match.replace('<iframe', '<iframe className="article-video"');
    });
    
    fs.writeFileSync(path.join(dir, f), content);
  }
});
