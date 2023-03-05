import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let tickets = await prisma.ticketType.findFirst();

  if (!tickets) {
    await prisma.ticketType.createMany({
      data: [{
        name: 'Online',
        price: 100,
        isRemote: true,
        includesHotel: false
      },
      {
        name: 'Presencial',
        price: 250,
        isRemote: false,
        includesHotel: false
      },
      {
        name: 'Com Hotel',
        price: 500,
        isRemote: false,
        includesHotel: true
      }
      ]
    })
  }

  let hotels = await prisma.hotel.findFirst();

  if (!hotels) {
    await prisma.hotel.createMany({
      data: [{
        name: 'Reverest Rest',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKg1Ese_hP7QQzPDHi81QNBWCWaM1e3CMmg&usqp=CAU'
      },
      {
        name: 'Limbo Park West',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAH-TmwfPPE6z7zg6TVf5CdiTz7VmO573GWw&usqp=CAU'
      },
      {
        name: 'Emirates Resort',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_cXHQ_Lvf_T38K6fhI1MKIILmz1McUswHQ&usqp=CAU'
      }
      ]
    })
  }

  let rooms = await prisma.room.findFirst();

  if (!rooms) {
    const hotelsExist = await prisma.hotel.findMany()

    const roomsCreate = [] as { name: string, capacity: number, hotelId: number }[]

    hotelsExist.forEach((e) => {
      let number = 0

      for (let i = 0; i < 4; i++) {
        number += 100
        for (let j = 0; j < 8; j++) {
          number += 1
          roomsCreate.push(
            {
              name: String(number),
              capacity: Math.floor(Math.random() * 3 + 1),
              hotelId: e.id
            }
          )
        }
        number -= 8
      }

    })

    await prisma.room.createMany({
      data: roomsCreate
    })
  }

  const ticketsTypeShow = await prisma.ticketType.findMany()
  const hotelShow = await prisma.hotel.findMany()
  const roomShow = await prisma.room.findMany()

  console.log({ event });
  console.log(ticketsTypeShow)
  console.log(hotelShow)
  console.log(roomShow)

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

