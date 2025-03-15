const websiteViews = [
  { day: "Sunday", views: 55 },
  { day: "Monday", views: 15 },
  { day: "Tuesday", views: 14 },
  { day: "Wednesday", views: 20 },
  { day: "Thursday", views: 39 },
  { day: "Friday", views: 45 },
  { day: "Saturday", views: 58 },
];

const dailySales = [
  { month: "January", sales: 300 },
  { month: "February", sales: 295 },
  { month: "March", sales: 210 },
  { month: "April", sales: 230 },
  { month: "May", sales: 142 },
  { month: "June", sales: 90 },
  { month: "July", sales: 125 },
  { month: "August", sales: 251 },
  { month: "September", sales: 298 },
  { month: "October", sales: 270 },
  { month: "November", sales: 150 },
  { month: "December", sales: 200 },
];

const fakeTopBooks = [
  {
    id: 1,
    title: "React for Beginners",
    sales: 450,
    price: 29.99,
    rating: 4.5,
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/140",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    sales: 320,
    price: 34.99,
    rating: 4.7,
    author: "Jane Smith",
    imageUrl: "https://via.placeholder.com/140",
  },
  {
    id: 3,
    title: "Mastering Firebase",
    sales: 280,
    price: 25.99,
    rating: 4.3,
    author: "Alex Brown",
    imageUrl: "https://via.placeholder.com/140",
  },
];


const fakeBooks=[
  {
    id: 1,
    book: "The Stolen Queen",
    sales: 680,
    price: 14.99,
    rating: 4.15,
    author: "Fiona Davis",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1713891819i/211025454.jpg",
  },
  {
    id: 2,
    book: "Homeseeking",
    sales: 540,
    price: 23.99,
    rating: 4.32,
    author: "Karissa Chen",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1712970767i/211025407.jpg",
  },  
  {
    id: 3,
    book: "Good Dirt",
    sales: 680,
    price: 13.99,
    rating: 4.21,
    author: "Charmaine Wilkerson",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1721437195i/213618132.jpg",
  },  {
    id: 4,
    book: "Three Days in June",
    sales: 210,
    price: 18.50,
    rating: 4.04,
    author: "Anne Tyler",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1719007741i/213243949.jpg",
    about:"A new Anne Tyler novel destined to be an instant classic: a socially awkward mother of the bride navigates the days before and after her daughter's wedding.",
    description:"Gail Baines is having a bad day. To start, she loses her job—or quits, depending on whom you ask. Tomorrow her daughter, Debbie, is getting married, and she hasn’t even been invited to the spa day organized by the mother of the groom. Then, Gail’s ex-husband, Max, arrives unannounced on her doorstep, carrying a cat, without a place to stay, and without even a suit. But the true crisis lands when Debbie shares with her parents a secret she has just learned about her husband to be. It will not only throw the wedding into question but also stir up Gail and Max’s past."
  },  {
    id: 5,
    book: "We All Live Here",
    sales: 194,
    price: 14.99,
    rating: 4.0,
    author: "Jojo Moyes",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1725547585i/213243915.jpg",
  },{
    id: 6,
    book: "Dream Count",
    sales: 358,
    price: 12.90,
    rating: 4.6,
    author: "Chimamanda Ngozi Adichie",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1727619577i/219521090.jpg",
    about:"A publishing event ten years in the making—a searing, exquisite new novel by the best-selling and award-winning author of Americanah and We Should All Be Feminists—the story of four women and their loves, longings, and desires.",
    description:"Chiamaka is a Nigerian travel writer living in America. Alone in the midst of the pandemic, she recalls her past lovers and grapples with her choices and regrets. Zikora, her best friend, is a lawyer who has been successful at everything until — betrayed and brokenhearted — she must turn to the person she thought she needed least. Omelogor, Chiamaka’s bold, outspoken cousin, is a financial powerhouse in Nigeria who begins to question how well she knows herself. And Kadiatou, Chiamaka’s housekeeper, is proudly raising her daughter in America – but faces an unthinkable hardship that threatens all she has worked to achieve.",
  },{
    id: 7,
    book: "Julie Chan Is Dead",
    sales: 424,
    price: 10.20,
    rating: 3.89,
    author: "Liann Zhang",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1728491260l/220161576.jpg",
    about:"In this razor-sharp, diabolical debut thriller, a young woman steps into her deceased twin’s influencer life, only to discover dark secrets hidden behind her social media façade.",
    description:"Julie Chan has nothing. Her twin sister has everything. Except a pulse. Julie Chan, a supermarket cashier with nothing to lose, finds herself thrust into the glamorous yet perilous world of her late twin sister, Chloe VanHuusen, a popular influencer. Separated at a young age, the identical twins were polar opposites and rarely spoke, except for one viral video that Chloe initiated (Finding My Long-Lost Twin And Buying Her A House #EMOTIONAL). When Julie discovers Chloe’s lifeless body under mysterious circumstances, she seizes the chance to live the life she’s always envied. Transforming into Chloe is easier than expected. Julie effortlessly adopts Chloe’s luxurious influencer life, complete with designer clothes, a meticulous skincare routine, and millions of adoring followers. However, Julie soon realizes that Chloe’s seemingly picture-perfect life was anything but."
  },{
    id: 8,
    book: "Lightfall",
    sales: 210,
    price: 13.99,
    rating: 3.63,
    author: "Ed Crocker",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1721322107i/211003690.jpg",
    about:"An epic fantasy of vampires, werewolves and sorcerers, Lightfall is the debut novel of Ed Crocker, for fans of Jay Kristoff’s Empire of the Vampire and Richard Swan’s The Justice of Kings.",
    description:"No humans here. Just immortals: their politics, their feuds—and their long buried secrets. For centuries, vampires freely roamed the land until the Grays came out of nowhere, wiping out half the population in a night. The survivors fled to the last vampire city of First Light, where the rules are simple. If you’re poor, you drink weak blood. If you’re nobility, you get the good stuff. And you can never, ever leave. Palace maid Sam has had enough of these rules, and she’s definitely had enough of cleaning the bedpans of the lords who enforce them. When the son of the city’s ruler is murdered and she finds the only clue to his death, she seizes the chance to blackmail her way into a better class and better blood. She falls in with the Leeches, a group of rebel maids who rein in the worst of the Lords. Soon she’s in league with a sorcerer whose deductive skills make up for his lack of magic, a deadly werewolf assassin and a countess who knows a city’s worth of secrets."
  },{
    id: 9,
    book: "Mood Machine",
    sales: 112,
    price: 15.99,
    rating: 3.99,
    author: "Liz Pelly",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1719020929i/214151728.jpg",
    about:"With unprecedented access and unsparing analysis, this is the definitive investigation into Spotify, weaving interviews with incisive cultural criticism, and illuminating how streaming has reshaped music for listeners and artists alike.",
    description:"Flush with testimony from over a hundred industry insiders, former Spotify employees, and musicians, Mood Machine takes us into the inner workings of the highly consolidated modern music business and how it has become personalized, playlisted, autoplayed, and algorithmic. With an expert’s eye, music journalist Liz Pelly reveals how Spotify’s two-sided marketplace—the listeners who pay with their dollars and data, and the musicians who provide the material powering it all—has changed music media forever. She also explores how musicians and listeners are coming together to fight this era of musical individualism and advocate for artists’ futures. Amazon Unbound and Weapons of Math Destruction for the music industry, Mood Machine is a timely and unputdownable exploration of a company that has become synonymous with music.",
  }
]

