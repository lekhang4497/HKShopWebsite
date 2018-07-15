var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:abc123@ds139960.mlab.com:39960/hkshop');

var seedData = [{
    "imagePath": "/images/product/9.jpg",
    "name": "Duke Flyboyz B1",
    "description": "Beautiful shirt culpa deserunt ipsum cillum velit reprehenderit ut sunt eiusmod exercitation ullamco culpa qui exercitation occaecat velit officia deserunt nostrud nostrud",
    "price": 86000
  },
  {
    "imagePath": "/images/product/14.jpg",
    "name": "Kaye Enaut A2",
    "description": "Cool shirt in commodo enim ad consectetur enim ea eu velit ullamco eiusmod non tempor ea proident eiusmod esse non eu fugiat",
    "price": 100000
  },
  {
    "imagePath": "/images/product/1.jpg",
    "name": "Holder Cyclonica A1",
    "description": "Fantastic shirt ex velit est amet occaecat amet esse reprehenderit velit in duis qui et Lorem mollit et elit ipsum eu exercitation",
    "price": 127000
  },
  {
    "imagePath": "/images/product/6.jpg",
    "name": "Pauline Portico A2",
    "description": "Great shirt laboris eiusmod qui duis voluptate do non qui dolor eiusmod ea dolore aliqua dolore exercitation pariatur eu nulla amet deserunt",
    "price": 120000
  },
  {
    "imagePath": "/images/product/2.jpg",
    "name": "Desiree Visalia A3",
    "description": "Awesome shirt deserunt do et occaecat qui incididunt non dolore deserunt ea aute nulla reprehenderit proident cillum cupidatat est tempor irure occaecat",
    "price": 111000
  },
  {
    "imagePath": "/images/product/10.jpg",
    "name": "Luisa Zolarity A1",
    "description": "Good shirt velit minim laborum sit voluptate ullamco nostrud deserunt exercitation amet ut incididunt veniam tempor non nostrud consequat ex esse proident",
    "price": 93000
  },
  {
    "imagePath": "/images/product/18.jpg",
    "name": "Marshall Quiltigen C2",
    "description": "Cool shirt labore amet culpa quis incididunt culpa et pariatur enim ex do esse incididunt irure qui aliquip fugiat esse eiusmod deserunt",
    "price": 58000
  },
  {
    "imagePath": "/images/product/15.jpg",
    "name": "Pamela Isologica B4",
    "description": "Good shirt ex do ea nisi pariatur mollit adipisicing nisi officia adipisicing dolor culpa deserunt elit veniam eiusmod ex et nostrud pariatur",
    "price": 113000
  },
  {
    "imagePath": "/images/product/9.jpg",
    "name": "Leann Softmicro A1",
    "description": "Awesome shirt mollit cupidatat quis qui cupidatat amet laboris incididunt magna pariatur duis labore velit proident labore laborum occaecat reprehenderit ullamco aute",
    "price": 130000
  },
  {
    "imagePath": "/images/product/6.jpg",
    "name": "Melisa Calcula C5",
    "description": "Good shirt reprehenderit esse deserunt aliqua nisi Lorem do elit esse laboris labore aute consectetur proident tempor do aute non enim officia",
    "price": 142000
  },
  {
    "imagePath": "/images/product/12.jpg",
    "name": "Bernadette Jimbies B2",
    "description": "Cool shirt dolor magna sint ex laboris veniam aliqua mollit anim ex duis laboris sunt anim reprehenderit cupidatat velit ex adipisicing eu",
    "price": 114000
  },
  {
    "imagePath": "/images/product/19.jpg",
    "name": "Head Signity A5",
    "description": "Fantastic shirt mollit mollit id consectetur cillum sit labore eiusmod laboris ex in Lorem dolor consequat enim incididunt adipisicing est veniam ut",
    "price": 89000
  },
  {
    "imagePath": "/images/product/1.jpg",
    "name": "Leanna Kenegy C3",
    "description": "Awesome shirt aute duis laboris ipsum laboris voluptate sit magna magna ad quis non ea esse adipisicing do esse consequat amet veniam",
    "price": 102000
  },
  {
    "imagePath": "/images/product/8.jpg",
    "name": "Marianne Cuizine C1",
    "description": "Fantastic shirt proident et amet mollit deserunt in adipisicing sint dolor veniam elit Lorem Lorem officia elit irure eu pariatur magna commodo",
    "price": 104000
  },
  {
    "imagePath": "/images/product/15.jpg",
    "name": "Cash Zuvy A5",
    "description": "Fantastic shirt aliqua irure amet anim eiusmod ullamco culpa ipsum proident est esse consequat ea minim velit eu et commodo sunt magna",
    "price": 107000
  },
  {
    "imagePath": "/images/product/20.jpg",
    "name": "Sadie Quonk A4",
    "description": "Fantastic shirt dolore ad culpa amet occaecat nulla in deserunt sit proident occaecat occaecat proident esse amet ipsum elit pariatur consequat aliqua",
    "price": 54000
  },
  {
    "imagePath": "/images/product/10.jpg",
    "name": "Cherry Unisure A5",
    "description": "Fantastic shirt id eu est sunt voluptate reprehenderit sit nulla incididunt sunt laboris ullamco nisi voluptate ea aliqua nulla Lorem duis sint",
    "price": 94000
  },
  {
    "imagePath": "/images/product/18.jpg",
    "name": "Terri Mantro B5",
    "description": "Good shirt sit incididunt non do occaecat fugiat sint non deserunt occaecat qui duis occaecat fugiat fugiat non quis ea elit consequat",
    "price": 90000
  },
  {
    "imagePath": "/images/product/9.jpg",
    "name": "Janine Zentia B3",
    "description": "Good shirt elit fugiat nostrud anim incididunt minim commodo anim ex consequat velit proident nulla esse id cillum adipisicing duis culpa excepteur",
    "price": 143000
  },
  {
    "imagePath": "/images/product/9.jpg",
    "name": "Herring Netplode C2",
    "description": "Beautiful shirt ullamco nostrud voluptate non ea nisi sunt aliqua nisi minim reprehenderit officia veniam aliqua veniam aute ut id irure sint",
    "price": 58000
  },
  {
    "imagePath": "/images/product/7.jpg",
    "name": "Gibson Codax B5",
    "description": "Great shirt id velit tempor ad exercitation do deserunt aute cupidatat voluptate consectetur non Lorem aute nulla excepteur mollit quis est irure",
    "price": 53000
  },
  {
    "imagePath": "/images/product/3.jpg",
    "name": "Trudy Miracula A2",
    "description": "Awesome shirt mollit in aliqua Lorem duis elit aute reprehenderit veniam consectetur excepteur amet velit irure dolore sint excepteur laborum est ad",
    "price": 50000
  },
  {
    "imagePath": "/images/product/5.jpg",
    "name": "Pearson Zaya B4",
    "description": "Great shirt velit laborum enim aute sint dolor ut in nostrud aliqua non tempor voluptate officia velit qui do irure aute enim",
    "price": 61000
  },
  {
    "imagePath": "/images/product/8.jpg",
    "name": "Reilly Centree A1",
    "description": "Fantastic shirt elit deserunt excepteur do Lorem ipsum est fugiat quis in dolor eiusmod eu enim pariatur anim nisi magna occaecat cupidatat",
    "price": 76000
  },
  {
    "imagePath": "/images/product/4.jpg",
    "name": "Ewing Ecstasia A4",
    "description": "Fantastic shirt ullamco laborum minim sunt laboris aliquip ad tempor qui enim dolor mollit ut officia cupidatat aute proident adipisicing occaecat sunt",
    "price": 107000
  },
  {
    "imagePath": "/images/product/2.jpg",
    "name": "Sharon Pyramia B2",
    "description": "Great shirt et laborum excepteur velit sint qui officia et exercitation magna quis officia sunt sunt aliquip in deserunt veniam dolor proident",
    "price": 59000
  },
  {
    "imagePath": "/images/product/12.jpg",
    "name": "Norma Twiggery C2",
    "description": "Cool shirt consectetur proident sit aliqua ex ex est irure eu enim aliquip occaecat culpa minim ipsum consequat labore exercitation elit voluptate",
    "price": 144000
  },
  {
    "imagePath": "/images/product/18.jpg",
    "name": "Jewell Xylar C1",
    "description": "Great shirt occaecat nulla et enim tempor id proident labore ad sit fugiat deserunt voluptate do velit commodo et culpa ex do",
    "price": 139000
  },
  {
    "imagePath": "/images/product/11.jpg",
    "name": "Leah Unq B1",
    "description": "Fantastic shirt cillum commodo mollit cupidatat ea eiusmod commodo consectetur officia enim tempor labore adipisicing Lorem pariatur occaecat nulla eu nostrud exercitation",
    "price": 90000
  },
  {
    "imagePath": "/images/product/14.jpg",
    "name": "Linda Stucco B4",
    "description": "Awesome shirt voluptate aliqua fugiat nulla id ut consectetur sunt dolore elit exercitation consectetur fugiat sint culpa nostrud pariatur consectetur Lorem qui",
    "price": 125000
  },
  {
    "imagePath": "/images/product/14.jpg",
    "name": "Mckee Maxemia A5",
    "description": "Awesome shirt commodo occaecat nisi enim tempor eu eu occaecat et labore ex occaecat deserunt irure elit amet veniam laborum velit est",
    "price": 71000
  },
  {
    "imagePath": "/images/product/15.jpg",
    "name": "Katie Geekmosis B3",
    "description": "Fantastic shirt deserunt anim enim irure est est culpa ullamco aute esse pariatur dolore minim cupidatat nostrud aliqua ad amet enim amet",
    "price": 55000
  },
  {
    "imagePath": "/images/product/9.jpg",
    "name": "Bryant Housedown A1",
    "description": "Fantastic shirt anim adipisicing consectetur qui Lorem Lorem Lorem eu mollit sint aliquip ut pariatur voluptate ad duis laboris occaecat sit do",
    "price": 50000
  },
  {
    "imagePath": "/images/product/4.jpg",
    "name": "Schwartz Intradisk A1",
    "description": "Cool shirt proident excepteur aliquip ipsum cupidatat magna id elit sit tempor mollit ex enim culpa adipisicing duis consectetur ea eu aliqua",
    "price": 77000
  },
  {
    "imagePath": "/images/product/14.jpg",
    "name": "Jacklyn Mondicil C2",
    "description": "Fantastic shirt sunt adipisicing magna voluptate fugiat fugiat dolore esse laboris nisi laborum eiusmod Lorem proident elit ipsum dolore est laboris magna",
    "price": 147000
  },
  {
    "imagePath": "/images/product/19.jpg",
    "name": "Hodges Danja C2",
    "description": "Fantastic shirt reprehenderit esse fugiat minim culpa aliquip sint cillum veniam aute dolor ullamco ipsum pariatur tempor qui culpa nostrud nostrud elit",
    "price": 71000
  },
  {
    "imagePath": "/images/product/9.jpg",
    "name": "Johns Medcom B4",
    "description": "Cool shirt elit voluptate commodo nisi aliqua esse incididunt officia consectetur ipsum dolore non ad laboris in ullamco aliquip proident eu velit",
    "price": 127000
  },
  {
    "imagePath": "/images/product/12.jpg",
    "name": "Davis Collaire C2",
    "description": "Cool shirt et dolore qui dolore amet ipsum dolor dolore sint consequat ipsum reprehenderit incididunt elit qui cillum enim sunt cillum esse",
    "price": 142000
  },
  {
    "imagePath": "/images/product/17.jpg",
    "name": "Potter Icology A1",
    "description": "Great shirt esse nulla aute laborum sit aute aliquip pariatur labore pariatur sunt ipsum Lorem ipsum non velit adipisicing ea cillum irure",
    "price": 112000
  },
  {
    "imagePath": "/images/product/19.jpg",
    "name": "Wanda Empirica C1",
    "description": "Awesome shirt velit cillum cupidatat dolor ut labore veniam mollit cupidatat dolor id proident Lorem amet excepteur consequat in in sit laborum",
    "price": 148000
  }
];

var products = [];
seedData.forEach(data => {
  products.push(new Product(data));
})

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}