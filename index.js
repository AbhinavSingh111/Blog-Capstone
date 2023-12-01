import express from 'express';
import bodyParser from 'body-parser';
import { articles } from './essays.js';

let domains = [
    'technology',
    'business',
    'lifestyle',
    'travel',
    'food',
    'health',
    'fashion',
    'entertainment',
    'design',
    'science',
    'other'
  ];

let category = {

technology : [
    "The Impact of 5G Technology on Connectivity",
    "Future Trends in Artificial Intelligence",
    "Cybersecurity in the Digital Age",
    "Emerging Technologies in Healthcare",
    "Space Exploration and Technology",
    "Augmented Reality: Transforming Industries",
    "The Evolution of Smartphones",
    "Blockchain and its Applications",
    "Robotic Innovations in Industry",
    "Green Technology for a Sustainable Future"
  ],
  
  business : [
    "Entrepreneurship in the Digital Era",
    "Global Business Trends in a Post-Pandemic World",
    "The Role of E-commerce in Modern Business",
    "Leadership Strategies for Success",
    "Innovations in Supply Chain Management",
    "Financial Technology (Fintech) Revolution",
    "The Impact of Social Responsibility on Business",
    "Strategies for Small Business Growth",
    "Digital Marketing: Trends and Best Practices",
    "Navigating Business Challenges in a Dynamic Market"
  ],
  
  lifestyle : [
    "Mindful Living: Cultivating a Balanced Lifestyle",
    "Minimalism and Its Impact on Daily Life",
    "Self-Care Practices for Mental Well-being",
    "Building Healthy Habits for Longevity",
    "The Art of Positive Thinking",
    "Holistic Approaches to Fitness",
    "Stress Management Techniques",
    "Creating a Home Sanctuary: Interior Design Tips",
    "Mindful Eating for a Healthier Lifestyle",
    "Outdoor Activities for Leisure and Relaxation"
  ],
  
  travel : [
    "Solo Travel Adventures: Discovering Yourself on the Road",
    "Culinary Tourism: Exploring Global Flavors",
    "Family-Friendly Vacation Destinations",
    "Digital Nomad Lifestyle: Working and Traveling",
    "Adventure Sports and Outdoor Activities",
    "Hidden Gems: Off the Beaten Path Travel",
    "Sustainable Travel: Reducing Your Carbon Footprint",
    "Tips for Budget-Friendly Travel",
    "Cultural Immersion: Connecting with Local Communities",
    "Road Trips: Exploring the Beauty of the Open Road"
  ],
  
  food : [
    "International Cuisine: A Culinary Journey",
    "Plant-Based and Vegan Recipes",
    "Quick and Healthy Meal Ideas",
    "Baking and Pastry: Delicious Treats at Home",
    "Exploring Street Food Around the World",
    "Cooking with Seasonal and Local Ingredients",
    "Cocktail and Mocktail Creations",
    "Food Pairing: Enhancing Flavors",
    "Homemade Snacks for Healthy Living",
    "Farm-to-Table: Fresh and Sustainable Eating"
  ],
  
  health : [
    "Holistic Health Approaches: Mind, Body, and Spirit",
    "Mental Health Awareness and Strategies",
    "Nutrition Tips for Optimal Well-being",
    "Fitness Routines for a Healthy Body",
    "Sleep Hygiene: Improving Your Sleep Quality",
    "Mindfulness Meditation and Stress Reduction",
    "Natural Remedies for Common Ailments",
    "Building a Resilient Immune System",
    "Exploring Alternative Therapies",
    "Fitness Challenges and Transformations"
  ],
  
  fashion : [
    "Seasonal Fashion Trends: Style Inspiration",
    "Sustainable Fashion: Ethical Choices",
    "Capsule Wardrobe: Streamlining Your Style",
    "DIY Fashion: Personalizing Your Wardrobe",
    "Fashion Icons and Influencers",
    "Second-Hand Shopping: Vintage Finds",
    "Fashion and Confidence: Embracing Your Unique Style",
    "Accessorizing Tips for Every Occasion",
    "Fashion Industry Insights and Critiques",
    "Fashion Photography and Visual Storytelling"
  ],
  
  entertainment : [
    "Latest Movie Releases and Reviews",
    "TV Show Recommendations for Binge-Watching",
    "Music Across Genres: New Releases and Classics",
    "Gaming Culture: Trends and Reviews",
    "Celebrity News and Gossip",
    "Book Recommendations and Literary Discussions",
    "Art and Creativity in Entertainment",
    "Podcasts Worth Listening To",
    "Virtual Events and Online Performances",
    "Pop Culture Commentary and Analysis"
  ],
  
  design : [
    "Interior Design Trends: Creating Stylish Spaces",
    "Graphic Design Tips and Tricks",
    "Web Design: User Experience and Aesthetics",
    "Architectural Marvels Around the World",
    "DIY Home Improvement Projects",
    "Typography and Font Trends",
    "Photography Composition and Techniques",
    "Product Design Innovations",
    "The Intersection of Art and Design",
    "Inclusive Design: Accessibility in Creativity"
  ],
  
  science: [
    "The Wonders of Space and Astrophysics",
    "Environmental Science and Conservation",
    "Biotechnology Breakthroughs",
    "Earth Sciences: Geology and Meteorology",
    "The Microscopic World: Biology at a Cellular Level",
    "Physics Explained: From Quantum to Classical",
    "Innovations in Materials Science",
    "Psychology Studies and Insights",
    "Chemistry Discoveries and Applications",
    "Scientific Endeavors: Past, Present, and Future",
  ] 
}
  


