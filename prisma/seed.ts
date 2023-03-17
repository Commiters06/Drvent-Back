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
        endsAt: dayjs().add(3, "days").toDate(),
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

  const local = await prisma.local.findFirst();
  if(!local){
    await prisma.local.createMany({
      data: [
        {
          name: "Auditório Principal"
        },
        {
          name: "Auditório Lateral"
        },
        {
          name: "Sala de Workshop"
        },
        {
          name: "Teatro Principal"
        }
      ]
    })
  }

  const activities = await prisma.activity.findMany();
  if(activities.length === 0){
    await prisma.activity.createMany({
      data: [
        //2023-03-08
        {
          localId: 1,
          date: dayjs("2023-03-08").toDate(),
          description: "Minecraft: montando o PC ideal",
          hourStart: dayjs("2023-03-08 9:00").toDate(),
          hourEnd: dayjs("2023-03-08 10:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 1,
          date: dayjs("2023-03-08").toDate(),
          description: "LoL: montando o PC ideal",
          hourStart: dayjs("2023-03-08 10:00").toDate(),
          hourEnd: dayjs("2023-03-08 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 2,
          date: dayjs("2023-03-08").toDate(),
          description: "Palestra x",
          hourStart: dayjs("2023-03-08 9:00").toDate(),
          hourEnd: dayjs("2023-03-08 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-08").toDate(),
          description: "Palestra y",
          hourStart: dayjs("2023-03-08 9:00").toDate(),
          hourEnd: dayjs("2023-03-08 10:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-08").toDate(),
          description: "Palestra z",
          hourStart: dayjs("2023-03-08 10:00").toDate(),
          hourEnd: dayjs("2023-03-08 11:00").toDate(),
          limit: 0
        },
        //2023-03-09
        {
          localId: 1,
          date: dayjs("2023-03-09").toDate(),
          description: "JavaScript: fundamentos",
          hourStart: dayjs("2023-03-09 9:00").toDate(),
          hourEnd: dayjs("2023-03-09 10:00").toDate(),
          limit: 0
        },
        {
          localId: 1,
          date: dayjs("2023-03-09").toDate(),
          description: "JavaScript: resolvendo problemas do mundo real",
          hourStart: dayjs("2023-03-09 10:00").toDate(),
          hourEnd: dayjs("2023-03-09 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 2,
          date: dayjs("2023-03-09").toDate(),
          description: "Palestra sobre front",
          hourStart: dayjs("2023-03-09 9:00").toDate(),
          hourEnd: dayjs("2023-03-09 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-09").toDate(),
          description: "Palestra sobre back",
          hourStart: dayjs("2023-03-09 9:00").toDate(),
          hourEnd: dayjs("2023-03-09 10:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-09").toDate(),
          description: "Palestra sobre mobile",
          hourStart: dayjs("2023-03-09 10:00").toDate(),
          hourEnd: dayjs("2023-03-09 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        //2023-03-10
        {
          localId: 1,
          date: dayjs("2023-03-10").toDate(),
          description: "Aliexpress: monte setups poderosos mas baratos",
          hourStart: dayjs("2023-03-10 9:00").toDate(),
          hourEnd: dayjs("2023-03-10 10:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 1,
          date: dayjs("2023-03-10").toDate(),
          description: "Memória RAM como mensurar quanto você precisa",
          hourStart: dayjs("2023-03-10 10:00").toDate(),
          hourEnd: dayjs("2023-03-10 11:00").toDate(),
          limit: 0
        },
        {
          localId: 2,
          date: dayjs("2023-03-10").toDate(),
          description: "GPU com certeza você precisa pra assistir aulas ead",
          hourStart: dayjs("2023-03-10 9:00").toDate(),
          hourEnd: dayjs("2023-03-10 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-10").toDate(),
          description: "SSD/NVME vs HDD",
          hourStart: dayjs("2023-03-10 9:00").toDate(),
          hourEnd: dayjs("2023-03-10 10:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        },
        {
          localId: 3,
          date: dayjs("2023-03-10").toDate(),
          description: "AMD vs Intal",
          hourStart: dayjs("2023-03-10 10:00").toDate(),
          hourEnd: dayjs("2023-03-10 11:00").toDate(),
          limit: Math.floor(Math.random() * (30 - 2 + 1)) + 2
        }
      ]
    })
  }

  const ticketsTypeShow = await prisma.ticketType.findMany()
  const hotelShow = await prisma.hotel.findMany()
  const roomShow = await prisma.room.findMany()
  const activitiesShow = await prisma.activity.findMany({ take: 5 })

  console.log({ event });
  console.log(ticketsTypeShow)
  console.log(hotelShow)
  console.log(roomShow)
  console.log(activitiesShow)

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