const fakeUsers = [
  {
    name:"zahra asadi",
    email:"asadi55@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/74",
    purchasedBooks:5,
    registrationDate:"2021-09-15",
    status:"active"
  },{
    name:"sara moeni",
    email:"saramo21@yahoo.com",
    profilePic:"https://avatar.iran.liara.run/public/96",
    purchasedBooks:11,
    registrationDate:"2010-08-11",
    status:"active"
  }, {
    name:"mina saedi",
    email:"saedimina@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/61",
    purchasedBooks:0,
    registrationDate:"2019-02-12",
    status:"inactive"
  }, {
    name:"sama aslani",
    email:"aslani2000@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/73",
    purchasedBooks:5,
    registrationDate:"2023-10-01",
    status:"active"
  }, {
    name:"mohammad rad",
    email:"rad2020@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/28",
    purchasedBooks:2,
    registrationDate:"2021-01-21",
    status:"inactive"
  }, {
    name:"ali sharifi",
    email:"alisharifi@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/17",
    purchasedBooks:12,
    registrationDate:"2022-09-23",
    status:"active"
  }, {
    name:"ahmad moghimi",
    email:"moghimiahmad@yahoo.com",
    profilePic:"https://avatar.iran.liara.run/public/32",
    purchasedBooks:1,
    registrationDate:"2019-10-14",
    status:"inactive"
  }, {
    name:"reza azmoon",
    email:"rezaaz2020@gmail.com",
    profilePic:"https://avatar.iran.liara.run/public/34",
    purchasedBooks:3,
    registrationDate:"2021-05-29",
    status:"active"
  },{
    name:"hasan soltani",
    email:"soltanih98@gmail.com",
    profilePic:"",
    purchasedBooks:3,
    registrationDate:"2023-05-09",
    status:"inactive"
  },{
    name:"hamed rezaei",
    email:"hrezaei397@gmail.com",
    profilePic:"",
    purchasedBooks:7,
    registrationDate:"2018-10-29",
    status:"active"
  },{
    name:"saba emami",
    email:"sabahh20@yahoo.com",
    profilePic:"",
    purchasedBooks:2,
    registrationDate:"2023-09-30",
    status:"active"
  },
]

export { websiteViews, dailySales, fakeTopBooks };
