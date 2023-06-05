import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//OWNER
const o1 = await prisma.owner.create({
  data: {
    fullName: "Juan Cruz Molino",
    adress: "carrer Amics 12",
    contactEmail: "j@cruz.com",
    postalCode: "08908",
  },
});
console.log(`Owner created ${o1.fullName}`);

const o2 = await prisma.owner.create({
  data: {
    fullName: "Carla Santiago Lopez",
    adress: "carrer Llull 124",
    contactEmail: "carlasantiago@gmail.com",
    postalCode: "08983",
  },
});
console.log(`Owner created ${o2.fullName}`);

const o3 = await prisma.owner.create({
  data: {
    fullName: "Anna Perez Suarez",
    adress: "carrer Pujades 72",
    contactEmail: "anna@perez.com",
    postalCode: "08911",
  },
});
console.log(`Owner created ${o3.fullName}`);

//PET SITTER
const ps1 = await prisma.petSitter.create({
  data: {
    fullName: "Pedro Martinez Diaz",
    adress: "carrer Pere IV 12",
    email: "pedro@gmail.com",
    contactNumber: 634828501,
    postalCode: "08432",
  },
});
console.log(`Pet sitter created ${ps1.fullName}`);

const ps2 = await prisma.petSitter.create({
  data: {
    fullName: "María Castillo Torres",
    adress: "carrer València 7",
    email: "mcastillo@gmail.com",
    postalCode: "08532",
    contactNumber: 629471974,
  },
});
console.log(`Pet sitter created ${ps2.fullName}`);

//SERVICE
await prisma.service.createMany({
  data: [
    { type: "Dog Walking", price: 11, petSitterId: ps1.id },
    { type: "Doggy Day Care", price: 15, petSitterId: ps1.id },
    { type: "Dog Walking", price: 14.5, petSitterId: ps2.id },
    { type: "Doggy Day Care", price: 18, petSitterId: ps2.id },
    { type: "Hosting for night", price: 25, petSitterId: ps2.id },
  ],
});

//DOG
const d1 = await prisma.dog.create({
  data: {
    name: "Lira",
    size: "small",
    medication: false,
    ownerId: o1.id,
    bithdate: new Date(2018, 4, 7),
  },
});
console.log(`Dog created ${d1.name}`);

const d2 = await prisma.dog.create({
  data: {
    name: "Vela",
    size: "medium",
    medication: false,
    ownerId: o1.id,
    bithdate: new Date(2020, 8, 3),
  },
});
console.log(`Dog created ${d2.name}`);

const d3 = await prisma.dog.create({
  data: {
    name: "Delta",
    size: "medium",
    medication: false,
    ownerId: o2.id,
    bithdate: new Date(2017, 4, 4),
  },
});
console.log(`Dog created ${d3.name}`);

const d4 = await prisma.dog.create({
  data: {
    name: "Tobby",
    size: "small",
    medication: false,
    ownerId: o3.id,
    bithdate: new Date(2020, 7, 17),
  },
});
console.log(`Dog created ${d4.name}`);
//Insomnia: Date format YYYY-MM-DDTHH:mm:ss.sssZ, ex."start": "2023-05-15T00:00:00.000Z"

//CONTRACT
await prisma.contract.createMany({
  data: [
    {
      details: "Hosting for 20€/night",
      start: new Date(2022, 3, 17),
      end: new Date(2022, 7, 27),
      dogId: d1.id,
      petSitterId: ps2.id,
    },
    {
      details: "Hosting for 17€/night",
      start: new Date(2022, 3, 17),
      end: new Date(2022, 7, 27),
      dogId: d2.id,
      petSitterId: ps2.id,
    },
    {
      details: "Walking for 14€",
      start: new Date(2021, 7, 17),
      end: new Date(2021, 7, 17),
      dogId: d3.id,
      petSitterId: ps2.id,
    },
    {
      details: "Day Care for 13€",
      start: new Date(2022, 5, 6),
      end: new Date(2022, 5, 6),
      dogId: d3.id,
      petSitterId: ps1.id,
    },
    {
      details: "Walking for 10€ ",
      start: new Date(2022, 12, 17),
      end: new Date(2022, 12, 17),
      dogId: d4.id,
      petSitterId: ps1.id,
    },
  ],
});
