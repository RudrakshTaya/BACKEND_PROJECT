const mongoose = require('mongoose');
const connectDB = require('./src/Database/db');
const Card = require('./src/Models/cards.Models');

const allCards = [
    {
        title: 'Margherita Pizza',
        text: 'Topped with San Marzano sauce,fresh mozzarella,olive oil and Parmesan.',
        imgSrc: 'https://thumbs.dreamstime.com/b/top-view-delicious-pizza-margherita-san-marzano-tomatoes-mozzarella-262496469.jpg',
        link: '/#card1', // Add link for each card
        price:'$50',
        rating:3.9
      },
      {
        title: 'Aloo Cheese Tikki Burger',
        text: 'A crispy fried aloo tikki patty with spicy sauce-lettuce,cheese slice all in atoasted bun.',
        imgSrc: 'https://th.bing.com/th/id/OIP.ZTNhG1pS0EOEyMlUPeDbwQHaFq?rs=1&pid=ImgDetMain',
        link: '/#card2', // Add link for each card\
        price:'$30',
        rating:4.2
      },
      {
        title: 'Veg Hakka Noodles',
        text: 'A delightful fusion of vegetables and noodles, busting and tantalizing flavours and textures.',
        imgSrc: 'https://www.whiskaffair.com/wp-content/uploads/2020/03/Hakka-Noodles-2-3.jpg',
        link: '/#card3', // Add link for each card
        price:'$25',
        rating:4.3
      },
      {
        title: 'Veg Momo',
        text: 'Delicious Oriental dumplings filled with vegetables',
        imgSrc: 'https://th.bing.com/th/id/OIP.V4OsG1KS9tyE7k_njy1eWAHaFj?rs=1&pid=ImgDetMain',
        link: '/#card1', // Add link for each card
        price:'$20',
        rating:5
      },
      {
        title: 'Paneer Tikka',
        text: 'Cubes of cottage cheese roasted in tandoor.',
        imgSrc: 'https://th.bing.com/th/id/OIP.-ndMbbnDa5vPzgLYrBbLMgHaE7?rs=1&pid=ImgDetMain',
        link: '/#card2' ,// Add link for each card
        price:'$35',
        rating:5
      },
      {
        title: 'Masala Dosa',
        text: 'Dosa stuffed with mashed potates and onions served with sambhar , coconut and red chutney.',
        imgSrc: 'https://bing.com/th?id=OSK.3005d09f532d43f7fb4183e1cfb34d8f',
        link: '/#card3', // Add link for each card
        price:'$20',
        rating:4.1
      },
      {
        title: 'Pav Bhaji',
        text: 'Fluffy butter toasted buns served with a mix of crunchy vegetables cooked with flery spices.',
        imgSrc: 'https://recipes.timesofindia.com/photo/52416693.cms?imgsize=53280',
        link: '/#card1', // Add link for each card 
        price:'$23',
        rating:4.5
      },
      {
        title: 'Chole Bhatture',
        text: 'A classic punjabi combo of fluffy bhatura and delicious chickpea gravy.',
        imgSrc: 'https://i.ytimg.com/vi/rgp0IqPb7fQ/maxresdefault.jpg',
        link: '/#card2' ,// Add link for each card
        price:'$28',
        rating:4.4
      },
      {
        title: 'Tomato Sauce Pasta',
        text: 'Italian favorite,featuring aldente pasta smothered in a rich and tangy tomato sauce.',
        imgSrc: 'https://th.bing.com/th/id/OIP.EOD2-_0MeetDUstQQ4I5-wHaE7?rs=1&pid=ImgDetMain',
        link: '/#card3', // Add link for each card
        price:'$45',
        rating:4.2
      },
      {
        title: 'Chilly Paneer Pizza',
        text: 'Prepared with herbed and olive oil and veggies tossed in soy chilli dressing.',
        imgSrc: 'https://media.istockphoto.com/id/1341905666/photo/chinese-food-veg-pizza.jpg?s=612x612&w=0&k=20&c=ZMNxcRhL9uGV8zebXg5wGCh-5GzVBRHsu-lz7Sc06V4=',
        link: '/#card1' ,// Add link for each card
        price:'$50',
        rating:3.7
      },
      {
        title: 'Honey Chilli Potato',
        text: 'Potato strips tossed in honey chilli dressing.',
        imgSrc: 'https://th.bing.com/th/id/OIP.MKAue9GXNAs0bwAxM5ZYRQHaGn?rs=1&pid=ImgDetMain',
        link: '/#card2' ,// Add link for each card
        price:'$26',
        rating:4.1
      },
      {
        title: 'Masala Idli',
        text: 'A delicatable meal with soft idli,served along with a subtly spiced chutney and sambhar.',
        imgSrc: 'https://i1.wp.com/vegecravings.com/wp-content/uploads/2017/03/fried-idli-recipe-step-by-step-instructions.jpg?w=2418&quality=65&strip=all&ssl=1',
        link: '/#card3', // Add link for each card
        price:'$20',
        rating:4.3
      },
      {
          title: 'Kanda Poha',
          text: 'A scrumptious and flavorful vegetarian delicacy from India`s Poha cuisine.',
          imgSrc: 'https://www.cookforindia.com/wp-content/uploads/2016/04/kanda-poha.jpg',
          link: '/#card1', // Add link for each card
          price:'$12',
          rating:3.6
        },
        {
          title: 'Rasmalai',
          text: 'A Navratri Special dessert that will leave you craving for more.',
          imgSrc: 'https://th.bing.com/th/id/R.d4d9771a4796f6e961602d33320c6345?rik=5fNaeucAvJ%2fTDg&riu=http%3a%2f%2fwww.cookwithmanali.com%2fwp-content%2fuploads%2f2014%2f07%2fRasmalai-Recipe.jpg&ehk=r7iD0tn%2bLIPSLB8RTlI6XkGFDRnsJu%2bEduwI4bo7YsE%3d&risl=&pid=ImgRaw&r=0',
          link: '/#card2' ,// Add link for each card
          price:'$15',
          rating:4.7
        },
        {
          title: 'Sponge Rasgulla',
          text: 'Indulge in the divine sweetness of this healthy dessert.',
          imgSrc: 'https://th.bing.com/th/id/OIP.Oo_jrIlovPJymE7FL2WL2QHaKj?rs=1&pid=ImgDetMain',
          link: '/#card3', // Add link for each card
          price:'$10',
          rating:5
        },
        {
          title: 'Paneer Tikka Wrap',
          text: 'Paneer tikka spices , onion , tomato , capsicum , cheese stuffed in Burger Bun.',
          imgSrc: 'https://th.bing.com/th/id/R.bc98ca4c41a5d46fb14317756f64c803?rik=68JrHf0M2C0PdQ&riu=http%3a%2f%2fwww.archanaskitchen.com%2fimages%2farchanaskitchen%2f0-Archanas-Kitchen-Recipes%2f2020%2fPaneer_Tikka_Kathi_Roll_Recipe_video_2_1600.jpg&ehk=rs%2fQkQzR4XUyQdLQgP2e9E1JauQSjHJM40wl88GZ%2beE%3d&risl=&pid=ImgRaw&r=0',
          link: '/#card1', // Add link for each card
          price:'$20',
          rating:3.8
        },
        {
          title: 'Arabiata(Red sauce)',
          text: 'Pasta tossed with freshly made tomato sauce with infusion of basil oil.',
          imgSrc: 'https://th.bing.com/th/id/OIP.1MVG5W55evuaa5ZC0TcIVwHaLL?rs=1&pid=ImgDetMain',
          link: '/#card1', // Add link for each card
          price:'$20',
          rating:3.8
        },
        {
          title: 'Chocolate Truffle Pastry',
          text: 'Layers of soft chocolate and dense but silky-smooth chocolate ganache.',
          imgSrc: 'https://th.bing.com/th/id/OIP.Q0VhN4vj6puL7VcSkhAckgHaE8?rs=1&pid=ImgDetMain',
          link: '/#card2', // Add link for each card
          price:'$25',
          rating:3.9
        },
        {
          title: 'Red Velvet Pastry',
          text: 'The pastry with red velvet shade, frosting with butter cream.',
          imgSrc: 'https://product-assets.faasos.io/production/product/image_1657272196421_image_1635342896740_Rich_Red_Velvet_Pastry.jpg',
          link: '/#card3' ,// Add link for each card
          price:'$18',
          rating:3.5
    
        },
        {
          title: 'Card 21',
          text: 'This is card 3',
          imgSrc: 'https://t4.ftcdn.net/jpg/09/23/69/97/360_F_923699743_J8Au3Dg23NwAmWWEMfZ7AYKS1LYDrBxE.jpg',
          link: '/#card3' // Add link for each card
        },{
          title: 'Card 22',
          text: 'This is card 1',
          imgSrc: 'https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg',
          link: '/#card1' // Add link for each card
        },
        {
          title: 'Card 23',
          text: 'This is card 2',
          imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ5yRajIt8KX-DMiS8sp4BXEf02YjmqsqLvXFN9Y4Dz-hfpMUJnl4lcwhnVxo2bdbs5vQ&usqp=CAU',
          link: '/#card2' // Add link for each card
        },
        {
          title: 'Card 24',
          text: 'This is card 3',
          imgSrc: 'https://t4.ftcdn.net/jpg/09/23/69/97/360_F_923699743_J8Au3Dg23NwAmWWEMfZ7AYKS1LYDrBxE.jpg',
          link: '/#card3' // Add link for each card
        },
        {
          title: 'Card 25',
          text: 'This is card 3',
          imgSrc: 'https://t4.ftcdn.net/jpg/09/23/69/97/360_F_923699743_J8Au3Dg23NwAmWWEMfZ7AYKS1LYDrBxE.jpg',
          link: '/#card3' // Add link for each card
        },
  
];

const seedDB = async () => {
  await connectDB();
  await Card.deleteMany({});
  await Card.insertMany(allCards);
  console.log('Cards added to the database');
  mongoose.connection.close();
};

seedDB();