const app = express();
const port = 3000;
let catg = '';

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('index.ejs',{data:[]});
})

app.get('/about',(req,res)=>{
    res.render('about.ejs');
})

app.get('/contact',(req,res)=>{
    res.render('contact.ejs');
})

app.get('/blog-category/:catId',(req,res)=>{
    catg = req.params.catId;
    // console.log(catg);
    res.render('index.ejs',{data:category[catg],uri:encodeURIComponent(category[catg])});
})

app.get('/blog-category/:catId/:artId',(req,res)=>{
    let ctid = req.params.catId;
    let art = req.params.artId.replace('%20', ' ');
    // console.log(articles[ctid][art]);
    res.render('partials/article.ejs',{article:articles[ctid][art] , artUri:'/blog-category/'+ctid+'/'+req.params.artId});
})

app.get('/create_article/',(req,res)=>{
    res.render('create_article.ejs',{categories:domains});
})

app.get('/blog-category/:catId/:artId/edit',(req,res)=>{
    let ctid = req.params.catId;
    let art = req.params.artId.replace('%20', ' ');
    res.render('partials/edit_article.ejs',{artUri:'/blog-category/'+ctid+'/'+req.params.artId, title:art, article:articles[ctid][art]})
    // editButton.onclick(saveContent(ctid,art));
})

app.post('/blog-category/:catId/:artId/saved',(req,res)=>{
    // category[]
    let ctid = req.params.catId;
    let art = req.params.artId.replace('%20', ' ');
    const newHead = req.body.headingContent.replace('&nbsp;'," ");
    category[ctid][art] = newHead;
    articles[ctid][newHead] = req.body.articleContent;
    console.log(category[ctid][art]);
    res.render("index.ejs",{data:[]})
})

const essay_submmission = (entered_Catg,newCategory,heading,essay)=>{
    if(domains.includes(entered_Catg)){
        console.log("yes");
        category[entered_Catg].push(heading);
        // console.log(category[entered_Catg]);
        articles[entered_Catg][heading] = essay;
        console.log(articles[entered_Catg][heading]);
    }
}

app.post('/create_article/submit',(req,res)=>{
    console.log(req.body.category);
    console.log(req.body.newCategory);
    console.log(req.body.heading);
    console.log(req.body.essay);
    essay_submmission(req.body.category,req.body.newCategory,req.body.heading,req.body.essay);
    console.log(category[req.body.category]);
    res.render('create_article.ejs',{categories:domains});

})

app.listen(port,(req,res)=>{
    console.log(("listening on port 3000"));
})


