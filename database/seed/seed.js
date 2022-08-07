const products = [
  {
    name: "Moon",
    img: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001861/GSFC_20171208_Archive_e001861~thumb.jpg",
    caption: "Only place beyond Earth where humans have set foot, so far",
    bodyType: "Moon",
    price: 100,
    highlights: [
      "The Moon is Earth's only natural satellite. It goes around the Earth at a distance of about 239,000 miles (385,000 kilometers).",
      "The Moon has a solid, rocky surface cratered and pitted from impacts by asteroids, meteorites, and comets.",
      "The Moon has a very thin and tenuous atmosphere called an exosphere. It is not breathable.",
    ],
  },

  {
    name: "Mercury",
    img: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001545/GSFC_20171208_Archive_e001545~thumb.jpg",
    caption: "The smallest planet in our solar system and nearest to the Sun",
    bodyType: "Planet",
    price: 100,
    highlights: [
      "Mercury is a rocky planet, also known as a terrestrial planet.",
      "It is unlikely that life as we know it could survive on Mercury due to solar radiation, and extreme temperatures.",
      "Mercury is the fastest planet in our solar system, traveling through space at nearly 29 miles (47 kilometers) per second.",
    ],
  },

  {
    name: "Jupiter",
    img: "https://images-assets.nasa.gov/image/PIA00343/PIA00343~orig.jpg",
    caption: "Largest planet in the Solar System",
    bodyType: "Planet",
    price: 1000,
    highlights: [
      "Jupiter has more than 75 moons.",
      "Some of Jupiter's moons have oceans beneath their crusts that might support life.",
      "Jupiter's Great Red Spot is a gigantic storm that’s about twice the size of Earth and has raged for over a century.",
    ],
  },

  {
    name: "Saturn",
    img: "https://images-assets.nasa.gov/image/PIA21047/PIA21047~thumb.jpg",
    caption:
      "Adorned with thousands of beautiful ringlets, Saturn is unique among the planets.",
    bodyType: "Planet",
    price: 1000,
    highlights: [
      "Saturn is a gas-giant planet and therefore does not have a solid surface like Earth’s.",
      "Saturn has 53 known moons with an additional 29 moons awaiting confirmation of their discovery",
      "Saturn has the most spectacular ring system, with seven rings and several gaps and divisions between them.",
    ],
  },

  {
    name: "Mars",
    img: "https://images-assets.nasa.gov/image/PIA00407/PIA00407~thumb.jpg",
    caption: "One of the most explored bodies in our solar system.",
    bodyType: "Planet",
    price: 1000,
    highlights: [
      "Several missions have visited this planet, from flybys and orbiters to rovers on the surface",
      "Mars is a rocky planet. Its solid surface has been altered by volcanoes, impacts, winds, crustal movement and chemical reactions.",
      "Mars is known as the Red Planet because iron minerals in the Martian soil oxidize, or rust, causing the soil and atmosphere to look red.",
    ],
  },

  {
    name: "Venus",
    img: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg",
    caption: "Earth’s closest planetary neighbor.",
    bodyType: "Planet",
    price: 1000,
    highlights: [
      "The average surface of Venus is less than a billion years old, and possibly as young as 150 million years old – which is relatively young from a geological perspective.",
      "Venus is permanently shrouded in thick, toxic clouds of sulfuric acid.",
      "Venus rotates backward on its axis compared to most planets in our solar system.",
    ],
  },

  {
    name: "Pluto",
    img: "https://iimages-assets.nasa.gov/image/PIA11709/PIA11709~orig.jpg",
    caption: "Not a planet",
    bodyType: "Dwarf Planet",
    price: 1000,
    highlights: [
      "The only spacecraft to visit Pluto is NASA’s New Horizons, which passed close by in July 2015.",
      "Reclassified in 2006 from a planet to a dwarf planet.",
      "The atmosphere has a blue tint and distinct layers of haze.",
    ],
  },

  {
    name: "Neptune",
    img: "https://images-assets.nasa.gov/image/8910708/8910708~thumb.jpg",
    caption: "An ice giant",
    bodyType: "Planet",
    price: 1000,
    highlights: [
      "Neptune has 14 known moons which are named after sea gods and nymphs in Greek mythology.",
      "Voyager 2 is the only spacecraft to have visited Neptune.",
      "Neptune has at least five main rings and four more ring arcs.",
    ],
  },
];

module.exports = products;
