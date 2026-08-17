import FarmsHeader from "../components/farms/FarmsHeader";
import FarmFilters from "../components/farms/FarmFilters";
import FarmCard from "../components/farms/FarmCard";
import FarmLocationMap from "../components/farms/FarmLocationMap";

const farms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "California, USA",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
    status: "Active",
    area: "78.5 ha",
    fields: 5,
    crop: "Wheat",
    health: 88,
    healthText: "Healthy",
    trend: [58, 61, 59, 66, 64, 70, 67, 76],
  },
  {
    id: 2,
    name: "Sunrise Farm",
    location: "Iowa, USA",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=85",
    status: "Active",
    area: "62.3 ha",
    fields: 4,
    crop: "Corn",
    health: 82,
    healthText: "Good",
    trend: [54, 58, 56, 63, 61, 67, 64, 72],
  },
  {
    id: 3,
    name: "Heritage Farm",
    location: "Texas, USA",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=85",
    status: "Active",
    area: "54.8 ha",
    fields: 3,
    crop: "Soybean",
    health: 74,
    healthText: "Good",
    trend: [46, 50, 53, 57, 62, 67, 70, 76],
  },
  {
    id: 4,
    name: "Organic Farm",
    location: "Oregon, USA",
    image:
      "https://images.unsplash.com/photo-1464221314753-9e0b5c6a3c7c?auto=format&fit=crop&w=1000&q=85",
    status: "Active",
    area: "49.2 ha",
    fields: 3,
    crop: "Vegetables",
    health: 91,
    healthText: "Excellent",
    trend: [62, 66, 64, 70, 68, 76, 74, 82],
  },
];

function Farms() {
  return (
    <div className="space-y-5 pb-6">
      {/* PAGE HEADER */}
      <FarmsHeader />

      {/* FILTERS */}
      <FarmFilters />

      {/* FARM CONTENT */}
      <section
        className="
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-[minmax(0,1fr)_355px]
        "
      >
        {/* FARM CARDS */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            2xl:grid-cols-4
          "
        >
          {farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
            />
          ))}
        </div>

        {/* LOCATION MAP */}
        <FarmLocationMap />
      </section>
    </div>
  );
}

export default Farms;